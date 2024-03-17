const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FloToken", function () {
  it("Should initialize with correct name and symbol", async function () {
    const [owner] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [
      owner,
      1000000000000,
    ]);

    expect(await FloToken.name()).to.equal("FloToken");
    expect(await FloToken.symbol()).to.equal("FTK");
  });

  it("Should initialize with the correct initial supply", async function () {
    const [owner] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [owner, 10000]);

    const expectedSupply = 10000; 
    expect(await FloToken.totalSupply()).to.equal(expectedSupply);
  });


  it("Should allow the owner to pause token transfers", async function () {
    const [owner] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [owner, 10000]);

    await FloToken.pause();
    expect(await FloToken.paused()).to.be.true;
  });

  it("Should allow the owner to unpause token transfers", async function () {
    const [owner] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [owner, 10000]);
    await FloToken.unpause();
    expect(await FloToken.paused()).to.be.false;
  });


  it("Should allow the owner to mint new tokens", async function () {
    const [owner] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [owner, 10000]);

    const mintAmount = 500;
    await FloToken.mint(owner, mintAmount);
    expect(await FloToken.totalSupply()).to.equal(10000 + mintAmount);
  });

  it("Should prevent non-owners from minting tokens", async function () {
    const [owner, otherAccount] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [owner, 10000]);

    await expect(
      FloToken.connect(otherAccount).mint(otherAccount, 100)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });


  it("Should allow token holders to burn their tokens", async function () {
    const [owner] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [owner, 10000]);
    const burnAmount = 100;
    await FloToken.connect(owner).burn(burnAmount);
    expect(await FloToken.totalSupply()).to.equal(10000 - burnAmount);
  });


  it("Should allow token transfers when not paused", async function () {
    const [owner, otherAccount] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [owner, 10000]);

    await FloToken.transfer(otherAccount, 10);

    expect(await FloToken.balanceOf(otherAccount)).to.equal(10);
  });

  it("Should prevent token transfers when paused", async function () {
    const [owner, otherAccount] = await ethers.getSigners();
    const FloToken = await ethers.deployContract("FloToken", [owner, 10000]);
    await FloToken.pause();
    await expect(FloToken.transfer(otherAccount, 10)).to.be.revertedWith(
      "EnforcedPause"
    );
  });

});
