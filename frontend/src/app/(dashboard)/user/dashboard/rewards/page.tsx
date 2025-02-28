import XPProgress from "@/components/xp/xp-progress";
import MissionCard from "@/components/xp/mission-card";
import RewardCard from "@/components/xp/reward-card";
import LeaderboardCard from "@/components/xp/leaderboard-card";

// Mock data
const dailyMissions = [
  {
    id: "daily-1",
    title: "Daily Login",
    description: "Log in to the platform to earn daily XP",
    xpReward: 10,
    isCompleted: true,
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
    expiresIn: "8 hours",
  },
  {
    id: "daily-3",
    title: "Share an Event",
    description: "Share an event on social media",
    xpReward: 20,
    isDaily: true,
    expiresIn: "8 hours",
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

const rewards = [
  {
    id: "reward-1",
    title: "10% Discount",
    description: "Get 10% off your next ticket purchase",
    xpCost: 200,
    image: "/placeholder.svg?height=300&width=400",
    category: "Discount",
  },
  {
    id: "reward-2",
    title: "VIP Access",
    description: "Upgrade any ticket to VIP status",
    xpCost: 500,
    image: "/placeholder.svg?height=300&width=400",
    category: "Access",
  },
  {
    id: "reward-3",
    title: "Exclusive NFT",
    description: "Limited edition collectible NFT artwork",
    xpCost: 1000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Collectible",
  },
  {
    id: "reward-4",
    title: "Meet & Greet Pass",
    description: "Exclusive artist meet & greet opportunity",
    xpCost: 2000,
    image: "/placeholder.svg?height=300&width=400",
    category: "Experience",
    isLocked: true,
  },
];

const leaderboardUsers = [
  {
    id: "user-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    xp: 3450,
    rank: 1,
    level: 12,
  },
  {
    id: "user-2",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=80&width=80",
    xp: 3120,
    rank: 2,
    level: 11,
  },
  {
    id: "user-3",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    xp: 2890,
    rank: 3,
    level: 10,
  },
  {
    id: "user-4",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=80&width=80",
    xp: 2450,
    rank: 4,
    level: 9,
  },
  {
    id: "user-5",
    name: "You",
    avatar: "/placeholder.svg?height=80&width=80",
    xp: 1850,
    rank: 5,
    level: 7,
  },
];

export default function RewardsPage() {
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

        {/* XP Progress */}
        <div className="mb-12">
          <XPProgress
            currentXP={1850}
            nextLevelXP={2500}
            level={7}
            rank="Event Explorer"
          />
        </div>

        {/* Missions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            XP Missions
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Claimable Missions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyMissions.map((mission) => (
                <MissionCard key={mission.id} {...mission} />
              ))}
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            Redeem Rewards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <RewardCard key={reward.id} {...reward} />
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            XP Leaderboard
          </h2>

          <LeaderboardCard users={leaderboardUsers} />
        </div>
      </div>
    </main>
  );
}
