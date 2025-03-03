import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

import { MarketContract, NFTContract } from "../thirdweb-dev";
// const NFTTicketABI = NFTTicketArtifact.abi as Abi;
// const TicketMarketABI = TicketMarketArtifact.abi as Abi;
// // Define local hardhat chain
const localHardhat = defineChain({
  id: 1337,
  name: "Hardhat Local",
  rpc: "http://127.0.0.1:8545",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
});

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  secretKey:
    "MDPd555y85eNXyWxm0AYtXhZScNsDBePhM045kFD2WpmDho5DHpPFgTHgqz6eeUqAwDeNPZXDTwdsql6GTLPdA",
});

// connect to your contract
const NFTTicketContract = getContract({
  client,
  chain: localHardhat,
  address: NFTContract as string,
});

const TicketMarketContract = getContract({
  client,
  chain: localHardhat,
  address: MarketContract as string,
});

export { NFTTicketContract, TicketMarketContract };
