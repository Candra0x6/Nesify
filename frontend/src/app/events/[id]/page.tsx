"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowLeft, Info, ArrowRight } from "lucide-react";
import { useBuyTicket } from "@/hooks/tickets/useTicketMutation";
import { useQuery } from "@tanstack/react-query";
import { MediaRenderer, useActiveAccount, useConnect } from "thirdweb/react";

import { client } from "@/lib/thirdweb-dev";
import {
  getEventTickets,
  getResaleTicketsByTokenId,
} from "@/lib/services/contracts/tickets";
import MarketplaceTicketCard from "@/components/marketplace/marketplace-ticket-card";
import { createWallet } from "thirdweb/wallets";
import { getEventById } from "@/lib/services/contracts/events";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id;
  const account = useActiveAccount();
  const { connect } = useConnect();
  const [selectedTicketType, setSelectedTicketType] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: eventData } = useQuery({
    queryKey: ["GetEventById", eventId],
    queryFn: () => getEventById(eventId as string),
  });

  const { data: ticketsData } = useQuery({
    queryKey: ["GetEventTickets", eventId],
    queryFn: () => getEventTickets(Number(eventId)),
  });

  console.log(ticketsData);
  const { data: TicketresaleData } = useQuery({
    queryKey: ["GetResaleTicketsByTokenId"],
    queryFn: () => getResaleTicketsByTokenId(eventId as string),
  });

  const { mutate: buyTicket } = useBuyTicket();

  return (
    <main className="min-h-screen bg-[#030303] pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <MediaRenderer
          client={client}
          src={eventData?.data?.imageUri || "/placeholder.svg"}
          style={{
            objectFit: "cover",
          }}
          alt={eventData?.data?.name || "Event"}
          className="w-full h-full "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="container mx-auto">
            <Link
              href="/events "
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Marketplace</span>
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {eventData?.data?.name || "No name"}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{eventData?.data?.startDate || "No date"}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{eventData?.data?.location || "No location"}</span>
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
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                About This Event
              </h2>
              <div className="text-white/70 whitespace-pre-line">
                {eventData?.data?.description || "No description"}
              </div>
            </div>

            {/* Organizer */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Organizer</h2>
              <div className="flex items-center gap-4">
                <Image
                  src={"/placeholder.svg"}
                  alt="l"
                  width={60}
                  height={60}
                  className="rounded-full border border-white/10"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-white">PT SUKA</h3>
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
                  </div>
                </div>
              </div>
              <div className="">
                {true && (
                  <div className="flex flex-col gap-2 text-white">
                    <div className="flex items-center gap-2 w-full justify-between  ">
                      <h1 className="text-2xl font-bold">Resale Tickets</h1>
                      <Link
                        href={`/events/${eventId}/tickets`}
                        className="flex items-center gap-2"
                      >
                        <span className="text-white/70">View All</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
                      {TicketresaleData?.data.map((ticket) => (
                        <div key={ticket.resaleId}>
                          <MarketplaceTicketCard data={ticket} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
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
                  {ticketsData?.data.map((ticket, index) => (
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
                            {ticket.tokenSupply} available
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">
                            {ticket.price} MATIC
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-1">
                        <p className="text-white/80 text-sm">
                          {ticket.description}
                        </p>
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
                          ticketsData?.data[selectedTicketType].price || "0"
                        ) * quantity
                      ).toFixed(2)}{" "}
                      MATIC
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/70">Service Fee</span>
                    <span className="text-white">0.01 MATIC</span>
                  </div>
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white">
                      {(
                        Number.parseFloat(
                          ticketsData?.data[selectedTicketType].price || "0"
                        ) *
                          quantity +
                        0.01
                      ).toFixed(2)}{" "}
                      MATIC
                    </span>
                  </div>
                </div>
                {/* Buy Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    account?.address
                      ? buyTicket({
                          id: ticketsData?.data[selectedTicketType]
                            .tokenId as number,
                          price:
                            ticketsData?.data[selectedTicketType].price || "0",
                          qty: quantity,
                          eventId: eventId as string,
                        })
                      : connect(async () => {
                          // instantiate wallet
                          const wallet = createWallet("io.metamask");
                          // connect wallet
                          await wallet.connect({
                            client,
                          });
                          // return the wallet
                          return wallet;
                        })
                  }
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium"
                >
                  {account?.address ? "Buy" : "Connect Wallet"}
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
