"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn, formatDate } from "@/lib/utils";
import { Check, Loader2, PartyPopper } from "lucide-react";
import EventForm, { EventFormSchema } from "./event-form";
import TicketForm, { TicketFormSchema } from "./ticket-form";
import Image from "next/image";
import toast from "react-hot-toast";
import { signers } from "@/lib/contract/cont";
import { ethers } from "ethers";
import { NFTContract } from "@/lib/thirdweb-dev";
import {
  eventUploadToIpfs,
  ticketUploadToIpfs,
} from "@/lib/services/ipfs/upload";

const steps = [
  { id: "event", title: "Event Details" },
  { id: "tickets", title: "Ticket Details" },
  { id: "review", title: "Review & Publish" },
];
type MarketEvent = {
  event: string;
  args: {
    eventId: {
      toNumber: () => number;
    };
  };
};
type TicketEvent = {
  event: string;
  args: {
    tokenId: {
      toNumber: () => number;
    };
  };
};

export default function EventCreationStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState<EventFormSchema | null>(null);
  const [ticketData, setTicketData] = useState<TicketFormSchema | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEventSubmit = async (data: EventFormSchema) => {
    try {
      setEventData(data);
      setCurrentStep(1);
      // Wait for the transaction to be confirmed
    } catch (error) {
      console.error(error);
    }
  };

  const handleTicketSubmit = (data: TicketFormSchema) => {
    setTicketData(data);
    setCurrentStep(2);
  };
  console.log({
    ticketData,
    eventData,
  });

  async function addEvent() {
    const signedContracts = await signers();
    const { signedMarketContract } = signedContracts;
    /* create the event  */
    try {
      formatDate(eventData?.date as Date);
      const url = await eventUploadToIpfs(eventData as EventFormSchema);
      console.log(url);
      const transaction = await signedMarketContract.createEvent(
        url,
        Math.floor(new Date(eventData?.date as Date).getTime() / 1000)
      );
      const tx = await transaction.wait();

      let eventId = -1;
      tx.events.forEach((element: MarketEvent) => {
        if (element.event == "MarketEventCreated") {
          eventId = element.args.eventId.toNumber();
        }
      });
      toast.success("Event created successfully");
      return eventId;
    } catch (error) {
      console.log(error);
    }
  }

  async function addTicket({ eventId }: { eventId: number }) {
    const getContracts = await signers();
    const { signedMarketContract, signedTokenContract } = getContracts;

    try {
      const url = await ticketUploadToIpfs(
        ticketData as TicketFormSchema,
        eventId.toString()
      );
      const ticketPrice = ethers.utils.parseUnits(
        ticketData?.priceMatic as string,
        "ether"
      );
      const resalePrice = ethers.utils.parseUnits(
        ticketData?.maxResalePriceMatic as string,
        "ether"
      );

      let tokenId = -1;
      const nftTransaction = await signedTokenContract.createToken(
        url,
        ticketData?.amount as string
      );
      const nftTx = await nftTransaction.wait();
      nftTx.events.forEach((element: TicketEvent) => {
        if (element.event == "NFTTicketCreated") {
          tokenId = element.args.tokenId.toNumber();
          console.log(tokenId);
        }
      });

      const marketTransaction = await signedMarketContract.createMarketTicket(
        eventId,
        tokenId,
        NFTContract,
        ticketData?.purchaseLimit,
        ticketData?.amount,
        ticketPrice,
        ticketData?.royaltyFee,
        resalePrice
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      await marketTransaction.wait();
      toast.success("Ticket created successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const handlePublish = async () => {
    // Ensure eventData is not null

    try {
      setIsPublishing(true);
      console.log("Adding event");
      const eventId = await addEvent();
      console.log("Adding ticket", eventId);
      await addTicket({ eventId: eventId as number });
      toast.success("Event and Ticket created successfully");
      setIsSuccess(true);
    } catch (error) {
      setIsPublishing(false);
      setIsSuccess(false);
      toast.error(
        `Failed to create ticket: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    // Cleanup function to revoke the object URL when component unmounts
    // or when eventData.image changes
    return () => {
      if (eventData?.image) {
        URL.revokeObjectURL(URL.createObjectURL(eventData.image));
      }
    };
  }, [eventData?.image]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="relative z-10 container mx-auto py-8 px-4">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="text-sm text-white/60 tracking-wide">
              Create New Event
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
              Create Your
            </span>{" "}
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
              )}
            >
              Unforgettable Event
            </span>
          </h1>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex justify-between items-center max-w-3xl mx-auto mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2",
                    index < currentStep
                      ? "bg-indigo-500 border-indigo-600 text-white"
                      : index === currentStep
                      ? "bg-white/[0.03] border-white/[0.15] text-white"
                      : "bg-white/[0.03] border-white/[0.08] text-white/40"
                  )}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div
                  className={cn(
                    "hidden sm:block ml-3 text-sm font-medium",
                    index <= currentStep ? "text-white" : "text-white/40"
                  )}
                >
                  {step.title}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden sm:block w-12 h-1 mx-4",
                      index < currentStep ? "bg-indigo-500" : "bg-white/[0.08]"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            {currentStep === 0 && (
              <EventForm handleSubmit={handleEventSubmit} />
            )}
            {currentStep === 1 && (
              <TicketForm
                handleSubmit={handleTicketSubmit}
                onBack={() => setCurrentStep(0)}
              />
            )}
            {currentStep === 2 && !isSuccess && (
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Review Your Event
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white/80 mb-4 border-b border-white/[0.08] pb-2">
                      Event Details
                    </h3>
                    {eventData && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-white/60 text-sm">Event Name</p>
                          <p className="text-white font-medium">
                            {eventData.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Date</p>
                          <p className="text-white font-medium">
                            {eventData.date?.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Location</p>
                          <p className="text-white font-medium">
                            {eventData.location}
                            {eventData.postcode
                              ? `, ${eventData.postcode}`
                              : ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Description</p>
                          <p className="text-white">
                            {eventData.description?.substring(0, 150)}
                            {eventData.description?.length > 150 ? "..." : ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Image</p>
                          {eventData?.image && (
                            <div className="mt-2">
                              <Image
                                src={URL.createObjectURL(eventData.image)}
                                alt="Event preview"
                                className="w-[200px] h-[200px] object-cover max-w-xs rounded-lg border border-white/[0.08]"
                                width={200}
                                height={200}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white/80 mb-4 border-b border-white/[0.08] pb-2">
                      Ticket Details
                    </h3>
                    {ticketData && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-white/60 text-sm">Ticket Name</p>
                          <p className="text-white font-medium">
                            {ticketData.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Price</p>
                          <p className="text-white font-medium">
                            ${ticketData.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Amount</p>
                          <p className="text-white font-medium">
                            {ticketData.amount} tickets
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">
                            Purchase Limit
                          </p>
                          <p className="text-white font-medium">
                            {ticketData.purchaseLimit} per person
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Royalty Fee</p>
                          <p className="text-white font-medium">
                            {ticketData.royaltyFee}%
                          </p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">
                            Max Resale Price
                          </p>
                          <p className="text-white font-medium">
                            ${ticketData.maxResalePrice}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 rounded-md border border-white/[0.15] text-white/80 hover:bg-white/[0.08] transition-colors"
                    disabled={isPublishing}
                  >
                    Back to Tickets
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className={`px-6 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white font-medium transition-colors flex items-center ${
                      isPublishing ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>Publish Event</>
                    )}
                  </button>
                </div>
              </div>
            )}
            {isSuccess && (
              <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-lg p-8 text-center"
              >
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-rose-500/20 animate-pulse" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 flex items-center justify-center">
                    <PartyPopper className="h-10 w-10 text-white" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">
                  Event Published!
                </h2>

                <p className="text-white/70 mb-8 max-w-md mx-auto">
                  Your event has been successfully published. Attendees can now
                  purchase tickets.
                </p>

                <div className="space-y-4">
                  <div className="p-3 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-between">
                    <span className="text-white/80">Event URL</span>
                    <div className="flex items-center">
                      <code className="bg-white/[0.1] px-3 py-1 rounded text-indigo-200 mr-2">
                        myevent.com/
                        {eventData?.name.toLowerCase().replace(/\s+/g, "-")}
                      </code>
                      <button className="text-white/60 hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setCurrentStep(0);
                        // Reset form data
                        setEventData(null);
                        setTicketData(null);
                      }}
                      className="px-6 py-3 rounded-md border border-white/[0.15] text-white/80 hover:bg-white/[0.08] transition-colors"
                    >
                      Create Another Event
                    </button>
                    <button className="px-6 py-3 rounded-md bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white font-medium transition-colors">
                      View Event Dashboard
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                      className="w-2 h-2 rounded-full bg-indigo-400"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                      className="w-2 h-2 rounded-full bg-violet-400"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                      className="w-2 h-2 rounded-full bg-rose-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}
