// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserAuthentication {
    // Mapping of wallet address to registration status
    mapping(address => bool) private registered;

    // Event to emit when a user is registered
    event UserRegistered(address userAddress);

    // Function to register the sender's address
    function register() public {
        require(!registered[msg.sender], "Address is already registered.");
        registered[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    // Function to check if an address is registered
    function isRegistered(address userAddress) public view returns (bool) {
        return registered[userAddress];
    }
}
