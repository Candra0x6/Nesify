"use client";

import { motion } from "framer-motion";
import { Zap, Calendar, CheckCircle, Bell } from "lucide-react";
import XPProgress from "@/components/xp/xp-progress";
import { useQuery } from "@tanstack/react-query";
import { getCompletedMissions, getUserLevel } from "@/lib/services/api";
import { useUser } from "@/hooks/useUser";
import { formatDate2 } from "@/lib/utils";
import { useXPToast } from "@/hooks/useXPToast";

export default function XPDashboard() {
  const { user } = useUser();
  console.log(user);
  const userId = user?.id;
  const { data: level, isLoading: levelLoading } = useQuery({
    queryKey: ["UserLevels"],
    queryFn: () => getUserLevel(userId as string),
  });

  const { data: missions, isLoading: missionsLoading } = useQuery({
    queryKey: ["CompletedMissions"],
    queryFn: () => getCompletedMissions(userId as string),
  });

  const showToast = useXPToast();

  const triggerNotification = (type: "xp" | "achievement" | "level-up") => {
    const titles = {
      xp: "XP Earned!",
      achievement: "Achievement Unlocked!",
      "level-up": "Level Up!",
    };

    showToast(type, titles[type], type === "xp" ? { xp: 20 } : undefined);
  };

  console.log(level);

  return (
    <main className="min-h-screen bg-[#030303]">
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
          {levelLoading ? (
            <div className="w-full h-40 bg-white/[0.03] rounded-lg animate-pulse"></div>
          ) : (
            <XPProgress
              currentXP={level?.result?.currentXp as number}
              nextLevelXP={level?.result?.neededXp as number}
              level={level?.result?.currentLevel as number}
              rank={level?.result?.currentBadge as string}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Completed Missions */}
            <div>
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Completed Missions
              </h2>

              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6">
                <div className="space-y-4">
                  {missionsLoading ? (
                    <div className="w-full h-40 bg-white/[0.03] rounded-lg animate-pulse"></div>
                  ) : missions?.result?.length === 0 ? (
                    <div className="text-white/40 text-sm">
                      No missions completed yet.
                    </div>
                  ) : (
                    missions?.result?.map((mission) => (
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
                              {mission.mission.name}
                            </h3>
                            <p className="text-white/40 text-sm">
                              {mission.mission.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1 text-amber-400 text-xs">
                                <Zap className="w-3 h-3" />
                                <span>+{mission.mission.xpReward} XP</span>
                              </div>
                              <div className="flex items-center gap-1 text-white/40 text-xs">
                                <Calendar className="w-3 h-3" />
                                <p className="text-white/40 text-[11px]">
                                  {formatDate2(mission.completedAt as Date)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
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
                    <div className="text-2xl font-bold text-white">
                      {level?.result?.currentXp}
                    </div>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-4">
                    <h3 className="text-white/40 text-sm mb-1">
                      Missions Completed
                    </h3>
                    <div className="text-2xl font-bold text-white">
                      {missions?.result?.length}
                    </div>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-4">
                    <h3 className="text-white/40 text-sm mb-1">
                      Rewards Redeemed
                    </h3>
                    <div className="text-2xl font-bold text-white">
                      {missions?.result?.length}
                    </div>
                  </div>

                  <div className="bg-white/[0.03] rounded-lg p-4">
                    <h3 className="text-white/40 text-sm mb-1">
                      Events Attended
                    </h3>
                    <div className="text-2xl font-bold text-white">
                      {missions?.result?.length}
                    </div>
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
