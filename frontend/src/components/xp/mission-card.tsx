"use client";

import { formatDate2 } from "@/lib/utils";
import { Mission } from "@prisma/client";
import { motion } from "framer-motion";
import { Zap, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface MissionCardProps {
  mission: Mission;
  completed: boolean;
  onComplete: () => void;
}
export default function MissionCard(props: MissionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-5 ${
        props.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-1 text-amber-400 font-medium">
          <Zap className="w-4 h-4" />
          <span>{props.mission.xpReward} XP</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">
        {props.mission.name}
      </h3>
      <p className="text-white/60 text-sm mb-4">{props.mission.description}</p>

      {!props.completed && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">Progress</span>
            <span className="text-white/60">
              {formatDate2(props.mission.startDate as Date)}/
              {formatDate2(props.mission.endDate as Date)}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        {props.completed ? (
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Completed</span>
          </div>
        ) : (
          <Link href={`/missions/${props.mission.id}`}>
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
