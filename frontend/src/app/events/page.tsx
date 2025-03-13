import { Metadata } from "next";
import EventsClient from "@/components/marketplace/events-client";

export const metadata: Metadata = {
  title: "Events Marketplace | NFT Ticketing Platform",
  description:
    "Browse and purchase tickets for upcoming events. Find concerts, sports, theater, and more with secure NFT-based ticketing.",
  keywords:
    "events, tickets, NFT tickets, marketplace, concerts, sports, theater",
};

export default async function EventsPage() {
  return <EventsClient />;
}
