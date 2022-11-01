// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Shiritori is ERC1155, Ownable {
    // TODO: 「ん」で終わったとき: フロントと相談、isUsedNFlag?的なbooleanを渡す?

    string public name;
    string public symbol;
    string private metadataURIprefix;
    string private metadataURIsuffix;

    // 認証用の一つ前の単語 //TODO: Change value
    uint256 private authWord = 0;
    /* 最後のテキストを返す */
    uint256 public lastWord = 0;
    // 次に使われるTokenIdを返す
    uint256 public nextTokenId = 0;

    constructor() ERC1155("") {
        // TODO: change url
        metadataURIprefix = "https://rlho.github.io/nft_sample/";
        metadataURIsuffix = ".json";
        name = "Shiritori";
        symbol = "SRT";
    }

    // setURI
    function setMetadataURI(string memory _prefix, string memory _suffix)
        public
        onlyOwner
    {
        metadataURIprefix = _prefix;
        metadataURIsuffix = _suffix;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    metadataURIprefix,
                    Strings.toString(_id),
                    metadataURIsuffix
                )
            );
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
