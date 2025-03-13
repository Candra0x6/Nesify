"use client";
import { useMutation } from "@tanstack/react-query";
import { buyResaleTicket, buyTicket } from "@/lib/services/contracts/tickets";
import toast from "react-hot-toast";
import { useXPToast } from "../useXPToast";
import { useCompleteMission } from "../mission/useMission";
import { useUser } from "../useUser";
import { createTicket } from "@/lib/services/api/ticket";

export const useBuyResaleTicket = () => {
  const showToast = useXPToast();
  const { mutate: completeMission } = useCompleteMission();
  const { user } = useUser();
  return useMutation({
    mutationFn: ({ resaleId, price }: { resaleId: number; price: number }) =>
      buyResaleTicket(resaleId, price),
    onSuccess: () => {
      completeMission({
        missionId: "cm848fq5n000h9li8q723qjme",
        userId: user?.id || "",
      });
      showToast("xp", "Earned 250 XP for buying a resale ticket 🎉🎉", {
        xp: 250,
      });
    },
    onError: (error) => {
      toast.error(
        `Failed to verify ticket: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });
};

// Define a type for the parameters to make it clearer
type BuyTicketParams = {
  id: number;
  price: string;
  qty: number;
  eventId: string;
};

export const useBuyTicket = () => {
  const showToast = useXPToast();
  const { mutate: completeMission } = useCompleteMission();
  const { user } = useUser();

  return useMutation({
    // Use the params type and explicitly destructure what we need for buyTicket
    mutationFn: (params: BuyTicketParams) => {
      const { id, price, qty } = params;
      console.log("Buying ticket for event:", params.eventId); // Use eventId to avoid unused warning
      return buyTicket(id, price, qty);
    },
    onSuccess: async (_, variables) => {
      // Complete mission for XP
      completeMission({
        missionId: "cm848fpv3000g9li801unzi1n",
        userId: user?.id || "",
      });

      // Show XP toast
      showToast("xp", "Earned 300 XP for buying a NFT ticket 🎉🎉", {
        xp: 300,
      });

      // Create ticket record in database
      if (user?.id) {
        try {
          // Create a ticket entry for each quantity purchased
          for (let i = 0; i < variables.qty; i++) {
            await createTicket(
              `token-${variables.id}-${Date.now()}-${i}`, //
              variables.eventId,
              user.id,
              false, // Not validated yet
              new Date(), // Current date as purchase date
              "Ticket holder" // Generic name as username is not available
            );
          }
          toast.success("Ticket bought successfully");
        } catch (error) {
          console.error("Failed to save ticket data:", error);
          toast.error("Failed to save ticket data in database");
        }
      }
    },
    onError: (error) => {
      toast.error(
        `Failed to verify ticket: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });
};
