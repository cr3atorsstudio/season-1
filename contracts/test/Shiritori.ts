import { ethers } from "hardhat";
import { NFTMintedEvent } from "../typechain-types/contracts/shiritori.sol/Shiritori";

const { expect } = require("chai");

describe("Shiritori contract", function () {
  it("deploy correctly", async function () {
    const [owner] = await ethers.getSigners();

    const Shiritori = await ethers.getContractFactory("Shiritori");

    const shiritori = await Shiritori.deploy(
      "shiritori",
      "symbol",
      "https://rlho.github.io/nft_sample/{id}.json",
      999,
      0,
      0
    );

    expect(await shiritori.lastWord()).to.equal(0);
    expect(await shiritori.name()).to.equal("shiritori");
    expect(await shiritori.symbol()).to.equal("symbol");
    expect(await shiritori.uri(0)).to.equal(
      "https://rlho.github.io/nft_sample/{id}.json"
    );
    expect(await shiritori.nextTokenId()).to.equal(0);
  });

  it("it set URI", async function () {
    const [owner, alice] = await ethers.getSigners();

    const Shiritori = await ethers.getContractFactory("Shiritori");

    const shiritori = await Shiritori.deploy(
      "shiritori",
      "symbol",
      "https://rlho.github.io/nft_sample/{id}.json",
      999,
      0,
      0
    );
    expect(await shiritori.uri(0)).to.equal(
      "https://rlho.github.io/nft_sample/{id}.json"
    );
    await shiritori.setURI("https://example.com/{id}.json");
    expect(await shiritori.uri(0)).to.equal("https://example.com/{id}.json");

    await expect(
      shiritori.connect(alice).setURI("https://example.com/alice/{id}.json")
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("it mint nft", async function () {
    const [owner, alice] = await ethers.getSigners();

    const Shiritori = await ethers.getContractFactory("Shiritori");

    const shiritori = await Shiritori.deploy(
      "shiritori",
      "symbol",
      "https://rlho.github.io/nft_sample/{id}.json",
      999,
      0,
      0
    );
    await shiritori.mint(1, 999);
    expect(await shiritori.balanceOf(owner.address, 0)).to.equal(1);
    expect(await shiritori.lastWord()).to.equal(1);
    expect(await shiritori.nextTokenId()).to.equal(1);
  });

  it("it emits an event", async function () {
    const [owner, alice] = await ethers.getSigners();

    const Shiritori = await ethers.getContractFactory("Shiritori");

    const shiritori = await Shiritori.deploy(
      "shiritori",
      "symbol",
      "https://rlho.github.io/nft_sample/{id}.json",
      999,
      0,
      0
    );
    const tx = await shiritori.mint(1, 999);
    const receipt = await tx.wait();
    const { event, args } = receipt.events?.[1] as NFTMintedEvent;

    expect(event).to.equal("NFTMinted");
    expect(args[0]).to.equal(1);
  });
});
