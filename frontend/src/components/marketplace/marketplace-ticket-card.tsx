"use client";

import { ResaleTicket } from "@/lib/services/contracts/tickets";
import { client } from "@/lib/thirdweb-dev";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MediaRenderer } from "thirdweb/react";

export default function MarketplaceTicketCard({
  data,
}: {
  data: ResaleTicket;
}) {
  const priceChange =
    ((Number(data.price) - Number(data.ticket.price)) /
      Number(data.ticket.price)) *
    100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden h-full">
        <div className="relative">
          {/* Image with gradient overlay */}
          <div className="relative h-48 overflow-hidden">
            <MediaRenderer
              style={{
                objectFit: "cover",
              }}
              client={client}
              src={data.ticket.imageUri || "/placeholder.svg"}
              alt={data.ticket.eventName}
              className="transition-transform duration-500 group-hover:scale-110  w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-60" />
          </div>

          {/* Ticket Type Badge */}
          {/* <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 text-xs rounded-full backdrop-blur-sm border border-white/10 text-white/90 ${
                ticket.type === "VIP"
                  ? "bg-rose-500/40 border-rose-500/30"
                  : ticket.type === "Early Bird"
                  ? "bg-amber-500/40 border-amber-500/30"
                  : "bg-indigo-500/40 border-indigo-500/30"
              }`}
            >
              {ticket.type}
            </span>
          </div> */}

          {/* Time Left Badge */}
          {/* <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/90">
              <Clock className="w-3 h-3" />
              {ticket.timeLeft}
            </span>
          </div> */}

          {/* Event Info */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-semibold text-white mb-1 truncate">
              {data.ticket.eventName}
            </h3>
            <div className="flex items-center gap-2 text-white/70 text-xs">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-indigo-400" />
                <span>{data.ticket.startDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" />
                <span className="truncate">{data.ticket.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Price Section */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-white/40">Current Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">
                  ${data.price}
                </span>
                <span
                  className={`text-xs ${
                    priceChange >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {priceChange >= 0 ? "+" : ""}
                  {priceChange.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/40">Original</p>
              <p className="text-sm text-white/60">${data.ticket.price}</p>
            </div>
          </div>

          {/* Benefits */}
          {/* <div className="flex flex-wrap gap-1.5">
            {ticket.benefits.slice(0, 2).map((benefit, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60"
              >
                {benefit}
              </span>
            ))}
            {ticket.benefits.length > 2 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60">
                +{ticket.benefits.length - 2} more
              </span>
            )}
          </div> */}

          {/* Action Button */}
          <Link
            href={`/events/${data.ticket.eventId}/tickets/${data.resaleId}`}
            className=""
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium flex items-center justify-center gap-2 mt-5"
            >
              View Ticket
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
