"use client";

import { motion } from "framer-motion";
import { DollarSign, ShieldCheck, Clock, Gift } from "lucide-react";

const features = [
  {
    icon: <DollarSign className="w-6 h-6 text-indigo-400" />,
    title: "Lower Fees",
    description:
      "Save money with significantly reduced transaction fees compared to traditional ticketing platforms.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
    title: "No Ticket Fraud",
    description:
      "Blockchain verification ensures every ticket is authentic and can't be duplicated.",
  },
  {
    icon: <Clock className="w-6 h-6 text-amber-400" />,
    title: "Instant Resale & Royalties",
    description:
      "Resell tickets with ease while artists and organizers earn royalties on every secondary sale.",
  },
  {
    icon: <Gift className="w-6 h-6 text-cyan-400" />,
    title: "VIP & Collectible Rewards",
    description:
      "Unlock exclusive perks and keep your ticket as a digital collectible after the event.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-20 bg-[#030303]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
              <span className="text-sm text-white/60 tracking-wide">
                Unmatched Advantages
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-white">
              Why Choose Our NFT Ticketing Platform?
            </h2>

            <p className="text-white/40 mb-8">
              We&#39;re revolutionizing the ticketing industry by solving
              long-standing problems and creating new opportunities for fans,
              artists, and event organizers alike.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-primary text-white font-medium"
            >
              Explore Features
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/[0.03] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/40 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
