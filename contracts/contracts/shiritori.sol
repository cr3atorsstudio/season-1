// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Shiritori is ERC1155, Ownable {
    // func1: 最後のテキストを返す
    // TODO: 「ん」で終わったとき: フロントと相談、isUsedNFlag?的なbooleanを渡す?
    /** 同じ単語は使える */

    // 認証用の一つ前の単語 //TODO: Change value
    uint256 private authWord = 0;
    /* 最後のテキストを返す */
    uint256 public lastWord = 0;
    // 次に使われるTokenIdを返す
    uint256 public nextTokenId = 0;

    // このjson周りをgenerative Artチームが作成中
    // TODO: change url
    constructor() ERC1155("https://rlho.github.io/nft_sample/{id}.json") {}

    // setURI
    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }

    // 単語と認証用の単語を受け取る -> mintする
    function mint(uint256 word, uint256 authenticationWords) public {
        require(
            authenticationWords == authWord,
            "Shiritori: Authentication failed."
        );
        _mint(msg.sender, nextTokenId, 1, "");

        // 変数を更新
        authWord = lastWord;
        nextTokenId += 1;
        lastWord = word;
    }
}
