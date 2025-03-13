"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CheckCircle, EyeClosed, Eye } from "lucide-react";
import { useEffect } from "react";
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { ethers } from "ethers";
import { signers } from "@/lib/contract/cont";
import toast from "react-hot-toast";

interface TicketQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  eventName: string;
  eventDate: string;
  ticketType: string;
  ownershipStatus: string;
  qrCodeUrl?: string;
}

export default function TicketQRModal({
  isOpen,
  onClose,
  ticketId,
  eventName,
  eventDate,
  ticketType,
  ownershipStatus,
}: TicketQRModalProps) {
  const [show, setShow] = useState<boolean>(false);
  const [qr, setQr] = useState<string>("");

  const createSplitSignature = async (message: string): Promise<string> => {
    const signedContracts = await signers();
    const { signer } = signedContracts;
    // The hash we wish to sign and verify
    const messageHash = ethers.utils.id(message);
    const messageHashBytes = ethers.utils.arrayify(messageHash);

    // Sign the binary data
    const flatSig = await signer.signMessage(messageHashBytes);
    // For Solidity, we need the expanded-format of a signature
    return flatSig;
  };

  async function calculateQR(): Promise<void> {
    try {
      const signedsecondHalf = await createSplitSignature(ticketId);
      setQr(`${ticketId}-${signedsecondHalf}`);
      setShow(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage);
    }
  }

  const downloadQR = (): void => {
    const qrCodeElement = document.getElementById("qrCode");
    if (!qrCodeElement) return;

    const qrCodeURL = (qrCodeElement as HTMLCanvasElement)
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const doc = new jsPDF("portrait", "px", "a4", false);
    //first param is margin, second param is length down
    // @ts-expect-error - jsPDF is not typed
    doc.text(60, 60, `Event: ${eventName} `);
    // @ts-expect-error - jsPDF is not typed
    doc.text(60, 80, `Ticket: ${ticketType} `);
    doc.addImage(qrCodeURL, "PNG", 180, 100, 100, 100);
    doc.setFontSize(8);
    // @ts-expect-error - jsPDF is not typed
    doc.text(2, 210, `${qr} `);

    doc.save("ticket.pdf");
  };

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
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Ticket QR Code</h3>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-6 mb-6">
              <div className="flex flex-col items-center">
                {!show ? (
                  <motion.button
                    onClick={calculateQR}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-2 mb-4"
                  >
                    <Download className="w-4 h-4" />
                    <span>Reveal QR</span>
                  </motion.button>
                ) : (
                  <QRCodeCanvas
                    className="m-4 h-44 w-44"
                    id="qrCode"
                    value={qr}
                  />
                )}
                <div className="text-center">
                  <h4 className="text-white font-medium mb-1">{eventName}</h4>
                  <p className="text-white/60 text-sm mb-2">{eventDate}</p>

                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full backdrop-blur-sm border border-white/10 text-white/90 ${
                        ticketType === "VIP"
                          ? "bg-rose-500/40 border-rose-500/30"
                          : ticketType === "Early Bird"
                          ? "bg-amber-500/40 border-amber-500/30"
                          : "bg-black/40"
                      }`}
                    >
                      {ticketType}
                    </span>

                    <span
                      className={`px-2 py-0.5 text-xs rounded-full backdrop-blur-sm border border-white/10 text-white/90 ${
                        ownershipStatus === "verified"
                          ? "bg-emerald-500/40 border-emerald-500/30"
                          : "bg-amber-500/40 border-amber-500/30"
                      }`}
                    >
                      {ownershipStatus === "verified" ? "Verified" : "Pending"}
                    </span>
                  </div>

                  <div className="text-xs text-white/40">
                    Ticket ID: {ticketId}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <motion.button
                onClick={downloadQR}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </motion.button>

              <motion.button
                onClick={() => setShow(!show)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white text-sm flex items-center gap-2"
              >
                {show ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span>{show ? "Hide" : "Show"}</span>
              </motion.button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-xs">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>This QR code updates automatically before the event</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
