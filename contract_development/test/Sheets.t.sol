// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Sheets.sol";
import "openzeppelin-contracts/token/ERC721/IERC721Receiver.sol";

contract SheetsTest is Test, IERC721Receiver {
    Sheets public sheets;
    string public ipfsPath;
    string[] public input;

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return this.onERC721Received.selector;
    }
    
    function setUp() public {
        sheets = new Sheets();
        ipfsPath = "QmaBCkhaeaaCzEKK1K9xzL39vMaXjA6QU1aERqSoXfVJmm";
        input = new string[](3);
        input[0] = "Me";
        input[1] = "You";
        input[2] = "Him";
    }

    function testMintSingleContributor() public {
        string[] memory singleInput = new string[](1);
        singleInput[0] = "Me";
        uint256 tokenId = sheets.mint(singleInput, "This", ipfsPath);

        string memory contributor = sheets.getContributors(tokenId)[0];

        assertEq(contributor, "Me");
    }

    function testMintMultipleContributors() public {
        uint256 tokenId = sheets.mint(input, "This", ipfsPath);

        string[] memory contributors = sheets.getContributors(tokenId);

        assertEq(contributors[0], "Me");
        assertEq(contributors[1], "You");
        assertEq(contributors[2], "Him");
    }

    function testMintTitle() public {
        uint256 tokenId = sheets.mint(input, "This", ipfsPath);

        string memory title = sheets.getTitle(tokenId);

        assertEq(title, "This");
    }

    function testMintUri() public {
        uint256 tokenId = sheets.mint(input, "This", ipfsPath);

        string memory uri = sheets.tokenURI(tokenId);

        assertEq(uri, ipfsPath);
    }

    function testMintIncrement() public {
        uint256 firstTokenId = sheets.mint(input, "This", ipfsPath);
        uint256 secondTokenId = sheets.mint(input, "This", ipfsPath);

        assertTrue(firstTokenId == secondTokenId - 1);
    }
}
