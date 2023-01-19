// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Shiritori is ERC1155, Ownable {
    string public name;
    string public symbol;

    uint256 public lastLastWord;
    uint256 public lastWord;
    uint256 public nextTokenId;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri,
        uint256 _lastLastWord,
        uint256 _lastWord,
        uint256 _nextTokenId
    ) ERC1155(_uri) {
        name = _name;
        symbol = _symbol;
        lastLastWord = _lastLastWord;
        lastWord = _lastWord;
        nextTokenId = _nextTokenId;
    }

    event NFTMinted(uint256 nextTokenId);

    // setURI
    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }

    function mint(
        uint256 word,
        uint256 lastLastWords,
        uint256 lastWords
    ) public {
        require(
            lastLastWords == lastLastWord && lastWord == lastWords,
            "Shiritori: Authentication failed."
        );
        _mint(msg.sender, nextTokenId, 1, "");

        if (nextTokenId == 0) {
            lastLastWord = word;
        } else {
            lastLastWord = lastWord;
        }

        nextTokenId += 1;
        lastWord = word;

        emit NFTMinted(nextTokenId);
    }
}
