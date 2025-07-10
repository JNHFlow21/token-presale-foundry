// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {TokenPresale} from "../src/TokenPresale.sol";

/**
 * @title DeployTokenPresale
 * @notice 部署代币预售合约的脚本
 * @dev 使用命令: forge script script/DeployTokenPresale.s.sol:DeployTokenPresale --rpc-url $RPC_URL --broadcast --verify
 */
/*
forge create src/TokenPresale.sol:TokenPresale \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $SEPOLIA_PRIVATE_KEY \
  --etherscan-api-key $ETHERSCAN_API_KEY \
  --verify \
  --legacy \
  --broadcast \
  -vvv
*/
contract DeployTokenPresale is Script {
    function run() external {
        // 获取部署者的私钥
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // 开始广播交易
        vm.startBroadcast(deployerPrivateKey);
        
        // 部署TokenPresale合约
        TokenPresale tokenPresale = new TokenPresale();
        
        // 打印部署的合约地址
        console.log("TokenPresale deployed at:", address(tokenPresale));
        
        // 结束广播
        vm.stopBroadcast();
    }
} 