"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Wallet, QrCode } from "lucide-react";

const steps = [
  {
    icon: <ShoppingCart className="w-8 h-8 text-indigo-400" />,
    title: "Buy an NFT Ticket",
    description:
      "Purchase your ticket directly from our marketplace using crypto or traditional payment methods.",
  },
  {
    icon: <Wallet className="w-8 h-8 text-rose-400" />,
    title: "Store in Your Wallet",
    description:
      "Your NFT ticket is securely stored in your digital wallet, accessible anytime.",
  },
  {
    icon: <QrCode className="w-8 h-8 text-amber-400" />,
    title: "Scan at the Event",
    description:
      "Simply show your digital ticket for scanning at the venue for seamless entry.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-20 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4"
          >
            <span className="text-sm text-white/60 tracking-wide">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
          >
            How It Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-2xl mx-auto"
          >
            Our platform makes buying, storing, and using NFT tickets
            effortless, even if you&apos;re new to blockchain technology.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center max-w-xs"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-full blur-xl" />
                <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-full w-20 h-20 flex items-center justify-center">
                  {step.icon}
                </div>
                <div
                  className="absolute top-1/2 left-full w-12 h-0.5 bg-gradient-to-r from-white/20 to-transparent hidden md:block"
                  style={{ display: index === steps.length - 1 ? "none" : "" }}
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                <span className="inline-block bg-white/[0.05] rounded-full w-6 h-6 text-sm mr-2">
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <p className="text-white/40">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
