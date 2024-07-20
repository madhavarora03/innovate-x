// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const mnemonic = process.env.MNEMONIC;
// const infuraUrl = `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`;
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

module.exports = {
  networks: {
    // rinkeby: {
    //   provider: () => new HDWalletProvider(mnemonic, infuraUrl),
    //   network_id: 4,
    //   gas: 4500000,
    //   gasPrice: 10000000000,
    // },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
