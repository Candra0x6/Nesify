"use client"

import { motion } from "framer-motion"
import { Globe, ChevronDown, Check } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

interface Network {
  id: string
  name: string
  icon: string
  isActive: boolean
}

interface NetworkSwitcherProps {
  networks: Network[]
  onSwitchNetwork: (id: string) => void
}

export default function NetworkSwitcher({ networks, onSwitchNetwork }: NetworkSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const activeNetwork = networks.find((network) => network.isActive) || networks[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleNetworkSwitch = (id: string) => {
    onSwitchNetwork(id)
    setIsOpen(false)
  }

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Network</h2>
        <div className="text-white/60 text-sm flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Connected</span>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Image
              src={activeNetwork.icon || "/placeholder.svg"}
              alt={activeNetwork.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-white font-medium">{activeNetwork.name}</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full bg-[#0a0a0a] backdrop-blur-md border border-white/[0.08] rounded-xl shadow-xl overflow-hidden"
          >
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => handleNetworkSwitch(network.id)}
                className={`w-full p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors ${
                  network.isActive ? "bg-white/[0.02]" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={network.icon || "/placeholder.svg"}
                    alt={network.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-white font-medium">{network.name}</span>
                </div>
                {network.isActive && <Check className="w-5 h-5 text-emerald-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-white/40 text-xs">
        <Globe className="w-3.5 h-3.5" />
        <span>Switch networks to access different blockchains</span>
      </div>
    </div>
  )
}

