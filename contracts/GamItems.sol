// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameItems is ERC1155, Ownable {
    using Strings for uint256;

    uint256 public constant GOLD = 0;
    uint256 public constant SWORD = 1;
    uint256 public constant SHIELD = 2;
    uint256 public constant LEGENDARY_HELM = 3;

    string private baseURI;

    constructor(string memory _baseURI) 
        ERC1155(_baseURI) 
        Ownable(msg.sender) 
    {
        baseURI = _baseURI;
        _mint(msg.sender, GOLD, 10000 ether, "");        // Fungible currency
        _mint(msg.sender, SWORD, 500, "");               // Semi-fungible
        _mint(msg.sender, LEGENDARY_HELM, 10, "");       // Rare
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) 
        public onlyOwner 
    {
        _mint(to, id, amount, data);
    }

    // Admin batch mint (very powerful for ERC1155)
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) 
        public onlyOwner 
    {
        _mintBatch(to, ids, amounts, data);
    }

    // Optional: Update base URI later
    function setURI(string memory newuri) public onlyOwner {
        baseURI = newuri;
    }
}