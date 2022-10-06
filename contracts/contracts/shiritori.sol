// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Shiritori is ERC1155 {
    // func1: 最後のテキストを返す
    // TODO: 「ん」で終わったとき: フロントと相談、isUsedNFlag?的なbooleanを渡す?
    /** 同じ単語は使える */

    // func2: 最後のテキストを受け取る -> Generative Artを生成するAPIを呼ぶ -> mintする
    /* 最後のテキストを返す */
    uint256 public constant LAST_WORD = 0;
    // TODO: ↑これを返す関数が必要(func2)

    uint8 public amount = 1;

    // このjson周りをgenerative Artチームが作成中
    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        // _mint が mintする関数
        _mint(msg.sender, LAST_WORD, 10**18, "");

        _purchase(amount, LAST_WORD);
    }

    /**
    * function1
    * openzeplin見て
    *
    * @param amount the amount of tokens to purchase
    * @param text the inputted word
    */
    //?? amount 必要なの？
    function _purchase(uint256 amount, uint256 text) private {
        // exist text
        // require(text, "Exist the text");
        console.log(text);
        _mint(msg.sender, 0, amount, "");
    }
}
