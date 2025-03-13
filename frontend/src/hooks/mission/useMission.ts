"use client";
import { getUserLevel } from "@/lib/services/api";
import { completeMission } from "@/lib/services/api/mission";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRef, useEffect, useState } from "react";
import { UserLevel } from "@/utils/type";
import { useXPToast } from "../useXPToast";

export const useCompleteMission = () => {
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const prevLevelRef = useRef<number | null>(null);

  const showToast = useXPToast();
  useEffect(() => {
    if (userLevel) {
      prevLevelRef.current = userLevel.currentLevel;
    }
  }, [userLevel]);

  return useMutation({
    mutationFn: ({
      missionId,
      userId,
    }: {
      missionId: string;
      userId: string;
    }) => completeMission(missionId, userId),
    onSuccess: async (_, variables) => {
      const levelResponse = await getUserLevel(variables.userId);
      if (levelResponse.result) {
        const prevLevel = prevLevelRef.current;

        setUserLevel(levelResponse.result);

        if (
          prevLevel !== null &&
          levelResponse.result.currentLevel > prevLevel
        ) {
          showToast(
            "level-up",
            `Congratulations! You leveled up to level ${levelResponse.result.currentLevel}!`
          );
        }
      }
    },
    onError: (error) => {
      toast.error(
        `Failed to complete mission: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });
};
