// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Sheets is ERC721, ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => string[]) private _authors;
    mapping(uint256 => string) private _title;

    constructor() ERC721("Sheets", "SHT") {}

    function safeMint(
        string[] memory authors, 
        string memory title,
        string memory uri
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _authors[tokenId] = authors;
        _title[tokenId] = title;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function safeMint(
        string memory author, 
        string memory title,
        string memory uri
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _authors[tokenId][0] = author;
        _title[tokenId] = title;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function authors(uint256 tokenId) external view returns(string[]) {
        return _authors[tokenId];
    }

    function title(uint256 tokenId) external view returns(string) {
        return _title[tokenId];
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}