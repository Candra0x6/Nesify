import React from "react";

interface LevelProgressBarProps {
  currentXp: number;
  neededXp: number;
  currentLevel: number;
  nextLevel: number;
}

export default function LevelProgressBar({
  currentXp,
  neededXp,
  currentLevel,
  nextLevel,
}: LevelProgressBarProps) {
  const progressPercentage = Math.min((currentXp / neededXp) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm">
        <span>Level {currentLevel}</span>
        <span>Level {nextLevel}</span>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-right text-gray-500">
        {currentXp} / {neededXp} XP ({progressPercentage.toFixed(0)}%)
      </div>
    </div>
  );
}
