"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  AlertCircle,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useBuyResaleTicket } from "@/hooks/tickets/useTicketMutation";
import { useQuery } from "@tanstack/react-query";
import { getResaleTicketsByTokenId } from "@/lib/services/contracts/tickets";
import { MediaRenderer, useActiveAccount, useConnect } from "thirdweb/react";
import { client } from "@/lib/thirdweb-dev";
import { createWallet } from "thirdweb/wallets";
import { useParams } from "next/navigation";

export default function TicketDetailsPage() {
  const params = useParams();
  const ticketId = params.ticketId;
  const account = useActiveAccount();
  const { connect } = useConnect();
  const { mutate: buyResaleTicket } = useBuyResaleTicket();

  const { data: TicketresaleData, isLoading } = useQuery({
    queryKey: ["GetResaleTicketsByTokenId", ticketId],
    queryFn: () => getResaleTicketsByTokenId(ticketId as string),
  });
  // Safely access ticket data
  const resaleTicket =
    TicketresaleData?.data[TicketresaleData?.data.length - 1];
  const ticketData = resaleTicket;
  const resalePrice = resaleTicket?.price;

  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <MediaRenderer
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={ticketData?.ticket.imageUri}
          client={client}
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="container mx-auto">
            <Link
              href="/marketplace/tickets"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tickets</span>
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {ticketData?.ticket.ticketName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{ticketData?.ticket.startDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{ticketData?.ticket.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {!isLoading ? (
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Ticket Details */}
            <div className="lg:w-2/3 space-y-8">
              {/* Ticket Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.05] rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* <div className="bg-white/[0.03] rounded-xl p-4 md:w-1/3">
                  <h3 className="text-white/60 text-sm mb-2">Ticket Type</h3>
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-indigo-400" />
                    <span className="text-lg font-semibold text-white">
                      {ticket.type}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-white/60 text-sm mb-2">
                      Seat Information
                    </h3>
                    <p className="text-white">
                      Section {ticket.section}, Row {ticket.row}, Seat{" "}
                      {ticket.seat}
                    </p>
                    <p className="text-white/60 text-sm mt-1">
                      Quantity: {ticket.quantity} tickets
                    </p>
                  </div>
                </div> */}

                  <div className="bg-white/[0.03] rounded-xl p-4 w-full">
                    <h3 className="text-white/60 text-sm mb-2">
                      Price Details
                    </h3>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white/60">Original Price:</span>
                        <span className="text-white">
                          {ticketData?.ticket.price} MATIC
                        </span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white/60">Current Price:</span>
                        <span className="text-white font-medium">
                          {resalePrice} MATIC
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Price Change:</span>
                        {ticketData?.price && resalePrice && (
                          <span
                            className={`${
                              ((Number(resalePrice) -
                                Number(ticketData?.ticket.price)) /
                                Number(ticketData?.ticket.price)) *
                                100 >=
                              0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {((Number(resalePrice) -
                              Number(ticketData?.ticket.price)) /
                              Number(ticketData?.ticket.price)) *
                              100 >=
                            0
                              ? "+"
                              : ""}
                            {(
                              ((Number(resalePrice) -
                                Number(ticketData?.ticket.price)) /
                                Number(ticketData?.ticket.price)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="bg-white/[0.03] rounded-xl p-4 md:w-1/3">
                  <h3 className="text-white/60 text-sm mb-2">
                    Listing Details
                  </h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/60">Listed On:</span>
                    <span className="text-white">
                      {TicketresaleData?.data[Number(params.ticketId)].ticket.}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/60">Time Left:</span>
                    <span className="text-white">{ticket.timeLeft}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Transfer Method:</span>
                    <span className="text-white">{ticket.transferMethod}</span>
                  </div>
                </div> */}
                </div>
              </motion.div>

              {/* Seller Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.05] rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Seller Information
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500/20 to-rose-500/20 border border-white/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-white/70" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">Santo</h3>
                    </div>
                    {/* <div className="flex items-center gap-3 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>
                        {ticket.seller.rating} ({ticket.seller.sales} sales)
                      </span>
                    </div>
                    <span>•</span>
                    <span>
                      Member since{" "}
                      {new Date(ticket.seller.joinedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                        }
                      )}
                    </span>
                  </div> */}
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.05] rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Description
                </h2>
                <div className="text-white/70 whitespace-pre-line">
                  {ticketData?.ticket.ticketDescription}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Purchase Section */}
            <div className="lg:w-1/3">
              <div className="sticky top-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.05] rounded-xl p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Purchase Tickets
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-white/70">Ticket Price</span>
                      <span className="text-white font-medium">
                        ${resalePrice} MATIC
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Transaction Fee</span>
                      <span className="text-white/70">0.02 MATIC</span>
                    </div>

                    <div className="border-t border-white/[0.05] pt-3 flex justify-between">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-white font-bold">
                        {resalePrice ? Number(resalePrice) + 0.02 : "-"} MATIC
                      </span>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/70 text-sm">
                        These tickets will be transferred immediately after
                        purchase. All sales are final and non-refundable.
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white border-0 h-12"
                    onClick={() => {
                      if (
                        ticketData?.resaleId &&
                        ticketData?.price &&
                        account
                      ) {
                        buyResaleTicket({
                          resaleId: Number(ticketData?.resaleId),
                          price: Number(ticketData?.price),
                        });
                      } else {
                        connect(async () => {
                          // instantiate wallet
                          const wallet = createWallet("io.metamask");
                          // connect wallet
                          await wallet.connect({
                            client,
                          });
                          // return the wallet
                          return wallet;
                        });
                      }
                    }}
                  >
                    {account ? (
                      <div className="flex items-center gap-2">
                        <Wallet className="mr-2 h-4 w-4" />
                        Buy
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </div>
                    )}
                  </Button>

                  <p className="text-center text-white/40 text-xs mt-4">
                    By purchasing, you agree to our Terms of Service and Privacy
                    Policy
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
