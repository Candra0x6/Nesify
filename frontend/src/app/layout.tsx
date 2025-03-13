import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProvider from "@/components/providers/client-provider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/elements/navbar";
import { XPToastProvider } from "@/hooks/useXPToast";
const Poppins = localFont({
  src: "../../public/fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
});

const PoppinsBold = localFont({
  src: "../../public/fonts/Poppins-Bold.ttf",
  variable: "--font-poppins-bold",
});

const PoppinsSemiBold = localFont({
  src: "../../public/fonts/Poppins-SemiBold.ttf",
  variable: "--font-poppins-semibold",
});

const PoppinsMedium = localFont({
  src: "../../public/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins-medium",
});

const PoppinsLight = localFont({
  src: "../../public/fonts/Poppins-Light.ttf",
  variable: "--font-poppins-light",
});

const PoppinsThin = localFont({
  src: "../../public/fonts/Poppins-Thin.ttf",
  variable: "--font-poppins-thin",
});

export const metadata: Metadata = {
  title: "Nesify",
  description: "Nesify - NFT Event Ticketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Poppins.variable} ${PoppinsBold.variable} ${PoppinsSemiBold.variable} ${PoppinsMedium.variable} ${PoppinsLight.variable} ${PoppinsThin.variable} antialiased`}
      >
        <ClientProvider>
          <XPToastProvider>
            <header>
              <Navbar />
            </header>
            <Toaster />
            {children}
          </XPToastProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
