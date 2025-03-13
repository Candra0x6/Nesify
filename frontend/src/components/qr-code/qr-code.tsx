/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { ethers } from "ethers";
import { signers } from "@/lib/contract/cont";
import toast from "react-hot-toast";

interface QRProps {
  tokenId: string;
  event: string;
  ticket: string;
}

const QR: React.FC<QRProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const [qr, setQr] = useState<string>("");
  const [err, setErr] = useState<string>("");

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
      setErr("");
      const signedsecondHalf = await createSplitSignature(props.tokenId);
      setQr(`${props.tokenId}-${signedsecondHalf}`);
      setShow(true);
    } catch (error: unknown) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setErr(errorMessage);
      toast.error(errorMessage);
    }
  }

  const downloadQR = (): void => {
    const qrCodeElement = document.getElementById("qrCode");
    if (!qrCodeElement) return;

    const qrCodeURL = (qrCodeElement as HTMLCanvasElement)
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    // eslint-disable-next-line prefer-const
    let doc = new jsPDF("portrait", "px", "a4", false);
    //first param is margin, second param is length down
    // @ts-expect-error - jsPDF is not typed
    doc.text(60, 60, `Event: ${props.event} `);
    // @ts-expect-error - jsPDF is not typed

    doc.text(60, 80, `Ticket: ${props.ticket} `);

    doc.addImage(qrCodeURL, "PNG", 180, 100, 100, 100);
    doc.setFontSize(8);
    // @ts-expect-error - jsPDF is not typed

    doc.text(2, 210, `${qr} `);

    doc.save("ticket.pdf");
  };

  return (
    <div className="">
      {!show ? (
        <div className="container text-center bg-transparent">
          <button onClick={calculateQR} className="">
            Click to Reveal QR Code
          </button>
          <p className="text-danger mt-3">{err}</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <QRCodeCanvas className="m-4 h-44 w-44" id="qrCode" value={qr} />
          </div>
          <div className="btn-group">
            <button
              type="button"
              onClick={downloadQR}
              className="btn btn-primary"
            >
              Download Ticket
            </button>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="btn btn-outline-primary"
            >
              Hide Ticket
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QR;
