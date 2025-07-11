// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {
    TokenPresale,
    PresaleEnded,
    GoalReached,
    notOwner,
    notFinished,
    ClaimDisabled,
    TooSmall,
    withdrawFailed
} from "../../src/TokenPresale.sol";
import {PriceConverter} from "../../src/PriceConverter.sol";
import {MockV3Aggregator} from "../mocks/MockV3Aggregator.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title TokenPresaleTest_Integration
 * @notice 集成测试 - 测试合约组件之间的交互
 * forge test --match-path test/integration/TokenPresaleTest_Integration.t.sol -vvvv
 */
contract TokenPresaleTest_Integration is Test {
    TokenPresale tokenPresale;
    address owner = makeAddr("owner");
    address user1 = makeAddr("user1");
    address user2 = makeAddr("user2");
    address user3 = makeAddr("user3");
    uint256 constant STARTING_BALANCE = 10 ether;
    uint256 constant ETH_USD_PRICE = 2000e8; // 2000 USD/ETH with 8 decimals

    // Mock price feed
    MockV3Aggregator mockPriceFeed;
    // 使用chainlink的pricefeed地址，但在本地测试不使用chainlink，而是mock一个
    address constant AGGREGATOR_ADDRESS = 0x694AA1769357215DE4FAC081bf1f309aDC325306;

    function setUp() public {
        // Deploy mock price feed
        mockPriceFeed = new MockV3Aggregator(8, int256(ETH_USD_PRICE));

        // 使用vm.etch将mock的bytecode复制到AGGREGATOR_ADDRESS,用自己定义的mock代替chainlink的price feed
        vm.etch(AGGREGATOR_ADDRESS, address(mockPriceFeed).code);

        // 合约由code 和 storage组成
        // vm.etch 只复制了code，storage是空的，所以还要再次设置一次价格
        MockV3Aggregator(AGGREGATOR_ADDRESS).updateAnswer(int256(ETH_USD_PRICE));

        // Create TokenPresale with owner
        vm.startPrank(owner);
        tokenPresale = new TokenPresale(AGGREGATOR_ADDRESS);
        vm.stopPrank();

        // Setup accounts with ETH
        vm.deal(user1, STARTING_BALANCE);
        vm.deal(user2, STARTING_BALANCE);
        vm.deal(user3, STARTING_BALANCE);
    }

    // 测试完整的预售周期：捐赠 -> 提现 -> 计算代币 -> 线性解锁 -> 领取
    function testFullPresaleCycle() public {
        // 1. 多个用户参与捐赠
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 20 USD

        vm.prank(user2);
        tokenPresale.fund{value: 0.0075 ether}(); // 15 USD

        vm.prank(user3);
        tokenPresale.fund{value: 0.0075 ether}(); // 15 USD

        // 总捐赠应该是 50 USD
        assertEq(tokenPresale.totalUsdRaised(), 50e18);

        // 2. 项目方提现ETH
        uint256 ownerBalanceBefore = owner.balance;
        vm.prank(owner);
        tokenPresale.withdrawETH();

        // 验证ETH已转移到owner账户
        assertEq(owner.balance - ownerBalanceBefore, 0.025 ether);

        // 验证代币领取已启用
        assertTrue(tokenPresale.isClaimEnabled());

        // 3. 测试用户代币分配是否正确
        assertEq(tokenPresale.userTotalToken(user1), 2000); // 20 USD * 100 = 2000 tokens
        assertEq(tokenPresale.userTotalToken(user2), 1500); // 15 USD * 100 = 1500 tokens
        assertEq(tokenPresale.userTotalToken(user3), 1500); // 15 USD * 100 = 1500 tokens

        // 4. 测试线性解锁和领取 - 25% 时间点
        vm.warp(tokenPresale.unlockStartTime() + 6 hours); // 25% 解锁时间

        // 检查用户1可领取的代币数量
        uint256 user1Claimable = tokenPresale.getTokenClaimable(user1);
        assertEq(user1Claimable, 500); // 25% of 2000 = 500

        // 用户1领取代币
        vm.prank(user1);
        tokenPresale.claimTokens();
        assertEq(tokenPresale.userClaimedTokens(user1), 500);

        // 5. 测试线性解锁和领取 - 60% 时间点
        vm.warp(tokenPresale.unlockStartTime() + 14.4 hours); // 60% 解锁时间

        // 用户2领取代币
        vm.prank(user2);
        tokenPresale.claimTokens();
        assertEq(tokenPresale.userClaimedTokens(user2), 900); // 60% of 1500 = 900

        // 用户1再次领取代币 (应该可以额外领取 60%-25% = 35% 的代币)
        vm.prank(user1);
        tokenPresale.claimTokens();
        assertEq(tokenPresale.userClaimedTokens(user1), 1200); // 60% of 2000 = 1200

        // 6. 测试线性解锁和领取 - 100% 时间点
        vm.warp(tokenPresale.unlockStartTime() + 1 days + 1); // 100% 解锁时间

        // 用户3一次性领取全部代币
        vm.prank(user3);
        tokenPresale.claimTokens();
        assertEq(tokenPresale.userClaimedTokens(user3), 1500); // 100% of 1500 = 1500

        // 用户1再次领取剩余代币
        vm.prank(user1);
        tokenPresale.claimTokens();
        assertEq(tokenPresale.userClaimedTokens(user1), 2000); // 100% of 2000 = 2000
    }

    // 测试紧急暂停对整个流程的影响
    function testEmergencyPauseFlow() public {
        // 1. 初始捐赠
        vm.prank(user1);
        tokenPresale.fund{value: 0.005 ether}(); // 10 USD

        // 2. 项目方暂停合约
        vm.prank(owner);
        tokenPresale.pause();

        // 3. 验证用户无法继续捐赠
        vm.prank(user2);
        vm.expectRevert(); // notPaused修饰器使用require无消息
        tokenPresale.fund{value: 0.005 ether}();

        // 4. 项目方取消暂停
        vm.prank(owner);
        tokenPresale.unpause();

        // 5. 继续捐赠和提现流程
        vm.prank(user2);
        tokenPresale.fund{value: 0.02 ether}(); // 40 USD

        // 总共 50 USD，达到目标
        assertEq(tokenPresale.totalUsdRaised(), 50e18);

        vm.prank(owner);
        tokenPresale.withdrawETH();

        // 6. 验证代币计算正确
        assertEq(tokenPresale.userTotalToken(user1), 1000); // 10 USD * 100 = 1000 tokens
        assertEq(tokenPresale.userTotalToken(user2), 4000); // 40 USD * 100 = 4000 tokens

        // 7. 暂停不应影响已启用的代币领取
        vm.prank(owner);
        tokenPresale.pause();

        // 时间流逝
        vm.warp(tokenPresale.unlockStartTime() + 12 hours); // 50% 解锁时间

        // 用户仍然可以领取代币
        vm.prank(user1);
        tokenPresale.claimTokens();
        assertEq(tokenPresale.userClaimedTokens(user1), 500); // 50% of 1000 = 500
    }

    // 测试当未达到募集目标但时间结束时的流程
    function testPresaleTimeEndedFlow() public {
        // 1. 部分捐赠，未达到目标
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 20 USD

        // 总共 20 USD，未达到目标 50 USD
        assertEq(tokenPresale.totalUsdRaised(), 20e18);

        // 2. 时间结束
        vm.warp(tokenPresale.presaleEndTime() + 1);

        // 3. 用户无法继续捐赠
        vm.prank(user2);
        vm.expectRevert(PresaleEnded.selector);
        tokenPresale.fund{value: 0.01 ether}();

        // 4. 项目方仍可提现
        vm.prank(owner);
        tokenPresale.withdrawETH();

        // 5. 验证代币计算和领取
        assertEq(tokenPresale.userTotalToken(user1), 2000); // 20 USD * 100 = 2000 tokens

        // 时间流逝 - 完全解锁
        vm.warp(tokenPresale.unlockStartTime() + 1 days + 1);

        // 用户可以领取代币
        vm.prank(user1);
        tokenPresale.claimTokens();
        assertEq(tokenPresale.userClaimedTokens(user1), 2000);
    }

    // 测试用户信息查询功能
    function testUserInfoIntegration() public {
        // 1. 用户捐赠
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 20 USD

        // 2. 时间结束并提现
        vm.warp(tokenPresale.presaleEndTime() + 1);
        vm.prank(owner);
        tokenPresale.withdrawETH();

        // 3. 时间流逝 - 25% 解锁时间
        vm.warp(tokenPresale.unlockStartTime() + 6 hours);

        // 4. 查询用户信息 - 未领取前
        (uint256 contributed, uint256 claimed, uint256 claimable) = tokenPresale.getUserInfo(user1);
        assertEq(contributed, 20); // 20 USD
        assertEq(claimed, 0); // 尚未领取
        assertEq(claimable, 500); // 25% of 2000 = 500

        // 5. 用户领取代币
        vm.prank(user1);
        tokenPresale.claimTokens();

        // 6. 再次查询用户信息 - 领取后
        (contributed, claimed, claimable) = tokenPresale.getUserInfo(user1);
        assertEq(contributed, 20); // 20 USD
        assertEq(claimed, 500); // 已领取 500 代币
        assertEq(claimable, 0); // 暂时没有可领取的代币
    }

    // 测试价格变化对捐赠金额的影响
    function testPriceChangeEffect() public {
        // 1. 初始价格下捐赠
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 20 USD at 2000 USD/ETH

        // 2. 修改ETH价格为1500 USD/ETH
        MockV3Aggregator(AGGREGATOR_ADDRESS).updateAnswer(int256(1500e8));

        // 3. 新价格下捐赠相同ETH数量
        vm.prank(user2);
        tokenPresale.fund{value: 0.01 ether}(); // 15 USD at 1500 USD/ETH

        // 4. 验证用户贡献计算正确
        assertEq(tokenPresale.userUsdContributed(user1), 20e18);
        assertEq(tokenPresale.userUsdContributed(user2), 15e18);

        // 5. 恢复原价格
        MockV3Aggregator(AGGREGATOR_ADDRESS).updateAnswer(int256(ETH_USD_PRICE));
    }
}
