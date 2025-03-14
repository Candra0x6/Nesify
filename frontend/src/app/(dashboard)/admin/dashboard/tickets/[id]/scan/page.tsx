"use client";

import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { signers } from "@/lib/contract/cont";
import { client, NFTContract } from "@/lib/thirdweb-dev";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useParams } from "next/navigation";
import { download } from "thirdweb/storage";

export default function ValidateTicket() {
  const params = useParams();
  const eventId = params.id;
  const [ticket, setTicket] = useState("");
  const [eventName, setEventName] = useState("");
  const [id, setId] = useState("");
  const [sig, setSig] = useState("");
  const [err, setErr] = useState("");
  const [valErr, setValErr] = useState("");
  const [ver, setVer] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    loadEvent();

    // Initialize QR Scanner
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scannerRef.current.render(handleScanSuccess, handleScanError);

    // Cleanup
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScanSuccess = (decodedText: string) => {
    setTicket(decodedText);
    setVer("");
    setValErr("");
    scannedTicket(decodedText);
  };

  const handleScanError = (errorMessage: string) => {
    console.error("QR Scan Error:", errorMessage);
    // Don't set error for normal scanning process
    if (errorMessage.includes("NotFound")) return;
    setValErr(errorMessage || "Failed to scan QR code");
  };

  const scannedTicket = (scannedData: string) => {
    const splitString = scannedData.split("-");
    if (splitString.length !== 2) {
      setValErr("Invalid QR code format");
      console.error("Invalid ticket format:", scannedData);
      return;
    }
    setId(splitString[0]);
    setSig(splitString[1]);
  };

  async function loadEvent() {
    try {
      if (!Number.isInteger(parseInt(eventId as string))) {
        throw new Error(`Event ID '${eventId}' is not valid`);
      }
      const signedContracts = await signers();
      const { signer, signedMarketContract } = signedContracts;
      const address = await signer.getAddress();

      const data = await signedMarketContract.getEvent(eventId);
      if (data.owner !== address) {
        throw new Error(
          `You do not have permission to validate tickets for Event #${eventId}`
        );
      }
      const eventUri = await data.uri;
      if (!eventUri) {
        throw new Error("Event data not found");
      }
      const response = await download({
        client: client,
        uri: eventUri,
      });
      const eventData = await response.json();
      setEventName(eventData.name);
      setLoadingState(true);
    } catch (error: unknown) {
      console.error("Event loading error:", error);
      if (error instanceof Error) {
        setErr(error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "data" in error
      ) {
        setErr((error as { data: { message: string } }).data.message);
      } else {
        setErr("An unknown error occurred");
      }
      setLoadingState(true);
    }
  }

  async function verifyTicket() {
    try {
      const signedContracts = await signers();
      const { signedMarketContract } = signedContracts;
      const messageHash = ethers.utils.id(id);
      const fullSig = ethers.utils.splitSignature(sig);
      const validateTicketEvent = await signedMarketContract.validateTicket(
        NFTContract,
        id,
        messageHash,
        fullSig.v,
        fullSig.r,
        fullSig.s
      );
      let verifiedAddress = await validateTicketEvent.wait();
      const validatedEvent = verifiedAddress.events.find(
        (element: { event: string; args: { ownerAddress: string } }) =>
          element.event === "TicketValidated"
      );

      if (validatedEvent) {
        verifiedAddress = validatedEvent.args.ownerAddress;
        setVer(
          `Ticket #${id} successfully verified for Account ${verifiedAddress}`
        );
      } else {
        throw new Error("Ticket validation failed");
      }
    } catch (error: unknown) {
      console.error("Verification error:", error);
      if (error instanceof Error) {
        setValErr(error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "data" in error
      ) {
        setValErr((error as { data: { message: string } }).data.message);
      } else {
        setValErr("An unknown error occurred");
      }
    }
  }

  if (!loadingState) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-white/80">Loading...</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500/10 text-red-500 p-6 rounded-xl">
          <p className="text-lg font-semibold">{err}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Validate Tickets</h1>
      <h2 className="text-xl mb-8">
        <span className="text-primary">{eventName}</span>
        <span className="text-white/60"> - #{eventId}</span>
      </h2>

      <div className="max-w-md mx-auto bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6 mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Scan QR Code</h3>
        <div id="qr-reader" className="mx-auto mb-4" />
        <p className="text-white/60">Scan User&apos;s Ticket QR Code</p>
      </div>

      {ticket && (
        <div className="max-w-md mx-auto bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Scanned Result
          </h3>
          <div className="space-y-4">
            {id && <p className="text-primary font-medium">Ticket ID: #{id}</p>}
            {sig && (
              <p className="text-white/60 text-sm break-all">
                Signature: {sig}
              </p>
            )}
            {!valErr && (
              <button
                onClick={verifyTicket}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Verify Ticket
              </button>
            )}
            {ver && <p className="text-green-500 font-medium">{ver}</p>}
          </div>
        </div>
      )}

      {valErr && (
        <div className="mt-6 max-w-md mx-auto bg-red-500/10 text-red-500 p-4 rounded-xl">
          <p>{valErr}</p>
        </div>
      )}

      {(valErr || ver) && (
        <div className="mt-6 text-white/60">
          <p>Scan another ticket to continue</p>
        </div>
      )}
    </div>
  );
}
