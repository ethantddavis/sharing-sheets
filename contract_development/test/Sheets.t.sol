// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Sheets.sol";

contract SheetsTest is Test {
    Sheets public sheets;
    string public ipfsPath;
    
    function setUp() public {
        sheets = new Sheets();
        ipfsPath = "QmaBCkhaeaaCzEKK1K9xzL39vMaXjA6QU1aERqSoXfVJmm";
    }

    function testSafeMintSingleAuthor() public {
        sheets.safeMint("Me", "This", ipfsPath);

        string author = sheets.authors(address(this))[0];
        assertEq(author, "Me");
    }
}
