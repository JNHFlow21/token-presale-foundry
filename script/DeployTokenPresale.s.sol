// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {TokenPresale} from "../src/TokenPresale.sol";
import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";

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

        address priceFeedAddress;

        if (block.chainid == 31337) {
              // 本地 anvil，部署 mock
              MockV3Aggregator mock = new MockV3Aggregator(8, 2000 * 1e8); // 模拟 2000 USD
            priceFeedAddress = address(mock);
            console.log("Deployed MockV3Aggregator at", priceFeedAddress);
        } else if (block.chainid == 11155111) {
            // sepolia 上的 ETH/USD 真实预言机地址
            priceFeedAddress = 0x694AA1769357215DE4FAC081bf1f309aDC325306;
        } else {
            revert("Unsupported chain id");
        }

        // 部署TokenPresale合约
        TokenPresale tokenPresale = new TokenPresale(priceFeedAddress);
        console.log("TokenPresale deployed at:", address(tokenPresale));

        // 打印部署的合约地址
        console.log("TokenPresale deployed at:", address(tokenPresale));

        // 结束广播
        vm.stopBroadcast();
    }
}
