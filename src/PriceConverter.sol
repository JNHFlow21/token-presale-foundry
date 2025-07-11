// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// 此库已不再使用，价格转换逻辑已移至TokenPresale合约
// 保留此文件仅为兼容性目的

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    // 此函数不再被调用
    function getLatestETHPriceInUSD(uint256 ethAmountInWei) internal view returns (uint256) {
        return 0;
    }
}
