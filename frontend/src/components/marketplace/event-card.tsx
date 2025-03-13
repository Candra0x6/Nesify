"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ClientId, SecretKey } from "@/lib/thirdweb-dev";
import { createThirdwebClient } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";
import { Event } from "@/types/event";

export default function EventCard({ props }: { props: Event }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const client = createThirdwebClient({
    clientId: ClientId as string,
    secretKey: SecretKey,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden">
        <div className="relative">
          <Link href={`/events/${props.eventId}`}>
            <div className="relative h-48 overflow-hidden">
              <MediaRenderer
                client={client}
                src={props.imageUri}
                alt="Event"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-60" />
            </div>
          </Link>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? "text-rose-500 fill-rose-500" : "text-white/70"
              }`}
            />
          </button>
          {/* 
          {tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}
        </div>

        <div className="p-4">
          <Link href={`/events/${props.eventId}`}>
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
              {props.name}
            </h3>
          </Link>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-white/70">{props.startDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span className="text-sm text-white/70 line-clamp-1">
                {props.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/70">
                {Number(props.soldOut)} tickets available
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-white">
                {props.owner}
              </span>
              <span className="text-sm text-white/60 ml-1">
                {props.location}
              </span>
            </div>

            <Link href={`/events/${props.eventId}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium"
              >
                Buy Now
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
