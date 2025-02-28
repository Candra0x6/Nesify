"use client"

import { motion } from "framer-motion"
import { Users, Copy, Share2, Zap, Award } from "lucide-react"
import { useState } from "react"

interface ReferralSystemProps {
  referralCode: string
  referralLink: string
  referralStats: {
    totalReferrals: number
    pendingReferrals: number
    xpEarned: number
  }
}

export default function ReferralSystem({ referralCode, referralLink, referralStats }: ReferralSystemProps) {
  const [linkCopied, setLinkCopied] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)

  const copyToClipboard = (text: string, type: "link" | "code") => {
    navigator.clipboard.writeText(text)
    if (type === "link") {
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 3000)
    } else {
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 3000)
    }
  }

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join me on NFT Ticketing Platform",
        text: "Use my referral code to get started with NFT tickets!",
        url: referralLink,
      })
    }
  }

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white/[0.03] rounded-full w-10 h-10 flex items-center justify-center">
          <Users className="w-5 h-5 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Referral Program</h2>
      </div>

      <div className="bg-gradient-to-r from-indigo-500/10 to-rose-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-5 mb-6">
        <h3 className="text-white font-medium mb-2">Invite Friends & Earn XP</h3>
        <p className="text-white/60 text-sm mb-4">
          Share your referral code with friends. When they sign up and make their first purchase, you'll both earn XP
          rewards!
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-white/60 text-xs mb-1">Your Referral Code</label>
            <div className="flex items-center">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-l-lg text-white/70 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(referralCode, "code")}
                className="px-3 py-2 rounded-r-lg bg-white/[0.05] text-white/70 hover:text-white border border-white/[0.08] border-l-0 flex items-center gap-1"
              >
                <Copy className="w-4 h-4" />
                <span>{codeCopied ? "Copied!" : "Copy"}</span>
              </motion.button>
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs mb-1">Your Referral Link</label>
            <div className="flex items-center">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-l-lg text-white/70 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(referralLink, "link")}
                className="px-3 py-2 bg-white/[0.05] text-white/70 hover:text-white border border-white/[0.08] border-l-0 border-r-0 flex items-center gap-1"
              >
                <Copy className="w-4 h-4" />
                <span>{linkCopied ? "Copied!" : "Copy"}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareReferral}
                className="px-3 py-2 rounded-r-lg bg-white/[0.05] text-white/70 hover:text-white border border-white/[0.08] flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <h3 className="text-white font-medium">Total Referrals</h3>
          </div>
          <div className="text-2xl font-bold text-white">{referralStats.totalReferrals}</div>
          <div className="text-white/40 text-xs mt-1">{referralStats.pendingReferrals} pending invites</div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-white font-medium">XP Earned</h3>
          </div>
          <div className="text-2xl font-bold text-white">{referralStats.xpEarned}</div>
          <div className="text-white/40 text-xs mt-1">From successful referrals</div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-rose-400" />
            <h3 className="text-white font-medium">Rewards</h3>
          </div>
          <div className="text-white/70 text-sm">Earn 100 XP for each successful referral</div>
        </div>
      </div>
    </div>
  )
}

