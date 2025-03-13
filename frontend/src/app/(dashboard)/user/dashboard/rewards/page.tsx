"use client";
import XPProgress from "@/components/xp/xp-progress";
import LeaderboardCard from "@/components/xp/leaderboard-card";
import RewardCard from "@/components/xp/reward-card";
import { getLeaderboard, getUserLevel } from "@/lib/services/api";
import { useEffect } from "react";
import { RewardWithLevel, UserLevel } from "@/utils/type";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { getUserRewards } from "@/lib/services/api";
import toast from "react-hot-toast";
import { claimReward } from "@/lib/services/api/rewards";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function RewardsPage() {
  const { user } = useUser();
  const [rewards, setRewards] = useState<RewardWithLevel[]>([]);
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: leaderboardData } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      setLoading(true);
      try {
        // Fetch the user's rewards
        const rewardsResponse = await getUserRewards(user.id);
        if (rewardsResponse.result) {
          setRewards(rewardsResponse.result);
        }

        // Fetch the user's level info
        const levelResponse = await getUserLevel(user.id);
        if (levelResponse.result) {
          setUserLevel(levelResponse.result);
        }
      } catch (error) {
        console.error("Error fetching rewards:", error);
        toast.error("Failed to load rewards");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const handleClaimReward = async (rewardId: string) => {
    if (!user?.id) return;

    try {
      const response = await claimReward(user.id, rewardId);

      if (response.result) {
        // Update the rewards list to reflect the claimed status
        setRewards(
          rewards.map((reward) =>
            reward.id === rewardId ? { ...reward, claimed: true } : reward
          )
        );
        if (userLevel) {
          setUserLevel({
            ...userLevel,
            currentXp: (userLevel.currentXp +
              response.result.level.rewardValue) as number,
          });
        }

        toast.success(
          `Reward claimed successfully! You received a ${response.result.level.rewardValue}% discount coupon.`
        );
      } else {
        toast.error(response.error || "Failed to claim reward");
      }
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("Failed to claim reward");
    }
  };

  return (
    <main className="min-h-screen bg-[#030303]">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            Rewards & XP
          </h1>
          <p className="text-white/40 max-w-3xl">
            Earn XP by completing missions, attending events, and engaging with
            the platform. Redeem your XP for exclusive rewards and benefits.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <>
            {/* XP Progress */}
            <div className="mb-12">
              <XPProgress
                currentXP={userLevel?.currentXp || 0}
                nextLevelXP={userLevel?.currentLevel || 0}
                level={userLevel?.currentLevel || 0}
                rank={userLevel?.currentBadge || "Event Explorer"}
              />
            </div>

            {/* Rewards */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                Redeem Rewards
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {rewards.map((reward: RewardWithLevel) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    onClaim={handleClaimReward}
                  />
                ))}
              </div>
            </div>

            {/* Leaderboard */}

            <div>
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                XP Leaderboard
              </h2>
              <LeaderboardCard data={leaderboardData?.result || []} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
