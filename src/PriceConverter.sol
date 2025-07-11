// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {TokenPresale} from "./TokenPresale.sol";

library PriceConverter {
    function getLatestETHPriceInUSD(uint256 ethAmountInWei) internal view returns (uint256) {
        // AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);

        // 强转成合约，调用 getPriceFeed
        AggregatorV3Interface priceFeed = TokenPresale(payable(msg.sender)).getPriceFeed();


        // prettier-ignore
        (
            /* uint80 roundId */
            ,
            int256 answer,
            /*uint256 startedAt*/
            ,
            /*uint256 updatedAt*/
            ,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();

        uint256 ethPrice = uint256(answer * 1e10);

        return (ethPrice * ethAmountInWei) / 1e18;
    }
}
