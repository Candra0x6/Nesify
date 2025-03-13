import React from "react";
import { RewardWithLevel } from "@/utils/type";
import { Button } from "@/components/ui/button";
import { formatDate2 } from "@/lib/utils";

interface RewardCardProps {
  reward: RewardWithLevel;
  onClaim: (rewardId: string) => void;
}

export default function RewardCard({ reward, onClaim }: RewardCardProps) {
  const handleClaim = () => {
    if (!reward.claimed) {
      onClaim(reward.id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{reward.level.rewardName}</h3>
          <div
            className={`px-2 py-1 text-xs rounded-full ${
              reward.claimed
                ? "bg-gray-100 text-gray-600"
                : "bg-green-100 text-green-700"
            }`}
          >
            {reward.claimed ? "Claimed" : "Available"}
          </div>
        </div>

        {reward.level.rewardDescription && (
          <p className="text-gray-600 text-sm mb-3">
            {reward.level.rewardDescription}
          </p>
        )}

        <div className="flex items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">
            {reward.level.rewardValue}%
          </span>
          <span className="ml-1 text-gray-600">discount</span>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          Earned on {formatDate2(reward.receivedAt)}
        </div>

        <Button
          onClick={handleClaim}
          disabled={reward.claimed}
          className="w-full"
          variant={reward.claimed ? "outline" : "default"}
        >
          {reward.claimed ? "Already Claimed" : "Claim Reward"}
        </Button>
      </div>
    </div>
  );
}
