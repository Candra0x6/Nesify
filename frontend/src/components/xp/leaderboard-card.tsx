"use client";

import { LeaderboardEntry } from "@/utils/type";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Coins } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export default function LeaderboardCard(props: { data: LeaderboardEntry[] }) {
  const getTopRankIcon = (rank: number) => {
    if (rank > 5) {
      return <Trophy className="w-5 h-5 text-amber-400" />;
    } else if (rank >= 3) {
      return <Medal className="w-5 h-5 text-amber-700" />;
    } else if (rank >= 1) {
      return <Coins className="w-5 h-5 text-amber-800" />;
    } else {
      return <Skeleton className="w-5 h-5 text-white/60" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">XP Leaderboard</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white/60 text-sm hover:text-white transition-colors"
        >
          View All
        </motion.button>
      </div>

      <div className="space-y-4">
        {props.data.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center gap-4 p-3 rounded-lg ${
              user.level > 1 ? "bg-white/[0.03] border border-white/[0.08]" : ""
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {getTopRankIcon(user.level)}
            </div>

            <div className="flex items-center gap-3 flex-1">
              <Image
                src={"/placeholder.svg"}
                alt={"placeholder"}
                width={40}
                height={40}
                className="rounded-full border border-white/10"
              />

              <div>
                <h3 className="font-medium text-white">{user.username}</h3>
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <Award className="w-3 h-3 text-indigo-400" />
                  <span>Level {user.level}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <span>{user.xp.toLocaleString()}</span>
              <span>XP</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
