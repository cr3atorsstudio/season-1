// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Shiritori is ERC1155, Ownable {
    string public name;
    string public symbol;

    uint256 private authWord;
    uint256 public lastWord;
    uint256 public nextTokenId;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        uint256 _authWord,
        uint256 _lastWord,
        uint256 _nextTokenId
    ) ERC1155(_uri) {
        name = _name;
        symbol = _symbol;
        authWord = _authWord;
        lastWord = _lastWord;
        nextTokenId = _nextTokenId;
    }

    event NFTMinted(uint256 nextTokenId);

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

        // 最初のmintの時は、authWordを渡されたwordにする。それ以降は前の単語をアサイン
        if (nextTokenId == 0) {
            authWord = word;
        } else {
            authWord = lastWord;
        }

        nextTokenId += 1;
        lastWord = word;

        emit NFTMinted(nextTokenId);
    }
}
