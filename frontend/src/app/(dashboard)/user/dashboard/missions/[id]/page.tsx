"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import XPNotification from "@/components/xp/xp-notification";

// This would normally come from a database or API
const getMissionById = (id: string) => {
  return {
    id,
    title: "Refer a Friend",
    description:
      "Invite friends to join the platform and earn XP for each successful referral.",
    longDescription: `
      Spread the word about our NFT ticketing platform and earn XP rewards for each friend who joins!
      
      How it works:
      1. Share your unique referral link with friends
      2. When they create an account and make their first purchase, you'll earn XP
      3. The more friends you refer, the more XP you'll earn
      
      This is a great way to boost your XP and help your friends discover the benefits of NFT ticketing.
    `,
    xpReward: 75,
    isDaily: false,
    progress: {
      current: 1,
      total: 3,
    },
    steps: [
      {
        title: "Share your referral link",
        description:
          "Copy your unique link and share it with friends via email, social media, or messaging apps.",
        isCompleted: true,
      },
      {
        title: "Friend creates an account",
        description: "Your friend needs to sign up using your referral link.",
        isCompleted: true,
      },
      {
        title: "Friend makes first purchase",
        description:
          "Once your friend buys their first NFT ticket, you'll earn the XP reward.",
        isCompleted: false,
      },
    ],
    tips: [
      "Share your link on social media for maximum reach",
      "Explain the benefits of NFT ticketing to your friends",
      "Follow up with friends who have shown interest",
    ],
    referralLink: "https://nfttickets.example/ref/user123",
    expiresIn: null,
  };
};

export default function MissionDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const mission = getMissionById(params.id);
  const [showNotification, setShowNotification] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(mission.referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const completeMission = () => {
    setShowNotification(true);
  };

  return (
    <main className="min-h-screen bg-[#030303]">
      {/* XP Notification */}
      <XPNotification
        type="xp"
        title="Mission Completed!"
        message={`You've completed the "${mission.title}" mission.`}
        xp={mission.xpReward}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <Link
          href="/xp/missions"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Missions</span>
        </Link>

        <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="bg-white/[0.03] rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
              <Zap className="w-8 h-8 text-amber-400" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {mission.title}
                </h1>

                <div className="flex items-center gap-3">
                  {mission.isDaily && (
                    <span className="px-3 py-1 text-sm rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Daily
                    </span>
                  )}

                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Zap className="w-4 h-4" />
                    <span>{mission.xpReward} XP</span>
                  </div>
                </div>
              </div>

              <p className="text-white/60 mb-6">{mission.description}</p>

              {mission.progress && (
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">Progress</span>
                    <span className="text-white/60">
                      {mission.progress.current}/{mission.progress.total}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/[0.03] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
                      style={{
                        width: `${
                          (mission.progress.current / mission.progress.total) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {mission.expiresIn && (
                <div className="flex items-center gap-2 text-white/40 mb-6">
                  <Clock className="w-4 h-4" />
                  <span>Expires in {mission.expiresIn}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {mission.referralLink && (
                  <div className="flex-1 flex items-center">
                    <input
                      type="text"
                      value={mission.referralLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-l-lg text-white/70 focus:outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyReferralLink}
                      className="px-4 py-2 rounded-r-lg bg-white/[0.05] text-white/70 hover:text-white border border-white/[0.08] border-l-0"
                    >
                      {linkCopied ? "Copied!" : "Copy"}
                    </motion.button>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={completeMission}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium"
                >
                  Complete Mission
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
        </div>
      </div>
    </main>
  );
}
