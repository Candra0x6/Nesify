"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, AlertCircle, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { listForResale } from "@/lib/services/contracts/tickets";
import { useCompleteMission } from "@/hooks/mission/useMission";
import { useUser } from "@/hooks/useUser";
import { useXPToast } from "@/hooks/useXPToast";

interface TicketResellModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  eventName: string;
  originalPrice: string;
  currency: string;
  maxPrice: number;
  royaltyFee: number;
  gbpMaxPrice: number;
}

export default function TicketResellModal({
  isOpen,
  onClose,
  ticketId,
  eventName,
  originalPrice,
  currency,
  maxPrice,
}: TicketResellModalProps) {
  const [price, setPrice] = useState(originalPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: completeMission } = useCompleteMission();
  const { user } = useUser();
  const showToast = useXPToast();
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const result = await listForResale(
        Number(ticketId),
        { gbp: Number(price), matic: Number(price) },
        { gbp: Number(originalPrice), matic: Number(originalPrice) }
      );
      if (result.error) {
        throw new Error(result.error);
      }
      completeMission({
        missionId: "cm848fq5n000h9li8q723qjme",
        userId: user?.id || "",
      });
      showToast("xp", "Earned 250 XP for reselling a ticket 🎉🎉", {
        xp: 250,
      });

      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate service fee (5%)
  const serviceFee = Number.parseFloat(price) * 0.05;
  const creatorRoyalty = Number.parseFloat(price) * 0.1;
  const youReceive = Number.parseFloat(price) - serviceFee - creatorRoyalty;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 w-full max-w-md relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Resell Ticket</h3>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-white/60 mb-2">
                List your ticket for{" "}
                <span className="text-white font-medium">{eventName}</span> on
                the marketplace
              </p>

              <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.08] flex items-center gap-2 text-white/40 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>
                  Your ticket will be available for purchase by other users once
                  listed.
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-white/70 mb-2 text-sm">
                  Listing Price ({currency})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    required
                  />
                </div>
                <div className="mt-1 text-xs text-white/40 flex justify-between">
                  <span>
                    Original price: {originalPrice} {currency}
                  </span>
                  <span>
                    Recommended: {Number.parseFloat(originalPrice) * 1.1}{" "}
                    {currency}
                  </span>
                </div>
              </div>

              <div className="mb-6 bg-white/[0.02] rounded-lg p-4 border border-white/[0.05]">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-400" />
                  <span>Fee Breakdown</span>
                </h4>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                      Estimate Service Fee (5%)
                    </span>
                    <span className="text-white/80">
                      {serviceFee.toFixed(3)} {currency}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Creator Royalty (10%)</span>
                    <span className="text-white/80">
                      {creatorRoyalty.toFixed(3)} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Max Price</span>
                    <span className="text-white/80">
                      {maxPrice} {currency}
                    </span>
                  </div>

                  <div className="border-t border-white/[0.05] pt-2 mt-2 flex justify-between text-sm font-medium">
                    <span className="text-white">You Receive</span>
                    <span className="text-white">
                      {youReceive.toFixed(3)} {currency}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    <span>List for Sale</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
