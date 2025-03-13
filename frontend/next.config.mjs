/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_NFT_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
    NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
