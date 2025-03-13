"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              Join the Future of Ticketing
            </h2>

            <p className="text-white/40 max-w-2xl mx-auto">
              Whether you&apos;re an event organizer, artist, or attendee, our
              NFT ticketing platform offers unparalleled benefits. Get started
              today and experience the revolution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-primary text-white font-medium"
              >
                Get Your NFT Ticket Now
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
