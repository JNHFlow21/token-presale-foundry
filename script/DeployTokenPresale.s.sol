// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {TokenPresale} from "../src/TokenPresale.sol";
import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";

/**
 * @title DeployTokenPresale
 * @notice 部署代币预售合约的脚本
 * @dev 使用命令: forge script script/DeployTokenPresale.s.sol:DeployTokenPresale --rpc-url $RPC_URL --broadcast
 */
contract DeployTokenPresale is Script {
    // 常量定义
    uint8 public constant DECIMALS = 8;
    int256 public constant INITIAL_PRICE = 2000 * 10**8; // 2000 USD/ETH, 8位小数
    
    // 链上价格预言机地址映射
    mapping(uint256 => address) public chainIdToPriceFeed;
    
    // 构造函数初始化已知链的价格预言机地址
    constructor() {
        // Sepolia测试网
        chainIdToPriceFeed[11155111] = 0x694AA1769357215DE4FAC081bf1f309aDC325306;
        
        // 主网
        chainIdToPriceFeed[1] = 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419;
        
        // 可以添加更多链的配置
        // chainIdToPriceFeed[xxx] = 0x...;
    }
    
    function run() external {
        // 获取部署者的私钥
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // 开始广播交易
        vm.startBroadcast(deployerPrivateKey);
        
        // 获取当前链ID
        uint256 chainId = block.chainid;
        console.log("Deploying to chain ID:", chainId);
        
        // 获取或部署价格预言机
        address priceFeedAddress = getPriceFeedAddress(chainId);
        console.log("Using price feed at:", priceFeedAddress);
        
        // 部署TokenPresale合约
        TokenPresale tokenPresale = new TokenPresale(priceFeedAddress);
        console.log("TokenPresale deployed at:", address(tokenPresale));
        
        // 结束广播
        vm.stopBroadcast();
    }
    
    /**
     * @dev 根据链ID获取适当的价格预言机地址
     * @param chainId 当前链ID
     * @return 价格预言机地址
     */
    function getPriceFeedAddress(uint256 chainId) internal returns (address) {
        // 检查是否为本地开发链
        if (chainId == 31337 || chainId == 1337) {
            // 本地链，部署Mock
            console.log("Local development chain detected, deploying Mock...");
            MockV3Aggregator mockPriceFeed = new MockV3Aggregator(
                DECIMALS,
                INITIAL_PRICE
            );
            return address(mockPriceFeed);
        }
        
        // 检查是否有预配置的价格预言机
        address priceFeed = chainIdToPriceFeed[chainId];
        if (priceFeed != address(0)) {
            return priceFeed;
        }
        
        // 如果没有预配置，抛出错误
        revert("Unsupported chain ID. Please configure price feed for this chain.");
    }
}
