"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  QrCode,
  RefreshCw,
  DollarSign,
  Gift,
  Info,
  User,
  Ticket,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// This would normally come from a database or API
const getTicketById = (id: string) => {
  return {
    id,
    eventName: "Summer Music Festival 2023",
    eventDate: "Aug 15-17, 2023",
    eventTime: "12:00 PM - 11:00 PM",
    venue: "Central Park",
    location: "New York",
    price: "0.15",
    currency: "ETH",
    purchaseDate: "Jul 10, 2023",
    ticketType: "VIP",
    ownershipStatus: "verified" as const,
    image: "/placeholder.svg?height=600&width=1200",
    hasPerks: true,
    isTransferable: true,
    seatInfo: "Section A, Row 3, Seat 12",
    description: `
      Join us for the biggest music festival of the summer featuring top artists from around the world.
      
      Experience three days of non-stop music across five stages, featuring genres from electronic and pop to rock and hip-hop. The festival will also include art installations, food vendors, and interactive experiences.
      
      Your VIP ticket includes:
      - Access to all three days of the festival
      - VIP viewing areas at all stages
      - Exclusive VIP lounge access with complimentary refreshments
      - Fast-track entry to the festival
      - Limited edition festival merchandise pack
    `,
    schedule: [
      {
        day: "Day 1 - August 15",
        events: [
          { time: "12:00 PM", description: "Gates Open" },
          { time: "1:00 PM", description: "Opening Acts - Main Stage" },
          { time: "4:00 PM", description: "Headliner 1 - Main Stage" },
          { time: "8:00 PM", description: "Headliner 2 - Main Stage" },
        ],
      },
      {
        day: "Day 2 - August 16",
        events: [
          { time: "12:00 PM", description: "Gates Open" },
          { time: "1:00 PM", description: "Opening Acts - Main Stage" },
          { time: "4:00 PM", description: "Headliner 3 - Main Stage" },
          { time: "8:00 PM", description: "Headliner 4 - Main Stage" },
        ],
      },
      {
        day: "Day 3 - August 17",
        events: [{ time: "12:00 PM", description: "Gates Open" }],
      },
      {
        day: "Day 3 - August 17",
        events: [
          { time: "12:00 PM", description: "Gates Open" },
          { time: "1:00 PM", description: "Opening Acts - Main Stage" },
          { time: "4:00 PM", description: "Headliner 5 - Main Stage" },
          {
            time: "8:00 PM",
            description: "Festival Closing Performance - Main Stage",
          },
        ],
      },
    ],
    perks: [
      {
        title: "VIP Lounge Access",
        description:
          "Exclusive access to the VIP lounge with complimentary refreshments and comfortable seating.",
      },
      {
        title: "Fast-Track Entry",
        description: "Skip the lines with dedicated VIP entrance.",
      },
      {
        title: "Limited Edition Merchandise",
        description:
          "Receive a festival merchandise pack exclusive to VIP ticket holders.",
      },
      {
        title: "Meet & Greet Opportunity",
        description: "Chance to meet select artists (subject to availability).",
      },
    ],
    xpEarned: 150,
    organizer: {
      name: "EventMasters Productions",
      verified: true,
    },
  };
};

