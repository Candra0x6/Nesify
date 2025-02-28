"use client"

import { motion } from "framer-motion"
import { Wallet, Shield, ExternalLink, Check, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface WalletConnectionCardProps {
  connectedWallets: {
    id: string
    name: string
    address: string
    icon: string
    isPrimary: boolean
    network: string
  }[]
  onConnectWallet: () => void
  onDisconnectWallet: (id: string) => void
  onSetPrimary: (id: string) => void
}

export default function WalletConnectionCard({
  connectedWallets,
  onConnectWallet,
  onDisconnectWallet,
  onSetPrimary,
}: WalletConnectionCardProps) {
  const [expandedWallet, setExpandedWallet] = useState<string | null>(null)

  const toggleWalletExpand = (id: string) => {
    if (expandedWallet === id) {
      setExpandedWallet(null)
    } else {
      setExpandedWallet(id)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Connected Wallets</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConnectWallet}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium flex items-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </motion.button>
      </div>

      {connectedWallets.length === 0 ? (
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6 text-center">
          <div className="bg-white/[0.03] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Wallets Connected</h3>
          <p className="text-white/60 mb-4">
            Connect your wallet to purchase tickets, manage your NFTs, and earn rewards.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConnectWallet}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium inline-flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          {connectedWallets.map((wallet) => (
            <div
              key={wallet.id}
              className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleWalletExpand(wallet.id)}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={wallet.icon || "/placeholder.svg"}
                    alt={wallet.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{wallet.name}</h3>
                      {wallet.isPrimary && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span>{formatAddress(wallet.address)}</span>
                      <span className="px-1.5 py-0.5 text-xs rounded-full bg-white/[0.03] border border-white/[0.08]">
                        {wallet.network}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-white/60 text-sm">Connected</span>
                </div>
              </div>

              {expandedWallet === wallet.id && (
                <div className="p-4 border-t border-white/[0.05] bg-white/[0.01]">
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-1"
                      onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, "_blank")}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View on Explorer</span>
                    </motion.button>

                    {!wallet.isPrimary && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-1"
                        onClick={() => onSetPrimary(wallet.id)}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Set as Primary</span>
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-rose-400 hover:text-rose-300 text-sm flex items-center gap-1"
                      onClick={() => onDisconnectWallet(wallet.id)}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-white/40 text-xs">
        <Shield className="w-3.5 h-3.5" />
        <span>Your wallet connection is secure and encrypted</span>
      </div>
    </div>
  )
}

