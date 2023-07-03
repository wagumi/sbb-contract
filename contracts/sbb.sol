// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract WSBB is ERC1155, Ownable {
    string public constant name = 'WSBB';
    string public constant symbol = 'WSBB';

    address[] mintErrorAddresses;
    error MintError(address[] to);

    constructor() ERC1155('') {
        _mint(msg.sender, 0, 1, '');
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(uint256 id, address[] memory accounts) public onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            address to = accounts[i];
            if (balanceOf(to, id) == 0) {
                _mint(accounts[i], id, 1, '');
            } else {
                mintErrorAddresses.push(to);
            }
        }

        if (mintErrorAddresses.length > 0) {
            revert MintError(mintErrorAddresses);
        }
    }

    function burn(address account, uint256 id, uint256 amount) public {
        require(
            msg.sender == account || msg.sender == owner(),
            'Caller is not the owner nor the token owner'
        );
        _burn(account, id, amount);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override onlyOwner {
        _safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override onlyOwner {
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }
}
