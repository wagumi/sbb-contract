const artifact = require('../artifacts/contracts/sbb.sol/WSBB.json');
const { program } = require('commander');
const ethers = require('ethers');
const hre = require('hardhat');

async function main(network) {
    const networkConfig = hre.config.networks[network];
    const provider = new ethers.providers.JsonRpcProvider(networkConfig.url);
    const signer = new ethers.Wallet(networkConfig.accounts[0], provider);
    const factory = new ethers.ContractFactory(
        artifact.abi,
        artifact.bytecode,
        signer
    );
    const contract = await factory.deploy();
    console.log('tx hash:', contract.deployTransaction.hash);
    await contract.deployed();
    console.log('Contract deployment completed');
}

program.requiredOption('-n --network <string>', 'Network name').parse();
const options = program.opts();

main(options.network)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
