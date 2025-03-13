import { createThirdwebClient } from "thirdweb";

const NFTContract = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

const MarketContract = process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS;

const SecretKey = process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY;
const ClientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

const client = createThirdwebClient({
  clientId: ClientId as string,
  secretKey: SecretKey,
});

export { NFTContract, MarketContract, SecretKey, ClientId, client };
