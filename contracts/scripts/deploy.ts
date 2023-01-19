const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("Shiritori");
  const nft = await NFT.deploy(
    "ShiritoriNFT",
    "shiritori",
    "https://shiriitori.s3.us-east-1.amazonaws.com/v2/metadata/{id}.json",
    0,
    0,
    0
  );

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);

  let txn;

  txn = await nft.mint(132776, 0, 0); // くすり
  await txn.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
