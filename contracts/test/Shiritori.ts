import { ethers } from "hardhat";

const { expect } = require("chai");

describe("Shiritori contract", function () {
  it("deploy correctly", async function () {
    const [owner] = await ethers.getSigners();

    const Shiritori = await ethers.getContractFactory("Shiritori");

    const shiritori = await Shiritori.deploy();

    expect(await shiritori.lastWord()).to.equal(0);
  });

  it("it set URI", async function () {
    const [owner, alice] = await ethers.getSigners();

    const Shiritori = await ethers.getContractFactory("Shiritori");

    const shiritori = await Shiritori.deploy();
    expect(await shiritori.uri(0)).to.equal(
      "https://rlho.github.io/nft_sample/0.json"
    );
    await shiritori.setMetadataURI("https://example.com/", ".json");
    expect(await shiritori.uri(0)).to.equal("https://example.com/0.json");

    await expect(
      shiritori
        .connect(alice)
        .setMetadataURI("https://example.com/alice/", ".json")
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("it mint nft", async function () {
    const [owner, alice] = await ethers.getSigners();

    const Shiritori = await ethers.getContractFactory("Shiritori");

    const shiritori = await Shiritori.deploy();
    await shiritori.mint(1, 0);
    expect(await shiritori.balanceOf(owner.address, 0)).to.equal(1);
    expect(await shiritori.lastWord()).to.equal(1);
    expect(await shiritori.nextTokenId()).to.equal(1);
  });
});
