// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Shiritori is ERC1155 {
    // func1: 最後のテキストを返す
    // TODO: 「ん」で終わったとき: フロントと相談、isUsedNFlag?的なbooleanを渡す?
    /** 同じ単語は使える */

    /* 最後のテキストを返す */
    uint256 public lastWard = 0;
    // 次に使われるTokenIdを返す
    uint256 public nextTokenId = 0;
    uint8 public amount = 1;

    // このjson周りをgenerative Artチームが作成中
    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        // しりとりの一番最初の単語のミント　単語は仮
        mint(0);

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

    // function2 単語を受け取る -> mintする
    function mint(uint256 word) public {
        // TODO: wordが最後の単語ときちんと繋がるのか判断（直コン対策用）

        _mint(msg.sender, nextTokenId, 1, "");
        // 変数を更新
        nextTokenId += 1;
        lastWard = word;
    }
}
