"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, User, Clock } from "lucide-react";

// Mock data
const connectedWallets = [
  {
    id: "wallet-1",
    name: "MetaMask",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    icon: "/placeholder.svg?height=32&width=32",
    isPrimary: true,
    network: "Ethereum",
  },
  {
    id: "wallet-2",
    name: "Phantom",
    address: "5FHwkrdxDuwHmRWRq5zQgUGQT3z9DFhyMNEorySFi1Hq",
    icon: "/placeholder.svg?height=32&width=32",
    isPrimary: false,
    network: "Solana",
  },
];

const networks = [
  {
    id: "network-1",
    name: "Ethereum",
    icon: "/placeholder.svg?height=32&width=32",
    isActive: true,
  },
  {
    id: "network-2",
    name: "Polygon",
    icon: "/placeholder.svg?height=32&width=32",
    isActive: false,
  },
  {
    id: "network-3",
    name: "Solana",
    icon: "/placeholder.svg?height=32&width=32",
    isActive: false,
  },
];

const transactions = [
  {
    id: "tx-1",
    type: "purchase",
    title: "Summer Music Festival 2023",
    date: "Jul 10, 2023",
    amount: "0.15",
    currency: "ETH",
    status: "completed",
    image: "/placeholder.svg?height=40&width=40",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
  },
  {
    id: "tx-2",
    type: "sale",
    title: "NBA Finals 2023",
    date: "Jun 15, 2023",
    amount: "0.25",
    currency: "ETH",
    status: "completed",
    image: "/placeholder.svg?height=40&width=40",
    txHash: "0x1234567890abcdef1234567890abcdef12345679",
  },
  {
    id: "tx-3",
    type: "reward",
    title: "XP Reward: Daily Login Streak",
    date: "Jul 20, 2023",
    amount: "75",
    currency: "XP",
    status: "completed",
  },
  {
    id: "tx-4",
    type: "purchase",
    title: "Blockchain Conference",
    date: "Aug 1, 2023",
    amount: "0.08",
    currency: "ETH",
    status: "pending",
    image: "/placeholder.svg?height=40&width=40",
    txHash: "0x1234567890abcdef1234567890abcdef12345680",
  },
];

const profile = {
  username: "cryptofan123",
  email: "user@example.com",
  avatar: "/placeholder.svg?height=96&width=96",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
};

const referralData = {
  referralCode: "CRYPTOFAN123",
  referralLink: "https://nfttickets.example/ref/cryptofan123",
  referralStats: {
    totalReferrals: 5,
    pendingReferrals: 2,
    xpEarned: 300,
  },
};

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<
    "wallet" | "transactions" | "profile" | "security" | "referral"
  >("wallet");

  const handleConnectWallet = () => {
    // Implement wallet connection logic
    console.log("Connect wallet");
  };

  const handleDisconnectWallet = (id: string) => {
    // Implement wallet disconnection logic
    console.log("Disconnect wallet", id);
  };

  const handleSetPrimaryWallet = (id: string) => {
    // Implement set primary wallet logic
    console.log("Set primary wallet", id);
  };

  const handleSwitchNetwork = (id: string) => {
    // Implement network switching logic
    console.log("Switch network", id);
  };

  const handleToggle2FA = (enabled: boolean) => {
    // Implement 2FA toggle logic
    console.log("Toggle 2FA", enabled);
  };

  const handleChangePassword = () => {
    // Implement password change logic
    console.log("Change password");
  };

  const handleManageDevices = () => {
    // Implement device management logic
    console.log("Manage devices");
  };

  const handleUpdateProfile = (updatedProfile: any) => {
    // Implement profile update logic
    console.log("Update profile", updatedProfile);
  };

  return (
    <main className="min-h-screen bg-[#030303]">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            Wallet & Account
          </h1>
          <p className="text-white/40 max-w-3xl">
            Manage your blockchain wallets, view transaction history, and update
            your account settings.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 min-w-max">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("wallet")}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                activeTab === "wallet"
                  ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Wallets</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("transactions")}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                activeTab === "transactions"
                  ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Transactions</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
}
