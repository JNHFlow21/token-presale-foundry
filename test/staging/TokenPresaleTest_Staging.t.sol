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

/**
 * @title TokenPresaleTest_Staging
 * @notice 阶段测试 - 在部署前模拟生产环境进行最终验证
 *          !!! 这个文件没测试过 可能会报错
 * @dev 运行命令: forge test --match-path test/staging/TokenPresaleTest_Staging.t.sol --fork-url $MAINNET_RPC_URL -vvv
 */
contract TokenPresaleTest_Staging is Test {
    TokenPresale tokenPresale;
    address payable[] users;
    address owner = makeAddr("owner");
    uint256 constant USER_COUNT = 5;
    uint256 constant STARTING_BALANCE = 5 ether;

    function setUp() public {
        // 创建TokenPresale合约
        vm.startPrank(owner);
        tokenPresale = new TokenPresale();
        vm.stopPrank();

        // 创建多个测试用户
        for (uint256 i = 0; i < USER_COUNT; i++) {
            address payable user = payable(makeAddr(string(abi.encodePacked("user", i))));
            users.push(user);
            vm.deal(user, STARTING_BALANCE);
        }
    }

    // 模拟生产环境下的完整预售流程，多个用户参与
    function testStageFullPresaleCycle() public {
        uint256 totalRaised = 0;

        // 1. 多个用户随机金额捐赠
        for (uint256 i = 0; i < users.length; i++) {
            // 每个用户捐赠不同金额
            uint256 donationAmount = 0.005 ether * (i + 1);

            vm.startPrank(users[i]);
            tokenPresale.fund{value: donationAmount}();
            vm.stopPrank();

            totalRaised += donationAmount;
        }

        // 打印总捐赠的ETH数量
        console.log("Total ETH raised: %s", totalRaised);
        console.log("Total USD raised: %s", tokenPresale.totalUsdRaised());

        // 如果尚未达到目标，最后一个用户追加捐赠
        if (tokenPresale.totalUsdRaised() < tokenPresale.goalInUsd()) {
            // 计算还需多少USD
            uint256 remainingUsd = tokenPresale.goalInUsd() - tokenPresale.totalUsdRaised();
            console.log("Need additional USD: %s", remainingUsd);

            // 估算需要多少ETH
            uint256 ethUsdPrice = PriceConverter.getLatestETHPriceInUSD(1 ether);
            uint256 additionalEthNeeded = (remainingUsd * 1e18) / ethUsdPrice;
            console.log("Additional ETH needed: %s", additionalEthNeeded);

            // 追加捐赠
            vm.deal(users[0], additionalEthNeeded);
            vm.prank(users[0]);
            tokenPresale.fund{value: additionalEthNeeded}();
        }

        // 确保达到目标
        assertTrue(tokenPresale.totalUsdRaised() >= tokenPresale.goalInUsd(), "Goal not reached");

        // 2. 提现ETH到项目方账户
        uint256 contractBalance = address(tokenPresale).balance;
        uint256 ownerBalanceBefore = owner.balance;

        vm.prank(owner);
        tokenPresale.withdrawETH();

        // 验证ETH已转移
        assertEq(owner.balance - ownerBalanceBefore, contractBalance);
        assertEq(address(tokenPresale).balance, 0);
        assertTrue(tokenPresale.isClaimEnabled());

        // 3. 验证所有用户的代币分配
        uint256 totalTokens = 0;
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            uint256 userTokens = tokenPresale.userTotalToken(user);
            totalTokens += userTokens;

            // 打印用户信息
            (uint256 contributed, uint256 claimed, uint256 claimable) = tokenPresale.getUserInfo(user);
            console.log("User %s: Contributed %s USD, Total Tokens %s", i, contributed, userTokens);
        }

        // 4. 测试不同时间点的线性解锁
        // 30% 解锁时间点
        vm.warp(tokenPresale.unlockStartTime() + (tokenPresale.unlockDuration() * 30) / 100);

        // 随机选择两个用户领取代币
        uint256 user1Index = 1; // 用户1
        uint256 user2Index = 3; // 用户3

        // 用户1领取30%的代币
        vm.prank(users[user1Index]);
        tokenPresale.claimTokens();

        // 验证用户1已领取的代币数量
        uint256 user1TotalTokens = tokenPresale.userTotalToken(users[user1Index]);
        uint256 user1ClaimedTokens = tokenPresale.userClaimedTokens(users[user1Index]);
        assertApproxEqAbs(
            user1ClaimedTokens,
            (user1TotalTokens * 30) / 100,
            10, // 允许小误差
            "User 1 claimed incorrect token amount at 30%"
        );

        // 60% 解锁时间点
        vm.warp(tokenPresale.unlockStartTime() + (tokenPresale.unlockDuration() * 60) / 100);

        // 用户1再次领取额外的30%代币
        vm.prank(users[user1Index]);
        tokenPresale.claimTokens();

        // 用户3领取60%的代币
        vm.prank(users[user2Index]);
        tokenPresale.claimTokens();

        // 验证用户1已领取约60%的代币
        user1ClaimedTokens = tokenPresale.userClaimedTokens(users[user1Index]);
        assertApproxEqAbs(
            user1ClaimedTokens, (user1TotalTokens * 60) / 100, 10, "User 1 claimed incorrect token amount at 60%"
        );

        // 验证用户3已领取约60%的代币
        uint256 user3TotalTokens = tokenPresale.userTotalToken(users[user2Index]);
        uint256 user3ClaimedTokens = tokenPresale.userClaimedTokens(users[user2Index]);
        assertApproxEqAbs(
            user3ClaimedTokens, (user3TotalTokens * 60) / 100, 10, "User 3 claimed incorrect token amount at 60%"
        );

        // 100% 解锁时间点
        vm.warp(tokenPresale.unlockStartTime() + tokenPresale.unlockDuration() + 1);

        // 所有用户领取剩余代币
        for (uint256 i = 0; i < users.length; i++) {
            // 跳过已经完全领取的用户
            if (tokenPresale.userClaimedTokens(users[i]) < tokenPresale.userTotalToken(users[i])) {
                vm.prank(users[i]);
                tokenPresale.claimTokens();
            }
        }

        // 验证所有用户都已领取全部代币
        for (uint256 i = 0; i < users.length; i++) {
            if (tokenPresale.userTotalToken(users[i]) > 0) {
                assertEq(
                    tokenPresale.userClaimedTokens(users[i]),
                    tokenPresale.userTotalToken(users[i]),
                    "User has unclaimed tokens"
                );
            }
        }
    }

    // 测试紧急情况下终止预售的场景
    function testStageEmergencyScenario() public {
        // 1. 初始捐赠
        vm.prank(users[0]);
        tokenPresale.fund{value: 0.01 ether}();

        vm.prank(users[1]);
        tokenPresale.fund{value: 0.01 ether}();

        // 记录初始状态
        uint256 initialUsdRaised = tokenPresale.totalUsdRaised();
        uint256 contractBalance = address(tokenPresale).balance;

        // 2. 发生紧急情况，项目方暂停合约
        vm.prank(owner);
        tokenPresale.pause();

        // 3. 验证用户无法继续捐赠
        vm.prank(users[2]);
        vm.expectRevert(); // notPaused修饰器使用require无消息
        tokenPresale.fund{value: 0.01 ether}();

        // 4. 项目方在暂停状态下仍然可以提取资金（如果达到条件）
        // 可能需要调整时间才能提取
        vm.warp(tokenPresale.presaleEndTime() + 1);

        vm.prank(owner);
        tokenPresale.withdrawETH();

        // 验证资金已转移
        assertEq(address(tokenPresale).balance, 0);

        // 5. 验证代币分配是否正确
        // 由于提取触发enableClaim，代币应该已经分配
        uint256 user0TokensExpected = tokenPresale.userUsdContributed(users[0]) / 1e18 * tokenPresale.tokenPerUsdRate();
        uint256 user1TokensExpected = tokenPresale.userUsdContributed(users[1]) / 1e18 * tokenPresale.tokenPerUsdRate();

        assertEq(tokenPresale.userTotalToken(users[0]), user0TokensExpected);
        assertEq(tokenPresale.userTotalToken(users[1]), user1TokensExpected);

        // 6. 确保紧急暂停不会影响已经启用的代币领取
        vm.warp(tokenPresale.unlockStartTime() + tokenPresale.unlockDuration() + 1);

        vm.prank(users[0]);
        tokenPresale.claimTokens();

        vm.prank(users[1]);
        tokenPresale.claimTokens();

        // 验证代币可以完全领取
        assertEq(tokenPresale.userClaimedTokens(users[0]), user0TokensExpected);
        assertEq(tokenPresale.userClaimedTokens(users[1]), user1TokensExpected);
    }
}
