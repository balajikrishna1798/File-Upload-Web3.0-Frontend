require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/66f01ebde6fc4dcda8e4ce6096412ca7",
      accounts: [`0x030ea2d87c057a4576d1fa2029c7395d77d50e4158838f97f74ed71dbecb9f9f`]
    }
  }
};
