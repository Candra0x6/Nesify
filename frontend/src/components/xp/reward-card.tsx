"use client";

import { RewardWithLevel } from "@/utils/type";
import { motion } from "framer-motion";
import { Gift, Lock } from "lucide-react";

type RewardCardProps = {
  reward: RewardWithLevel;
  onClaim: (rewardId: string) => void;
};
export default function RewardCard(props: RewardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden"
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {props.reward.level.rewardName}
        </h3>
        <p className="text-white/60 text-sm mb-4">
          {props.reward.level.rewardDescription}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={props.reward.claimed}
          onClick={() => props.onClaim(props.reward.id)}
          className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 text-white font-medium ${
            props.reward.claimed
              ? "bg-white/[0.05] text-white/40 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-rose-500"
          }`}
        >
          {props.reward.claimed ? (
            <>
              <Lock className="w-4 h-4" />
              <span>Claimed</span>
            </>
          ) : (
            <>
              <Gift className="w-4 h-4" />
              <span>Redeem Reward</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
