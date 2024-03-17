require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import "@nomiclabs/hardhat-verify";*/
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    zksync: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://sepolia.era.zksync.dev",
    },
    linea: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://rpc.goerli.linea.build",
    },
    scroll: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://scroll-testnet-public.unifra.io",
    },
    fantom: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://fantom-testnet.public.blastapi.io",
    },
    fuji: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://rpc.ankr.com/avalanche_fuji",
    },
    snowtrace: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: {
      snowtrace: "snowtrace", // apiKey is not required, just set a placeholder
      ftmTestnet: process.env.FTM_API,
    },
    customChains: [
      {
        network: "snowtrace",
        chainId: 43113,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://testnet.snowtrace.io",
        },
      },
    ],
  },
};
