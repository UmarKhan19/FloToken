const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

const initialOwner = process.env.PUBLIC_KEY;
const initialSupply = ethers.parseEther("10000000");

module.exports = buildModule("FloToken", (m) => {
  const _owner = m.getParameter("initialOwner", initialOwner);
  const _initialSupply = m.getParameter("initialSupply", initialSupply);

  const _floToken = m.contract("FloToken", [_owner, _initialSupply]);

  return { _floToken };
});
