"use client";

import { motion } from "framer-motion";
import { Zap, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface MissionProps {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted?: boolean;
  isDaily?: boolean;
  expiresIn?: string;
  progress?: {
    current: number;
    total: number;
  };
}

export default function MissionCard({
  id,
  title,
  description,
  xpReward,
  isCompleted = false,
  isDaily = false,
  expiresIn,
  progress,
}: MissionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-5 ${
        isCompleted ? "opacity-70" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {isDaily && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Daily
            </span>
          )}
          {expiresIn && (
            <div className="flex items-center gap-1 text-white/40 text-xs">
              <Clock className="w-3 h-3" />
              <span>Expires in {expiresIn}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-amber-400 font-medium">
          <Zap className="w-4 h-4" />
          <span>{xpReward} XP</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60 text-sm mb-4">{description}</p>

      {progress && !isCompleted && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">Progress</span>
            <span className="text-white/60">
              {progress.current}/{progress.total}
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        {isCompleted ? (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Completed</span>
          </div>
        ) : (
          <Link href={`/xp/missions/${id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
