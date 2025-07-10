// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {TokenPresale, PresaleEnded, GoalReached, notOwner, notFinished, ClaimDisabled, TooSmall, withdrawFailed} from "../../src/TokenPresale.sol";
import {PriceConverter} from "../../src/PriceConverter.sol";
import {MockV3Aggregator} from "../mocks/MockV3Aggregator.sol"; //用于unit/integration test 的mock price feed
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol"; //用于 forked / staging


/**
 * @title TokenPresaleTest_Unit
 * @author @JNHFlow21
 * @notice 单元测试，测试TokenPresale合约的各个功能
 *          所有的modifier都要测试 所有function都要测试
 * forge test --match-path test/unit/TokenPresaleTest_Unit.t.sol -vvvv
 */

contract TokenPresaleTest_Unit is Test {
    TokenPresale tokenPresale;
    address owner = makeAddr("owner");
    address user1 = makeAddr("user1");
    address user2 = makeAddr("user2");
    uint256 constant STARTING_BALANCE = 10 ether;
    // 使用较低的ETH/USD价格，这样我们的测试不会轻易触发GoalReached
    uint256 constant ETH_USD_PRICE = 1000e8; // 1000 USD/ETH with 8 decimals
    
    // Mock price feed at the address used in PriceConverter
    MockV3Aggregator mockPriceFeed;
    address constant AGGREGATOR_ADDRESS = 0x694AA1769357215DE4FAC081bf1f309aDC325306;
    
    function setUp() public {
        // 首先部署一个MockV3Aggregator的实例
        mockPriceFeed = new MockV3Aggregator(8, int256(ETH_USD_PRICE));
        
        // 使用vm.etch将mock的bytecode复制到AGGREGATOR_ADDRESS,用自己定义的mock代替chainlink的price feed
        vm.etch(AGGREGATOR_ADDRESS, address(mockPriceFeed).code);
        
        // 合约由code 和 storage组成
        // vm.etch 只复制了code，storage是空的，所以还要再次设置一次价格
        MockV3Aggregator(AGGREGATOR_ADDRESS).updateAnswer(int256(ETH_USD_PRICE));
        
        // 创建TokenPresale合约
        // 以创建的owner身份来布置合约
        vm.startPrank(owner);
        tokenPresale = new TokenPresale();
        vm.stopPrank();
        
        // 设置测试账户余额
        vm.deal(user1, STARTING_BALANCE);
        vm.deal(user2, STARTING_BALANCE);
        
        // 确认目标USD金额
        console.log("Goal in USD:", tokenPresale.goalInUsd());
    }
    
    // 测试tokenPresale合约中的常量设置
    function testInitialValues() public view {
        assertEq(tokenPresale.owner(), owner);
        assertEq(tokenPresale.tokenPerUsdRate(), 100);
        assertEq(tokenPresale.goalInUsd(), 50 * 1e18);
        assertFalse(tokenPresale.isClaimEnabled());
        assertFalse(tokenPresale.paused());
    }

    // Test fund functionality
    function testFund_SuccessfulContribution() public {
        // Arrange
        uint256 contributionAmount = 0.01 ether; // 0.01 ETH = 10 USD at 1000 USD/ETH
        
        // Act
        vm.prank(user1); // 单步调用
        tokenPresale.fund{value: contributionAmount}();
        
        // Assert
        assertTrue(tokenPresale.hasContributed(user1));
        // 0.01 ETH * 1000 USD/ETH = 10 USD with 18 decimals = 10e18
        assertEq(tokenPresale.userUsdContributed(user1), 10e18);
        assertEq(tokenPresale.contributors(0), user1);
    }
    
    function testFund_RevertWhenTooSmall() public {
        // Arrange
        uint256 tooSmallAmount = 0.009 ether; // 0.009 ETH = 9 USD at 1000 USD/ETH, minimum is 10 USD
        
        // Act & Assert
        vm.prank(user1);
        // 预期抛出 TooSmall 错误 selector 是一个 4字节的bytes4值，不能直接使用TooSmall（）因为这不是一个值
        vm.expectRevert(TooSmall.selector);
        // value 语法调用 payable 函数，用于在调用合约的 payable 函数时，同时发送 ETH。
        // <contract>.<function>{value: <etherAmount>}(<args>);
        tokenPresale.fund{value: tooSmallAmount}();
    }
    
    function testFund_RevertWhenPresaleEnded() public {
        // Arrange - Fast forward time past presaleEndTime
        uint256 presaleEndTime = tokenPresale.presaleEndTime();
        vm.warp(presaleEndTime + 1);
        
        // Act & Assert
        vm.prank(user1);
        vm.expectRevert(PresaleEnded.selector);
        tokenPresale.fund{value: 0.01 ether}();
    }
    
    function testFund_RevertWhenGoalReached() public {
        // Arrange - Fund enough to reach goal (50 USD)
        // Need 0.05 ETH to get 50 USD at 1000 USD/ETH
        vm.prank(user1);
        tokenPresale.fund{value: 0.05 ether}();
        
        // Act & Assert
        vm.prank(user2);
        vm.expectRevert(GoalReached.selector);
        tokenPresale.fund{value: 0.01 ether}();
    }
    
    function testFund_SingleUser() public {
        // Arrange
        uint256 user1Amount = 0.01 ether; // 10 USD
        
        // Act
        vm.prank(user1);
        tokenPresale.fund{value: user1Amount}();
        
        // Assert
        assertEq(tokenPresale.userUsdContributed(user1), 10e18);
        assertEq(tokenPresale.totalUsdRaised(), 10e18);
        assertEq(tokenPresale.contributors(0), user1);
    }
    
    function testFund_TwoContributors() public { 
        // Arrange - 以这个价格，每笔捐款价值5 USD
        // 0.01 ether = 10 USD at 1000 USD/ETH
        uint256 user1Amount = 0.01 ether; 
        uint256 user2Amount = 0.01 ether;
        
        // Act
        vm.prank(user1);
        tokenPresale.fund{value: user1Amount}();
        vm.prank(user2);
        tokenPresale.fund{value: user2Amount}();
        
        // Assert - 验证两个用户都成功捐赠
        assertTrue(tokenPresale.hasContributed(user1));
        assertTrue(tokenPresale.hasContributed(user2));
        assertEq(tokenPresale.userUsdContributed(user1), 10e18);
        assertEq(tokenPresale.userUsdContributed(user2), 10e18);
        
        // 确认总募集额 (约20 USD)
        assertEq(tokenPresale.totalUsdRaised(), 20e18);
    }
    
    function testCalculateTokensSimplified() public {
        // 1. 募集一笔资金
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 10 USD
        
        // 2. 提前结束预售
        uint256 presaleEndTime = tokenPresale.presaleEndTime();
        vm.warp(presaleEndTime + 1);
        
        // 3. 提现，触发计算代币
        vm.prank(owner);
        tokenPresale.withdrawETH();
        
        // 4. 验证代币计算结果
        assertEq(tokenPresale.userTotalToken(user1), 10 * 100); // 10 USD * 100 = 2000 tokens
    }
    
    // Test modifiers
    function testModifier_OnlyOwner() public {
        // Act & Assert
        vm.prank(user1);
        vm.expectRevert(notOwner.selector);
        tokenPresale.pause();
    }
    
    function testModifier_CanWithdraw_NotFinished() public {
        // Act & Assert
        vm.prank(owner);
        vm.expectRevert(notFinished.selector);
        tokenPresale.withdrawETH();
    }
    
    function testModifier_CanWithdraw_GoalReached() public {
        // Arrange - Fund enough to reach goal
        vm.prank(user1);
        tokenPresale.fund{value: 0.05 ether}(); // 50 USD at 1000 USD/ETH
        
        // Act
        vm.prank(owner);
        tokenPresale.withdrawETH();
        
        // Assert
        assertEq(address(tokenPresale).balance, 0);
        assertTrue(tokenPresale.isClaimEnabled());
    }
    
    function testModifier_CanWithdraw_TimeEnded() public {
        // Arrange
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 10 USD (below goal)
        
        // Time passes
        uint256 presaleEndTime = tokenPresale.presaleEndTime();
        vm.warp(presaleEndTime + 1);
        
        // Act
        vm.prank(owner);
        tokenPresale.withdrawETH();
        
        // Assert
        assertEq(address(tokenPresale).balance, 0);
        assertTrue(tokenPresale.isClaimEnabled());
    }
    
    function testModifier_CanClaim() public {
        // Arrange - Need to complete presale and enable claiming first
        vm.prank(user1);
        tokenPresale.fund{value: 0.05 ether}(); // 50 USD
        
        vm.prank(owner);
        tokenPresale.withdrawETH(); // Enables claiming
        
        // Act
        vm.prank(user1);
        tokenPresale.claimTokens();
        
        // Assert - No revert means test passes
        // Check actual tokens in other tests
    }
    
    function testModifier_CanClaim_RevertWhenDisabled() public {
        // Act & Assert - Claim is disabled by default
        vm.prank(user1);
        vm.expectRevert(ClaimDisabled.selector);
        tokenPresale.claimTokens();
    }
    
    // Test Pause functionality
    function testPause() public {
        // Act
        vm.prank(owner);
        tokenPresale.pause();
        
        // Assert
        assertTrue(tokenPresale.paused());
        
        // Try to fund while paused
        vm.prank(user1);
        vm.expectRevert(); // The notPaused modifier uses require without a message
        tokenPresale.fund{value: 0.01 ether}();
    }
    
    function testUnpause() public {
        // Arrange
        vm.startPrank(owner);
        tokenPresale.pause();
        tokenPresale.unpause();
        vm.stopPrank();
        
        // Assert
        assertFalse(tokenPresale.paused());
        
        // Should be able to fund
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}();
        
        // Check fund worked
        assertEq(tokenPresale.userUsdContributed(user1), 10e18);
    }
    
    function testGetTokenClaimable_PartialUnlock() public {
        // Arrange - Setup presale completion
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 10 USD = 1000 tokens
        
        uint256 presaleEndTime = tokenPresale.presaleEndTime();
        vm.warp(presaleEndTime + 1);
        
        vm.prank(owner);
        tokenPresale.withdrawETH();
        
        // Move time forward partially through unlock period (12 hours)
        vm.warp(tokenPresale.unlockStartTime() + 12 hours);
        
        // Act & Assert
        uint256 claimable = tokenPresale.getTokenClaimable(user1);
        assertEq(claimable, 500); // 50% of 1000 tokens = 500 tokens
    }
    
    function testGetTokenClaimable_FullUnlock() public {
        // Arrange - Setup presale completion
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 10 USD = 1000 tokens
        
        uint256 presaleEndTime = tokenPresale.presaleEndTime();
        vm.warp(presaleEndTime + 1);
        
        vm.prank(owner);
        tokenPresale.withdrawETH();
        
        // Move time forward past unlock period
        vm.warp(tokenPresale.unlockStartTime() + 1 days + 1);
        
        // Act & Assert
        uint256 claimable = tokenPresale.getTokenClaimable(user1);
        assertEq(claimable, 1000); // 100% of 1000 tokens
    }
    
    function testClaimTokens() public {
        // Arrange - Setup presale completion
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 10 USD = 1000 tokens
        
        uint256 presaleEndTime = tokenPresale.presaleEndTime();
        vm.warp(presaleEndTime + 1);
        
        vm.prank(owner);
        tokenPresale.withdrawETH();
        
        // Move time forward halfway through unlock
        vm.warp(tokenPresale.unlockStartTime() + 12 hours);
        
        // Act
        vm.prank(user1);
        tokenPresale.claimTokens();
        
        // Assert
        assertEq(tokenPresale.userClaimedTokens(user1), 500); // 50% claimed
        
        // Move time forward to 75% unlock
        vm.warp(tokenPresale.unlockStartTime() + 18 hours);
        
        // Claim again
        vm.prank(user1);
        tokenPresale.claimTokens();
        
        // Should have 75% claimed now
        assertEq(tokenPresale.userClaimedTokens(user1), 750); // 75% claimed
    }
    
    function testGetUserInfo() public {
        // Arrange
        vm.prank(user1);
        tokenPresale.fund{value: 0.01 ether}(); // 10 USD = 1000 tokens
        
        uint256 presaleEndTime = tokenPresale.presaleEndTime();
        vm.warp(presaleEndTime + 1);
        
        vm.prank(owner);
        tokenPresale.withdrawETH();
        
        // Move time halfway through unlock
        vm.warp(tokenPresale.unlockStartTime() + 12 hours);
        
        // Claim some tokens
        vm.prank(user1);
        tokenPresale.claimTokens();
        
        // Act
        (uint256 contributed, uint256 claimed, uint256 claimable) = tokenPresale.getUserInfo(user1);
        
        // Assert
        assertEq(contributed, 10); // 10 USD (divided by 1e18 in the function)
        assertEq(claimed, 500); // 500 tokens claimed
        assertEq(claimable, 0); // 0 tokens claimable (already claimed the first 50%)
    }
    
    // Test fallback and receive functions
    function testReceive() public {
        // Act - Send ETH directly to contract
        vm.prank(user1);
        (bool success,) = address(tokenPresale).call{value: 0.01 ether}("");
        
        // Assert
        assertTrue(success);
        assertEq(tokenPresale.userUsdContributed(user1), 10e18);
    }
    
    function testFallback() public {
        // Act - Send ETH with data to contract
        vm.prank(user1);
        (bool success,) = address(tokenPresale).call{value: 0.01 ether}("0xabcdef");
        
        // Assert
        assertTrue(success);
        assertEq(tokenPresale.userUsdContributed(user1), 10e18);
    }
}
