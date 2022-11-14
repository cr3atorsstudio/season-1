const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("Shiritori");
  const nft = await NFT.deploy(
    "test",
    "symbol",
    "https://shiriitori.s3.us-east-1.amazonaws.com/metadata/${id}.json",
    0,
    0,
    1
  );

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);

  let txn;

  txn = await nft.mint(1055, 0); // くま
  await txn.wait();

  const lastWordNum = await nft.lastWord();

  console.log("lastWordNum is:", lastWordNum);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
