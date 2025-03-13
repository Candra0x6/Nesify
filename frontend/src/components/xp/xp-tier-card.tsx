import { Level } from "@prisma/client";
import { Zap } from "lucide-react";

export default function XpTierCard(props: Level) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-lg p-5">
      <h2 className="text-xl font-bold text-white">{props.rewardName}</h2>
      <h3 className="text-lg font-medium text-white mb-2">
        Level {props.levelNumber}
      </h3>
      <div className="flex items-center gap-1 text-amber-400 text-sm mb-4">
        <Zap className="w-4 h-4" />
        <span>{props.xpThreshold} XP required</span>
      </div>

      <h4 className="text-white/70 text-sm font-medium mb-2">Description:</h4>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 text-white/60 text-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-rose-400" />
          <span>{props.rewardDescription}</span>
        </li>
      </ul>
    </div>
  );
}
