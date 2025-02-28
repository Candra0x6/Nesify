import { Zap, Calendar, Ticket, Award } from "lucide-react";
import MissionCard from "@/components/xp/mission-card";

// Mock data
const dailyMissions = [
  {
    id: "daily-1",
    title: "Daily Login",
    description: "Log in to the platform to earn daily XP",
    xpReward: 10,
    isDaily: true,
  },
  {
    id: "daily-2",
    title: "Browse 5 Events",
    description: "Explore at least 5 different events today",
    xpReward: 15,
    isDaily: true,
    progress: {
      current: 3,
      total: 5,
    },
  },
  {
    id: "daily-3",
    title: "Share an Event",
    description: "Share an event on social media",
    xpReward: 20,
    isDaily: true,
  },
];

const weeklyMissions = [
  {
    id: "weekly-1",
    title: "Purchase a Ticket",
    description: "Buy any NFT ticket this week",
    xpReward: 50,
  },
  {
    id: "weekly-2",
    title: "Attend an Event",
    description: "Scan your NFT ticket at an event",
    xpReward: 100,
  },
  {
    id: "weekly-3",
    title: "Refer a Friend",
    description: "Invite a friend who creates an account",
    xpReward: 75,
    progress: {
      current: 1,
      total: 3,
    },
  },
];

const specialMissions = [
  {
    id: "special-1",
    title: "First Purchase",
    description: "Buy your first NFT ticket",
    xpReward: 100,
  },
  {
    id: "special-2",
    title: "Collect 5 Event NFTs",
    description: "Collect NFT tickets from 5 different events",
    xpReward: 200,
    progress: {
      current: 2,
      total: 5,
    },
  },
  {
    id: "special-3",
    title: "Attend 3 Events",
    description: "Use your NFT tickets at 3 different events",
    xpReward: 150,
    progress: {
      current: 1,
      total: 3,
    },
  },
];

const xpTiers = [
  {
    level: "Bronze",
    xpRequired: 0,
    benefits: ["Basic rewards access", "Standard ticket purchases"],
  },
  {
    level: "Silver",
    xpRequired: 1000,
    benefits: [
      "5% discount on all tickets",
      "Early access to select events",
      "Exclusive profile badge",
    ],
  },
  {
    level: "Gold",
    xpRequired: 3000,
    benefits: [
      "10% discount on all tickets",
      "Early access to all events",
      "VIP upgrades",
      "Exclusive merchandise",
    ],
  },
  {
    level: "Platinum",
    xpRequired: 7500,
    benefits: [
      "15% discount on all tickets",
      "Priority access to all events",
      "Free VIP upgrades",
      "Exclusive NFT drops",
      "Meet & greet opportunities",
    ],
  },
];

export default function MissionsPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
            <div className="bg-white/[0.03] rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Daily & Weekly
            </h2>
            <p className="text-white/60 mb-4">
              Regular missions that refresh daily or weekly. Complete these
              consistently for steady XP gains.
            </p>
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              <Zap className="w-4 h-4" />
              <span>10-100 XP per mission</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
            <div className="bg-white/[0.03] rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Ticket className="w-6 h-6 text-rose-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Event-Based</h2>
            <p className="text-white/60 mb-4">
              Earn XP by purchasing tickets, attending events, and engaging with
              the platform.
            </p>
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              <Zap className="w-4 h-4" />
              <span>50-200 XP per mission</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
            <div className="bg-white/[0.03] rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Special Achievements
            </h2>
            <p className="text-white/60 mb-4">
              One-time missions that reward significant milestones and
              achievements.
            </p>
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              <Zap className="w-4 h-4" />
              <span>100-500 XP per achievement</span>
            </div>
          </div>
        </div>

        {/* Daily Missions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            Daily Missions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyMissions.map((mission) => (
              <MissionCard key={mission.id} {...mission} />
            ))}
          </div>
        </div>

        {/* Weekly Missions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            Weekly Missions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyMissions.map((mission) => (
              <MissionCard key={mission.id} {...mission} />
            ))}
          </div>
        </div>

        {/* Special Missions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            Special Missions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialMissions.map((mission) => (
              <MissionCard key={mission.id} {...mission} />
            ))}
          </div>
        </div>

        {/* XP Tiers */}
        <div>
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            XP Tiers & Benefits
          </h2>

          <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {xpTiers.map((tier, index) => (
                <div
                  key={index}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-lg p-5"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tier.level}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-400 text-sm mb-4">
                    <Zap className="w-4 h-4" />
                    <span>{tier.xpRequired.toLocaleString()} XP required</span>
                  </div>

                  <h4 className="text-white/70 text-sm font-medium mb-2">
                    Benefits:
                  </h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center gap-2 text-white/60 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-rose-400" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
