/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MyTicket } from "@/lib/services/contracts/tickets";
import { client } from "@/lib/thirdweb-dev";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Tag,
  QrCode,
  RefreshCw,
  DollarSign,
  Gift,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MediaRenderer } from "thirdweb/react";

export default function TicketCard({
  data,
  openResellModal,
  openQRModal,
  openTransferModal,
}: {
  data: MyTicket;
  openResellModal: (ticket: MyTicket) => void;
  openQRModal: (ticket: MyTicket) => void;
  openTransferModal: (ticket: MyTicket) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden">
        <div className="relative">
          <Link href={`/tickets/${data.eventId}`}>
            <div className="relative h-48 overflow-hidden">
              <MediaRenderer
                client={client}
                src={data.imageUri || "/placeholder.svg"}
                alt={data.eventName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent opacity-60" />
            </div>
          </Link>

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {/* <span
              className={`px-2 py-1 text-xs rounded-full backdrop-blur-sm border border-white/10 text-white/90 ${
                ticketType === "VIP"
                  ? "bg-rose-500/40 border-rose-500/30"
                  : ticketType === "Early Bird"
                  ? "bg-amber-500/40 border-amber-500/30"
                  : "bg-black/40"
              }`}
            >
              {ticketType}
            </span> */}

            {/* <span
              className={`px-2 py-1 text-xs rounded-full backdrop-blur-sm border border-white/10 text-white/90 ${
                ownershipStatus === "verified"
                  ? "bg-emerald-500/40 border-emerald-500/30"
                  : "bg-amber-500/40 border-amber-500/30"
              }`}
            >
              {ownershipStatus === "verified" ? "Verified" : "Pending"}
            </span> */}
          </div>

          {/* {hasPerks && (
            <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-indigo-500/40 backdrop-blur-sm border border-indigo-500/30 text-white/90">
              Perks Available
            </div>
          )} */}
        </div>

        <div className="p-4">
          <Link href={`/tickets/${data.eventId}`}>
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
              {data.eventName}
            </h3>
          </Link>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-white/70">{data.startDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span className="text-sm text-white/70 line-clamp-1">
                {data.location}
              </span>
            </div>

            {/* <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/70">
                Purchased: {purchaseDate} • {price} {currency}
              </span>
            </div> */}
          </div>

          <div className="flex flex-wrap gap-2">
            <motion.button
              onClick={() => openQRModal(data)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>View</span>
            </motion.button>

            <motion.button
              onClick={() => openTransferModal(data)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Transfer</span>
            </motion.button>

            <motion.button
              onClick={() => openResellModal(data)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-1"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Resell</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500/20 to-rose-500/20 border border-indigo-500/30 text-white text-sm flex items-center gap-1"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Perks</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
