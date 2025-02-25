export const nftmarketaddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const nftaddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const dev = process.env.NODE_ENV !== "production";
export const server = dev
  ? "http://localhost:3000"
  : "https://nfticketing.vercel.app";
