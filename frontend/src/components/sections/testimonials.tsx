"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "This platform has completely transformed how we handle event ticketing. The transparency and security are unmatched.",
    author: "Sarah Johnson",
    role: "Festival Organizer",
    avatar: "/images/NFT1.jpg",
  },
  {
    quote:
      "As an artist, I love earning royalties every time my tickets are resold. It's a game-changer for revenue.",
    author: "Emely Smith",
    role: "Music Producer",
    avatar: "/images/NFT2.jpg",
  },
  {
    quote:
      "The ease of transferring tickets to friends and the exclusive perks make this platform stand out from traditional ticketing.",
    author: "Emma Rodriguez",
    role: "Concert Attendee",
    avatar: "/images/NFT3.jpg",
  },
];

const partners = [
  "/images/logo.jpg",
  "/images/logo.jpg",
  "/images/logo.jpg",
  "/images/logo.jpg",
  "/images/logo.jpg",
];

export default function Testimonials() {
  return (
    <section className="w-full py-20 bg-[#030303]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4"
          >
            <span className="text-sm text-white/60 tracking-wide">
              Trusted By Many
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
          >
            Testimonials & Partners
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-2xl mx-auto"
          >
            Hear from our users and see the companies that trust our NFT
            ticketing platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm border border-white/[0.05] rounded-xl p-6"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-white/70 italic mb-6 flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>

                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full border border-white/10"
                  />
                  <div>
                    <h4 className="text-white font-medium">
                      {testimonial.author}
                    </h4>
                    <p className="text-white/40 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-white/[0.05] pt-12"
        >
          <h3 className="text-center text-white/40 text-sm uppercase tracking-wider mb-8">
            Trusted by leading companies
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={partner || "/placeholder.svg"}
                  alt="Partner logo"
                  width={120}
                  height={60}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
