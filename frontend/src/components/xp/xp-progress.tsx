"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Zap } from "lucide-react";

interface XPProgressProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  rank: string;
}

export default function XPProgress({
  currentXP,
  nextLevelXP,
  level,
  rank,
}: XPProgressProps) {
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-full blur-xl" />
          <div className="relative w-24 h-24 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">Level {level}</h2>
            <div className="flex items-center justify-center md:justify-start  text-white/60">
              <span>{rank}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">{currentXP} XP</span>
              <span className="text-white/60 text-sm">{nextLevelXP} XP</span>
            </div>
            <div className="w-full h-3 bg-white/[0.03] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
              />
            </div>
            <p className="text-white/40 text-sm">
              <span className="text-rose-400 font-medium">
                {nextLevelXP - currentXP} XP
              </span>{" "}
              needed to reach Level {level + 1}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <span className="text-white font-medium">Total XP</span>
          </div>
          <div className="text-2xl font-bold text-white">{currentXP}</div>
          <div className="flex items-center gap-1 text-white/40 text-xs">
            <Zap className="w-3 h-3 text-amber-400" />
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
