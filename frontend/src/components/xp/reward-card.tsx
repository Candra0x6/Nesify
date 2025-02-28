"use client"

import { motion } from "framer-motion"
import { Gift, Zap, Lock } from "lucide-react"
import Image from "next/image"

export interface RewardProps {
  id: string
  title: string
  description: string
  xpCost: number
  image: string
  isLocked?: boolean
  category?: string
}

export default function RewardCard({
  id,
  title,
  description,
  xpCost,
  image,
  isLocked = false,
  category = "Reward",
}: RewardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden"
    >
      <div className="relative h-40">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-60" />

        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10">
            {category}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-amber-400 text-sm border border-white/10">
          <Zap className="w-3 h-3" />
          <span>{xpCost} XP</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/60 text-sm mb-4">{description}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLocked}
          className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 text-white font-medium ${
            isLocked
              ? "bg-white/[0.05] text-white/40 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-rose-500"
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              <span>Locked</span>
            </>
          ) : (
            <>
              <Gift className="w-4 h-4" />
              <span>Redeem Reward</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

