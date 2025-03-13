"use client";
import XpTierCard from "@/components/xp/xp-tier-card";
import { getLevels, getMissions } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function MissionsPage() {
  const { data: missions, isLoading: missionsLoading } = useQuery({
    queryKey: ["missions"],
    queryFn: () => getMissions(),
  });

  const { data: levels, isLoading: levelsLoading } = useQuery({
    queryKey: ["levels"],
    queryFn: () => getLevels(),
  });

  return (
    <main className="min-h-screen bg-[#030303]">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            XP Missions
          </h1>
          <p className="text-white/40 max-w-3xl">
            Complete missions to earn XP and unlock exclusive rewards. The more
            missions you complete, the faster you&apos;ll level up.
          </p>
        </div>

        {/* Mission Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {missionsLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : missions?.result ? (
            missions?.result?.map((mission) => (
              <div
                key={mission.id}
                className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-5"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {mission.name}
                </h3>
                <p className="text-white/40 text-sm">{mission.description}</p>
              </div>
              // <MissionCard key={mission.id} {...mission} />
            ))
          ) : (
            <p>No missions found</p>
          )}
        </div>

        {/* XP Tiers */}
        <div>
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            XP Tiers & Benefits
          </h2>

          <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {levelsLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : levels?.result ? (
                levels?.result?.map((level) => (
                  <XpTierCard key={level.id} {...level} />
                ))
              ) : (
                <p>No levels found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
