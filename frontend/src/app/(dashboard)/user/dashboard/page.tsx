"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Calendar,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Bell,
} from "lucide-react";
import XPProgress from "@/components/xp/xp-progress";
import MissionCard from "@/components/xp/mission-card";
import RewardCard from "@/components/xp/reward-card";
import XPNotification from "@/components/xp/xp-notification";

// Mock data
const completedMissions = [
  {
    id: "completed-1",
    title: "First Purchase",
    description: "Buy your first NFT ticket",
    xpReward: 100,
    isCompleted: true,
    completedDate: "2023-07-15",
  },
  {
    id: "completed-2",
    title: "Profile Setup",
    description: "Complete your profile information",
    xpReward: 50,
    isCompleted: true,
    completedDate: "2023-07-10",
  },
  {
    id: "completed-3",
    title: "Daily Login Streak",
    description: "Log in for 7 consecutive days",
    xpReward: 75,
    isCompleted: true,
    completedDate: "2023-07-20",
  },
];

const upcomingMissions = [
  {
    id: "upcoming-1",
    title: "Attend 3 Events",
    description: "Use your NFT tickets at 3 different events",
    xpReward: 200,
    progress: {
      current: 1,
      total: 3,
    },
  },
  {
    id: "upcoming-2",
    title: "Collect 5 Event NFTs",
    description: "Collect NFT tickets from 5 different events",
    xpReward: 150,
    progress: {
      current: 2,
      total: 5,
    },
  },
];

const recentActivity = [
  {
    id: "activity-1",
    type: "xp_earned",
    title: "Daily Login",
    xp: 10,
    date: "Today",
  },
  {
    id: "activity-2",
    type: "mission_completed",
    title: "Shared an Event",
    xp: 20,
    date: "Yesterday",
  },
  {
    id: "activity-3",
    type: "reward_redeemed",
    title: "10% Discount Coupon",
    xpCost: 200,
    date: "3 days ago",
  },
];

const recommendedRewards = [
  {
    id: "rec-reward-1",
    title: "Early Access Pass",
    description: "Get early access to ticket sales for popular events",
    xpCost: 300,
    image: "/placeholder.svg?height=300&width=400",
    category: "Access",
  },
  {
    id: "rec-reward-2",
    title: "Exclusive Merch",
    description: "Limited edition merchandise from your favorite artists",
    xpCost: 450,
    image: "/placeholder.svg?height=300&width=400",
    category: "Merchandise",
  },
];

export default function XPDashboard() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<
    "xp" | "achievement" | "level-up"
  >("xp");

  const triggerNotification = (type: "xp" | "achievement" | "level-up") => {
    setNotificationType(type);
    setShowNotification(true);
  };

  return (
    <main className="min-h-screen bg-[#030303]">
      {/* XP Notification */}
      <XPNotification
        type={notificationType}
        title={
          notificationType === "xp"
            ? "XP Earned!"
            : notificationType === "achievement"
            ? "Achievement Unlocked!"
            : "Level Up!"
        }
        message={
          notificationType === "xp"
            ? "You earned XP for completing a mission."
            : notificationType === "achievement"
            ? "You've unlocked a new achievement."
            : "Congratulations! You've reached a new level."
        }
        xp={notificationType === "xp" ? 20 : undefined}
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              XP Dashboard
            </h1>
            <p className="text-white/40 max-w-3xl">
              Track your progress, view completed missions, and claim rewards.
            </p>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerNotification("xp")}
              className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
            >
              <Zap className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerNotification("achievement")}
              className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
            >
              <CheckCircle className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerNotification("level-up")}
              className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-12">
          <XPProgress
            currentXP={1850}
            nextLevelXP={2500}
            level={7}
            rank="Event Explorer"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Challenges */}
            <div>
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Upcoming Challenges
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingMissions.map((mission) => (
                  <MissionCard key={mission.id} {...mission} />
                ))}
              </div>
            </div>

            {/* Completed Missions */}
            <div>
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Completed Missions
              </h2>

              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6">
                <div className="space-y-4">
                  {completedMissions.map((mission) => (
                    <div
                      key={mission.id}
                      className="flex items-center justify-between border-b border-white/[0.05] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-white/[0.03] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        </div>

                        <div>
                          <h3 className="font-medium text-white">
                            {mission.title}
                          </h3>
                          <p className="text-white/40 text-sm">
                            {mission.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1 text-amber-400 text-xs">
                              <Zap className="w-3 h-3" />
                              <span>+{mission.xpReward} XP</span>
                            </div>
                            <div className="flex items-center gap-1 text-white/40 text-xs">
                              <Calendar className="w-3 h-3" />
                              <span>{mission.completedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Rewards */}
            <div>
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Recommended Rewards
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedRewards.map((reward) => (
                  <RewardCard key={reward.id} {...reward} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Recent Activity
              </h2>

              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between border-b border-white/[0.05] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white/[0.03] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                          {activity.type === "xp_earned" ? (
                            <Zap className="w-5 h-5 text-amber-400" />
                          ) : activity.type === "mission_completed" ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-rose-400" />
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium text-white">
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {activity.xp && (
                              <div className="flex items-center gap-1 text-amber-400 text-xs">
                                <Zap className="w-3 h-3" />
                                <span>+{activity.xp} XP</span>
                              </div>
                            )}
                            {activity.xpCost && (
                              <div className="flex items-center gap-1 text-rose-400 text-xs">
                                <Zap className="w-3 h-3" />
                                <span>-{activity.xpCost} XP</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-white/40 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>{activity.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white text-sm transition-colors"
                >
                  View All Activity
                </motion.button>
              </div>
            </div>

            {/* Stats Summary */}
            <div>
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Stats Summary
              </h2>

              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] rounded-lg p-4">
                    <h3 className="text-white/40 text-sm mb-1">
                      Total XP Earned
                    </h3>
                    <div className="text-2xl font-bold text-white">1,850</div>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-4">
                    <h3 className="text-white/40 text-sm mb-1">
                      Missions Completed
                    </h3>
                    <div className="text-2xl font-bold text-white">12</div>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-4">
                    <h3 className="text-white/40 text-sm mb-1">
                      Rewards Redeemed
                    </h3>
                    <div className="text-2xl font-bold text-white">3</div>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-4">
                    <h3 className="text-white/40 text-sm mb-1">
                      Events Attended
                    </h3>
                    <div className="text-2xl font-bold text-white">5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
