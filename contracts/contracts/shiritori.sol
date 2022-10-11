// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Shiritori is ERC1155 {
    // func2: 最後のテキストを受け取る -> Generative Artを生成するAPIを呼ぶ -> mintする

    uint256 public LAST_WORD;
    // TODO: ↑これを返す関数が必要(func2)

    // このjson周りをgenerative Artチームが作成中
    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        // _mint が mintする関数
        _mint(msg.sender, LAST_WORD, 10**18, "");

        returnLastWord();
    }

    /**
    * function1: 最後のテキストを返す
    * 同じ単語は使える
    * 
    * 
    // TODO: 「ん」で終わったとき: フロントと相談、isUsedNFlag?的なbooleanを渡す?
    */
    function returnLastWord() public view returns (uint256) {
        return LAST_WORD;
    }
}
