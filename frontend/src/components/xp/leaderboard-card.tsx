"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Award } from "lucide-react"
import Image from "next/image"

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  xp: number
  rank: number
  level: number
}

export default function LeaderboardCard({ users }: { users: LeaderboardUser[] }) {
  const getTopRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-amber-400" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-700" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-white/60 font-medium">{rank}</span>
    }
  }

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">XP Leaderboard</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white/60 text-sm hover:text-white transition-colors"
        >
          View All
        </motion.button>
      </div>

      <div className="space-y-4">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center gap-4 p-3 rounded-lg ${
              user.rank <= 3 ? "bg-white/[0.03] border border-white/[0.08]" : ""
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">{getTopRankIcon(user.rank)}</div>

            <div className="flex items-center gap-3 flex-1">
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full border border-white/10"
              />

              <div>
                <h3 className="font-medium text-white">{user.name}</h3>
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <Award className="w-3 h-3 text-indigo-400" />
                  <span>Level {user.level}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <span>{user.xp.toLocaleString()}</span>
              <span>XP</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

