"use client";

import React from "react";
import { Mission } from "@/utils/type";
import { Button } from "@/components/ui/button";
import { formatDate, formatDate2 } from "@/lib/utils";
import { Check, Star } from "lucide-react";

interface MissionCardProps {
  mission: Mission;
  completed: boolean;
  onComplete: () => void;
}

export default function MisasionCard({
  mission,
  completed,
  onComplete,
}: MissionCardProps) {
  const statusText = () => {
    if (completed) {
      return "Completed";
    }

    const now = new Date();

    if (mission.startDate && new Date(mission.startDate) > now) {
      return `Available from ${formatDate(mission.startDate)}`;
    }

    if (mission.endDate && new Date(mission.endDate) < now) {
      return "Expired";
    }

    return "Available Now";
  };

  const isActive =
    !completed &&
    (!mission.startDate || new Date(mission.startDate) <= new Date()) &&
    (!mission.endDate || new Date(mission.endDate) >= new Date());

  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow
      ${completed ? "bg-gray-50 border-gray-200" : "border-blue-200"}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{mission.name}</h3>
          <div
            className={`px-2 py-1 text-xs rounded-full ${
              completed
                ? "bg-green-100 text-green-700"
                : isActive
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {statusText()}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{mission.description}</p>

        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="text-lg font-semibold">{mission.xpReward} XP</span>
        </div>

        {mission.endDate && (
          <div className="text-xs text-gray-500 mb-4">
            {completed ? "Completed" : "Available"} until{" "}
            {formatDate2(mission.endDate)}
          </div>
        )}

        <Button
          onClick={onComplete}
          disabled={completed || !isActive}
          className="w-full"
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <>
              <Check className="mr-1 h-4 w-4" /> Completed
            </>
          ) : (
            "Complete Mission"
          )}
        </Button>
      </div>
    </div>
  );
}
