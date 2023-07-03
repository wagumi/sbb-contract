const artifact = require('../artifacts/contracts/sbb.sol/WSBB.json');
const { program } = require('commander');
const ethers = require('ethers');
const hre = require('hardhat');

async function mint(network, contractAddress, tokenId, addresses) {
    const networkConfig = hre.config.networks[network];
    const provider = new ethers.providers.JsonRpcProvider(networkConfig.url);
    const signer = new ethers.Wallet(networkConfig.accounts[0], provider);
    const contract = new ethers.Contract(contractAddress, artifact.abi, signer);
    const tx = await contract.mint(tokenId, addresses);
    await tx.wait();
    console.log(
        `minted SBBs with token id ${tokenId} to ${addresses} at tx ${tx.hash}`
    );
}

program
    .requiredOption('-n --network <string>', 'Network name')
    .requiredOption('-c --contractAddress <string>', 'Contract address')
    .requiredOption('-i --tokenId <number>', 'Token ID')
    .requiredOption('-a --addresses <strings...>', 'Addresses')
    .parse();
const options = program.opts();

mint(
    options.network,
    options.contractAddress,
    options.tokenId,
    options.addresses
).catch((error) => {
    console.error(error);
    process.exit(1);
});
