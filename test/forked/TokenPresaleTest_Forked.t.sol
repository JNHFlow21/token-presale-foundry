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
 * @title TokenPresaleTest_Forked
 * @notice 分叉测试 - 在真实网络的分叉上测试合约
 * @dev 运行命令: forge test --match-path test/forked/TokenPresaleTest_Forked.t.sol --fork-url $SEPOLIA_RPC_URL -vvvv
 */
contract TokenPresaleTest_Forked is Test {
    TokenPresale tokenPresale;
    // address owner;
    address owner = makeAddr("owner");
    address user1 = makeAddr("user1");
    address user2 = makeAddr("user2");
    uint256 constant STARTING_BALANCE = 10 ether;
    address constant Chainlink_PriceFeed = 0x694AA1769357215DE4FAC081bf1f309aDC325306;

    // 使用真实的预言机和ETH价格

    receive() external payable {}
    fallback() external payable {}

    function setUp() public {
        //owner = address(this);

        // 1. 创建一个临时 EthReceiver 合约
        EthReceiver ethReceiver = new EthReceiver();

        // 2. 把这个合约的 bytecode 复制到 owner 地址
        vm.etch(owner, address(ethReceiver).code);

        // 3. 给 owner 地址发点 ETH 也没问题
        vm.deal(owner, 10 ether);

        // 创建TokenPresale合约
        vm.startPrank(owner);
        tokenPresale = new TokenPresale(Chainlink_PriceFeed);
        vm.stopPrank();

        // 给测试账户分配ETH
        vm.deal(user1, STARTING_BALANCE);
        vm.deal(user2, STARTING_BALANCE);
    }

    // 测试真实预言机返回的ETH/USD价格转换
    function testForkPriceConversion() public view {
        // 捐赠1 ETH，检查转换后的美元金额是否合理
        uint256 ethAmount = 1 ether;

        // 使用合约的getEthUsdPrice获取当前1 ETH的美元价值
        uint256 usdValue = tokenPresale.getEthUsdPrice(ethAmount);

        // 打印当前价格以进行检查
        console.log("1 ETH = %s USD (18 decimals)", usdValue);

        // 预言机价格可能会变动，但价格应该在合理范围内
        // 假设ETH价格在 $500 - $20,000 之间
        assertTrue(usdValue >= 500e18 && usdValue <= 20_000e18, "ETH price out of reasonable range");
    }

    // 测试在分叉环境中的完整预售流程
    function testForkCompletePresaleProcess() public {
        // 1. 计算需要捐赠多少ETH才能达到目标 (50 USD)
        // 注意：在实际环境中，ETH价格可能会波动，这需要根据实时价格调整
        // 为了适应这种情况，我们先捐赠少量测试

        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}();

        uint256 usdRaised = tokenPresale.totalUsdRaised();
        console.log("0.01 ETH = %s USD (18 decimals)", usdRaised);

        // 计算达到目标所需的剩余ETH
        uint256 remainingUsd = tokenPresale.goalInUsd() - usdRaised;
        console.log("Remaining USD needed: %s (18 decimals)", remainingUsd);

        // 计算需要额外捐赠的ETH (简单估算，不保证精确)
        uint256 usdPerEth = (usdRaised * 1e18) / (0.01 ether); //usdRaised 是1e18精度，0.01 ether 是18精度，会相互抵消，所以最后需要乘以1e18
        uint256 additionalEthNeeded = (remainingUsd * 1e18) / usdPerEth;
        console.log("Additional ETH needed: %s (18 decimals)", additionalEthNeeded);

        // 2. 继续捐赠以达到目标
        vm.prank(user2);
        tokenPresale.fund{value: additionalEthNeeded}();

        // 验证是否达到或超过目标
        // assertTrue(tokenPresale.totalUsdRaised() >= tokenPresale.goalInUsd(), "Goal not reached"); // 高精度除法都可能导致测试中出现 1 wei 级误差，要使用tolerance
        uint256 actual = tokenPresale.totalUsdRaised();
        uint256 expected = tokenPresale.goalInUsd();
        uint256 tolerance = 1e16; // 容忍约 0.01USD 误差

        assertLe(expected - actual, tolerance, "Goal not reached");

        // 3. 项目方提现ETH
        uint256 ownerBalanceBefore = owner.balance;
        uint256 contractBalance = address(tokenPresale).balance;

        vm.prank(owner);
        tokenPresale.withdrawETH();

        // 验证ETH已转移
        assertEq(owner.balance - ownerBalanceBefore, contractBalance);

        // 4. 验证代币计算
        uint256 user1UsdContributed = tokenPresale.userUsdContributed(user1) / 1e18;
        uint256 user1Tokens = tokenPresale.userTotalToken(user1);
        assertEq(user1Tokens, user1UsdContributed * tokenPresale.tokenPerUsdRate());

        uint256 user2UsdContributed = tokenPresale.userUsdContributed(user2) / 1e18;
        uint256 user2Tokens = tokenPresale.userTotalToken(user2);
        assertEq(user2Tokens, user2UsdContributed * tokenPresale.tokenPerUsdRate());

        // 5. 验证代币线性解锁
        vm.warp(tokenPresale.unlockStartTime() + 12 hours); // 50% 解锁时间

        uint256 user1Claimable = tokenPresale.getTokenClaimable(user1);
        assertEq(user1Claimable, user1Tokens / 2);
    }

    // 测试价格波动对预售的影响
    function testForkPriceFluctuation() public {
        // 1. 获取初始ETH价格
        uint256 initialUsdValue = tokenPresale.getEthUsdPrice(1 ether);
        console.log("Initial ETH price: %s USD (18 decimals)", initialUsdValue);

        // 2. 用户1捐赠
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}();

        uint256 user1UsdContribution = tokenPresale.userUsdContributed(user1);

        // 3. 模拟ETH价格上涨20%
        // 注意: 在真实的分叉环境中，我们无法真正改变价格预言机
        // 这个测试只是检查当前实际价格是否正常工作

        // 4. 用户2捐赠相同金额的ETH
        vm.prank(user2);
        tokenPresale.fund{value: 0.01 ether}();

        uint256 user2UsdContribution = tokenPresale.userUsdContributed(user2);

        // 5. 验证两次捐赠的美元价值是否接近
        // 在实际分叉中，短时间内价格应该相对稳定
        uint256 contributionDiff = user1UsdContribution > user2UsdContribution
            ? user1UsdContribution - user2UsdContribution
            : user2UsdContribution - user1UsdContribution;

        // 允许1%的误差（短时间内的价格波动）
        assertTrue(contributionDiff <= user1UsdContribution / 100, "Price fluctuation too high for short timeframe");
    }
}

contract EthReceiver {
    receive() external payable {}
}
