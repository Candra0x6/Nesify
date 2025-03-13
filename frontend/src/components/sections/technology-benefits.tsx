"use client"

import { motion } from "framer-motion"
import { Shield, Zap, RefreshCw, Wallet } from "lucide-react"

const benefits = [
  {
    icon: <Shield className="w-6 h-6 text-indigo-400" />,
    title: "Blockchain Security",
    description: "Immutable records ensure your tickets can't be counterfeited or duplicated.",
  },
  {
    icon: <Zap className="w-6 h-6 text-rose-400" />,
    title: "Instant Transfers",
    description: "Send tickets to friends or resell with just a few clicks, no middleman required.",
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-amber-400" />,
    title: "Smart Royalties",
    description: "Artists and organizers earn from every resale automatically through smart contracts.",
  },
  {
    icon: <Wallet className="w-6 h-6 text-cyan-400" />,
    title: "Digital Collectibles",
    description: "Keep your ticket as a digital memento long after the event has ended.",
  },
]

export default function TechnologyBenefits() {
  return (
    <section className="w-full py-20 bg-[#030303]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4"
          >
            <span className="text-sm text-white/60 tracking-wide">Powered by Blockchain</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
          >
            Technology Benefits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-2xl mx-auto"
          >
            Our NFT ticketing platform leverages cutting-edge blockchain technology to provide a secure, transparent,
            and efficient ticketing experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm border border-white/[0.05] rounded-xl p-6"
            >
              <div className="bg-white/[0.03] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/40">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

