require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("hardhat-gas-reporter");
require("@typechain/hardhat");

module.exports = {
  defaultNetwork: "hardhat",
  networks: { 
    hardhat: {
      chainId: 1337,
    },
    amoy: {
      url: `https://rpc-amoy.polygon.technology/`,
      accounts: [process.env.PRIVATE_KEY],
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 20
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v5",
  },
};
