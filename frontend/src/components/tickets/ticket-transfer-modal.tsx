"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface TicketTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  eventName: string;
}

export default function TicketTransferModal({
  isOpen,
  onClose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ticketId,
  eventName,
}: TicketTransferModalProps) {
  const [transferMethod, setTransferMethod] = useState<"email" | "wallet">(
    "email"
  );
  const [recipient, setRecipient] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

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
              <h3 className="text-xl font-bold text-white">Transfer Ticket</h3>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-white/60 mb-2">
                Transfer your ticket for{" "}
                <span className="text-white font-medium">{eventName}</span>
              </p>

              <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.08] flex items-center gap-2 text-white/40 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>
                  Once transferred, you will no longer have access to this
                  ticket.
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-white/70 mb-2 text-sm">
                  Transfer Method
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTransferMethod("email")}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm ${
                      transferMethod === "email"
                        ? "bg-gradient-to-r from-indigo-500/20 to-rose-500/20 border border-indigo-500/30 text-white"
                        : "bg-white/[0.03] border border-white/[0.08] text-white/60"
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTransferMethod("wallet")}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm ${
                      transferMethod === "wallet"
                        ? "bg-gradient-to-r from-indigo-500/20 to-rose-500/20 border border-indigo-500/30 text-white"
                        : "bg-white/[0.03] border border-white/[0.08] text-white/60"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Wallet Address</span>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white/70 mb-2 text-sm">
                  {transferMethod === "email"
                    ? "Recipient Email"
                    : "Recipient Wallet Address"}
                </label>
                <input
                  type={transferMethod === "email" ? "email" : "text"}
                  placeholder={
                    transferMethod === "email" ? "friend@example.com" : "0x..."
                  }
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-medium flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transfer Ticket</span>
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
