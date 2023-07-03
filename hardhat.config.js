require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: '0.8.18',
        settings: {
            optimizer: {
                enabled: true,
                runs: 300,
            },
        },
    },
    networks: {
        goerli: {
            url: 'https://ethereum-goerli.publicnode.com',
            accounts: [process.env.PRIVATE_KEY],
        },
        sepolia: {
            url: 'https://rpc2.sepolia.org',
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY,
            goerli: process.env.ETHERSCAN_API_KEY,
        },
    },
};
