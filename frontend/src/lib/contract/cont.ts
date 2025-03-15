import Web3Modal from "web3modal";
import { ethers } from "ethers";

import NFT from "@/NFTTicket.json";
import Market from "@/TicketMarket.json";
import { ClientId, MarketContract, NFTContract } from "../thirdweb-dev";

const provider = new ethers.providers.JsonRpcProvider(
  `https://80002.rpc.thirdweb.com/${ClientId}`
); //used to access contract functions which do not require a signature
export const tokenContract = new ethers.Contract(
  NFTContract as string,
  NFT.abi,
  provider
);
export const marketContract = new ethers.Contract(
  MarketContract as string,
  Market.abi,
  provider
);

export const signers = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const signedProvider = new ethers.providers.Web3Provider(connection);
  //gets address of wallet connected to Metamask
  const signer = signedProvider.getSigner();
  //used to access contract functions which do require a signature for a transaction
  const signedTokenContract = new ethers.Contract(
    NFTContract as string,
    NFT.abi,
    signer
  );
  const signedMarketContract = new ethers.Contract(
    MarketContract as string,
    Market.abi,
    signer
  );
  return { signedMarketContract, signer, signedTokenContract };
};
