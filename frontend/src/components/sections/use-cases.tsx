"use client";

import { motion } from "framer-motion";
import { Users, Ticket, PaintbrushIcon as PaintBrush } from "lucide-react";
import Image from "next/image";

const useCases = [
  {
    icon: <Users className="w-6 h-6 text-indigo-400" />,
    title: "Event Organizers",
    description:
      "Take control of your ticketing with fraud-proof solutions, customizable royalties on resales, and real-time analytics.",
    image: "/images/use-case-3.png",
    features: [
      "Eliminate counterfeit tickets",
      "Set resale parameters",
      "Engage with attendees",
      "Detailed analytics",
    ],
  },
  {
    icon: <Ticket className="w-6 h-6 text-rose-400" />,
    title: "Fans & Attendees",
    description:
      "Enjoy a seamless ticketing experience with easy transfers, exclusive perks, and digital collectibles that last beyond the event.",
    image: "/images/use-case-2.png",
    features: [
      "Secure digital ownership",
      "Easy peer-to-peer transfers",
      "Exclusive holder benefits",
      "Collectible memorabilia",
    ],
  },
  {
    icon: <PaintBrush className="w-6 h-6 text-amber-400" />,
    title: "Artists & Creators",
    description:
      "Earn royalties on every resale and build deeper connections with your fans through exclusive digital experiences.",
    image: "/images/use-case-1.png",
    features: [
      "Ongoing royalty revenue",
      "Direct fan engagement",
      "Custom ticket artwork",
      "Exclusive content drops",
    ],
  },
];

export default function UseCases() {
  return (
    <section className="w-full py-20 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.03] via-transparent to-indigo-500/[0.03] blur-3xl" />

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
              For Everyone
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
          >
            Use Cases
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-2xl mx-auto"
          >
            Our platform serves the needs of everyone in the event ecosystem,
            creating value at every step.
          </motion.p>
        </div>

        <div className="space-y-20">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center`}
            >
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/[0.03] rounded-full w-10 h-10 flex items-center justify-center">
                    {useCase.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {useCase.title}
                  </h3>
                </div>

                <p className="text-white/40">{useCase.description}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-rose-400" />
                      <span className="text-white/60 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/20 rounded-xl blur-xl" />
                  <div className="relative overflow-hidden rounded-xl border border-white/[0.05]">
                    <Image
                      src={useCase.image || "/placeholder.svg"}
                      alt={useCase.title}
                      width={400}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