export default function TicketDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const ticket = getTicketById(params.id);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isResellModalOpen, setIsResellModalOpen] = useState(false);
  const [expandedScheduleDay, setExpandedScheduleDay] = useState<string | null>(
    "Day 1 - August 15"
  );
  const [isPast, setIsPast] = useState(false);

  const toggleScheduleDay = (day: string) => {
    if (expandedScheduleDay === day) {
      setExpandedScheduleDay(null);
    } else {
      setExpandedScheduleDay(day);
    }
  };

  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={ticket.image || "/placeholder.svg"}
          alt={ticket.eventName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="container mx-auto">
            <Link
              href="/tickets"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to My Tickets</span>
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {ticket.eventName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{ticket.eventDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>{ticket.eventTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>
                  {ticket.venue}, {ticket.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Ticket Details */}
          <div className="lg:w-2/3 space-y-8">
            {/* Ticket Info */}
            <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-white/[0.03] rounded-xl p-4 md:w-1/3">
                  <h3 className="text-white/60 text-sm mb-2">Ticket Type</h3>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-indigo-400" />
                    <span className="text-lg font-semibold text-white">
                      {ticket.ticketType}
                    </span>
                  </div>

                  {ticket.seatInfo && (
                    <div className="mt-4">
                      <h3 className="text-white/60 text-sm mb-2">
                        Seat Information
                      </h3>
                      <p className="text-white">{ticket.seatInfo}</p>
                    </div>
                  )}
                </div>

                <div className="bg-white/[0.03] rounded-xl p-4 md:w-1/3">
                  <h3 className="text-white/60 text-sm mb-2">
                    Purchase Details
                  </h3>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/60">Price:</span>
                      <span className="text-white">
                        {ticket.price} {ticket.currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Date:</span>
                      <span className="text-white">{ticket.purchaseDate}</span>
                    </div>
                  </div>

                  {ticket.xpEarned && (
                    <div className="mt-4 flex items-center gap-2 text-amber-400">
                      <Gift className="w-4 h-4" />
                      <span>+{ticket.xpEarned} XP Earned</span>
                    </div>
                  )}
                </div>

                <div className="bg-white/[0.03] rounded-xl p-4 md:w-1/3">
                  <h3 className="text-white/60 text-sm mb-2">
                    Ownership Status
                  </h3>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        ticket.ownershipStatus === "verified"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                    />
                    <span className="text-white">
                      {ticket.ownershipStatus === "verified"
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-white/60 text-sm mb-2">Organizer</h3>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-white/60" />
                      <span className="text-white">
                        {ticket.organizer.name}
                      </span>
                      {ticket.organizer.verified && (
                        <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-2.5 h-2.5"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsQRModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View QR Code</span>
                </motion.button>

                {ticket.isTransferable && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsTransferModalOpen(true)}
                      className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm font-medium flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Transfer Ticket</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsResellModalOpen(true)}
                      className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm font-medium flex items-center gap-2"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Resell Ticket</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Event Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Event Description
              </h2>
              <div className="text-white/70 whitespace-pre-line">
                {ticket.description}
              </div>
            </div>

            {/* Event Schedule */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Event Schedule
              </h2>

              <div className="space-y-3">
                {ticket.schedule.map((day) => (
                  <div
                    key={day.day}
                    className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleScheduleDay(day.day)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <h3 className="font-medium text-white">{day.day}</h3>
                      {expandedScheduleDay === day.day ? (
                        <ChevronUp className="w-5 h-5 text-white/60" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/60" />
                      )}
                    </button>

                    {expandedScheduleDay === day.day && (
                      <div className="p-4 pt-0 border-t border-white/[0.05]">
                        <div className="space-y-3">
                          {day.events.map((event, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="bg-white/[0.03] rounded-lg px-2 py-1 text-white/70 text-sm w-24 text-center">
                                {event.time}
                              </div>
                              <div className="text-white/80">
                                {event.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Perks & Additional Info */}
          <div className="lg:w-1/3 space-y-8">
            {/* QR Code Preview */}
            <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Ticket QR Code
              </h2>

              <div className="bg-white/[0.03] rounded-xl p-4 flex flex-col items-center">
                <div className="bg-white p-2 rounded-lg mb-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsQRModalOpen(true)}
                      className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium"
                    >
                      View QR Code
                    </motion.button>
                  </div>
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Ticket QR Code Preview"
                    width={150}
                    height={150}
                    className="w-full h-auto blur-sm"
                  />
                </div>

                <div className="text-center text-white/60 text-sm">
                  Scan this QR code at the event entrance for admission
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-white/40 text-xs">
                <Info className="w-3.5 h-3.5" />
                <span>
                  QR code updates automatically before the event for security
                </span>
              </div>
            </div>

            {/* Perks & Benefits */}
            {ticket.hasPerks && (
              <div className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  VIP Perks & Benefits
                </h2>

                <div className="space-y-4">
                  {ticket.perks.map((perk, index) => (
                    <div key={index} className="bg-white/[0.03] rounded-lg p-4">
                      <h3 className="font-medium text-white mb-1">
                        {perk.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {perk.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-rose-500/20 border border-indigo-500/30 text-white text-sm font-medium flex\"
                  >
                    <span>View All Perks</span>
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
