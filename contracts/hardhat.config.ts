import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();
const { POLYGON_API_URL, API_URL, PRIVATE_KEY, ETHERSCAN_API } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    polygon: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },

    mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
};

export default config;
