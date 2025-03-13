"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, User, WalletIcon } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import WalletConnectionCard from "@/components/wallet/wallet-connection-card";
import ProfileSettings from "@/components/wallet/profile-settings";
import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";
import { updateUser, getUserByWalletAddress } from "@/lib/services/api/user";
import { updateUserProfileImage } from "@/lib/services/api/image";

// Define the ProfileData type to match the ProfileSettings component
interface ProfileData {
  username: string;
  avatar: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// Define a type that extends the base User type with profileImage
interface UserWithProfileImage {
  id: string;
  walletAddress: string;
  username: string;
  profileImageId?: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  xp: number;
  level: number;
  profileImage?: {
    id: string;
    url: string;
  } | null;
}

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"wallet" | "profile">("wallet");
  const [userId, setUserId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    avatar: "/placeholder.svg?height=96&width=96",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  });

  const activeAccount = useActiveAccount();
  const activeChain = useActiveWalletChain();

  // Fetch user data if wallet is connected
  const { data: userData } = useQuery({
    queryKey: ["user", activeAccount?.address],
    queryFn: () => getUserByWalletAddress(activeAccount?.address || ""),
    enabled: !!activeAccount?.address,
  });

  // Update user data when userData changes
  useEffect(() => {
    if (userData?.result) {
      const user = userData.result as UserWithProfileImage;
      setUserId(user.id);

      // Access the profile image URL from the user data
      const avatarUrl =
        user.profileImage?.url || "/placeholder.svg?height=96&width=96";

      setProfileData({
        username: user.username || "",
        avatar: avatarUrl,
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
      });
    }
  }, [userData]);

  // Mutation for updating user profile data
  const { mutate: mutateUserProfile } = useMutation({
    mutationFn: (data: ProfileData) => {
      if (!userId) throw new Error("User ID is required");

      return updateUser(userId, {
        username: data.username,
      });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });

  // Mutation for updating profile image
  const { mutate: mutateProfileImage } = useMutation({
    mutationFn: (file: File) => {
      if (!userId) throw new Error("User ID is required");
      return updateUserProfileImage(userId, file);
    },
    onSuccess: () => {
      toast.success("Profile image updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update profile image: ${error.message}`);
    },
  });

  // Safe wallet details to prevent type errors
  const walletDetails = activeAccount?.address
    ? [
        {
          id: `${activeChain?.name || "Unknown"}-Wallet`,
          name: activeChain?.name || "Unknown",
          address: activeAccount?.address || "No address",
          icon: <WalletIcon />,
          isPrimary: true,
          network: activeChain?.nativeCurrency?.name || "Unknown",
        },
      ]
    : [];

  const handleSetPrimaryWallet = (id: string) => {
    // Implement set primary wallet logic
    console.log("Set primary wallet", id);
  };

  const handleUpdateProfile = (updatedProfile: ProfileData) => {
    // Update user profile information (username, etc.)
    mutateUserProfile(updatedProfile);

    // Note: For file uploads, we'll let the ProfileSettings component handle this separately
    // through its own file input onChange handler, which can call mutateProfileImage directly
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
                  ? "bg-primary text-white"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Wallets</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                activeTab === "profile"
                  ? "bg-primary text-white"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </motion.button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "wallet" && (
            <>
              <WalletConnectionCard
                connectedWallets={walletDetails}
                onSetPrimary={handleSetPrimaryWallet}
              />
            </>
          )}

          {activeTab === "profile" && (
            <ProfileSettings
              profile={profileData}
              onUpdateProfile={handleUpdateProfile}
              onImageUpload={mutateProfileImage}
            />
          )}
        </div>
      </div>
    </main>
  );
}
