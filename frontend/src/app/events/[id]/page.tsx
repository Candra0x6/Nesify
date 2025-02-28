"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Heart,
  ArrowLeft,
  Info,
  Star,
} from "lucide-react";

// This would normally come from a database or API
const getEventById = (id: string) => {
  return {
    id,
    title: "Summer Music Festival 2023",
    image: "/placeholder.svg?height=600&width=1200",
    date: "Aug 15-17, 2023",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    price: "0.15",
    currency: "ETH",
    availableTickets: 156,
    tags: ["VIP", "Limited"],
    description: `
      Join us for the biggest music festival of the summer featuring top artists from around the world.
      
      Experience three days of non-stop music across five stages, featuring genres from electronic and pop to rock and hip-hop. The festival will also include art installations, food vendors, and interactive experiences.
      
      Your NFT ticket includes:
      - Access to all three days of the festival
      - Exclusive digital collectible artwork
      - Access to VIP areas with premium viewing and lounges
      - Complimentary festival merchandise pack
    `,
    organizer: {
      name: "EventMasters Productions",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      website: "https://example.com",
      social: {
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    ticketTypes: [
      {
        name: "General Admission",
        price: "0.15",
        currency: "ETH",
        available: 120,
        benefits: ["3-day festival access", "Digital collectible"],
      },
      {
        name: "VIP Experience",
        price: "0.35",
        currency: "ETH",
        available: 36,
        benefits: [
          "3-day festival access",
          "VIP areas access",
          "Exclusive merchandise",
          "Artist meet & greet",
        ],
      },
    ],
    reviews: [
      {
        user: "Alex M.",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        comment:
          "Amazing experience last year! The NFT ticket was super easy to use and the exclusive perks were worth it.",
      },
      {
        user: "Sarah K.",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4,
        comment:
          "Great festival, loved the digital collectible that came with the ticket. Looking forward to this year!",
      },
    ],
  };
};

export default function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const event = getEventById(params.id);
  const [selectedTicketType, setSelectedTicketType] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="container mx-auto">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Marketplace</span>
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:w-2/3 space-y-8">
            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-white/[0.03] border border-white/[0.08] text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/80 hover:text-white"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite ? "text-rose-500 fill-rose-500" : ""
                    }`}
                  />
                  <span>Save</span>
                </button>

                <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/80 hover:text-white">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                About This Event
              </h2>
              <div className="text-white/70 whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {/* Organizer */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Organizer</h2>
              <div className="flex items-center gap-4">
                <Image
                  src={event.organizer.image || "/placeholder.svg"}
                  alt={event.organizer.name}
                  width={60}
                  height={60}
                  className="rounded-full border border-white/10"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-white">
                      {event.organizer.name}
                    </h3>
                    {event.organizer.verified && (
                      <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-3 h-3"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <Link
                      href={event.organizer.website}
                      className="text-sm text-indigo-400 hover:underline"
                    >
                      Website
                    </Link>
                    <Link
                      href={event.organizer.social.twitter}
                      className="text-sm text-indigo-400 hover:underline"
                    >
                      Twitter
                    </Link>
                    <Link
                      href={event.organizer.social.instagram}
                      className="text-sm text-indigo-400 hover:underline"
                    >
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Reviews</h2>

              <div className="space-y-4">
                {event.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">
                            {review.user}
                          </h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-white/20"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-white/70 mt-2">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Section */}
          <div className="lg:w-1/3">
            <div className="sticky top-20">
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Get Tickets
                </h2>

                {/* Ticket Types */}
                <div className="space-y-3 mb-6">
                  {event.ticketTypes.map((ticket, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedTicketType(index)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedTicketType === index
                          ? "bg-gradient-to-r from-indigo-500/10 to-rose-500/10 border-indigo-500/30"
                          : "bg-white/[0.01] border-white/[0.05] hover:border-white/[0.1]"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">
                            {ticket.name}
                          </h3>
                          <p className="text-white/40 text-sm">
                            {ticket.available} available
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">
                            {ticket.price} {ticket.currency}
                          </div>
                          <p className="text-white/40 text-sm">≈ $250 USD</p>
                        </div>
                      </div>

                      <div className="mt-3 space-y-1">
                        {ticket.benefits.map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-white/70 text-sm"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-rose-400" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-white/70 mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-l-lg bg-white/[0.03] border border-white/[0.08] text-white"
                    >
                      -
                    </button>
                    <div className="w-16 h-10 flex items-center justify-center bg-white/[0.05] border-t border-b border-white/[0.08] text-white">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center rounded-r-lg bg-white/[0.03] border border-white/[0.08] text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-white/[0.05] pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Price</span>
                    <span className="text-white">
                      {(
                        Number.parseFloat(
                          event.ticketTypes[selectedTicketType].price
                        ) * quantity
                      ).toFixed(2)}{" "}
                      {event.ticketTypes[selectedTicketType].currency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Service Fee</span>
                    <span className="text-white">
                      0.01 {event.ticketTypes[selectedTicketType].currency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white">
                      {(
                        Number.parseFloat(
                          event.ticketTypes[selectedTicketType].price
                        ) *
                          quantity +
                        0.01
                      ).toFixed(2)}{" "}
                      {event.ticketTypes[selectedTicketType].currency}
                    </span>
                  </div>
                </div>

                {/* Buy Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium"
                >
                  Connect Wallet & Buy
                </motion.button>

                <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
                  <Info className="w-4 h-4" />
                  <span>
                    Tickets will be delivered as NFTs to your connected wallet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
