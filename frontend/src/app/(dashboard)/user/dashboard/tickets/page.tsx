"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TicketFilter from "@/components/tickets/ticket-filter";
import TicketCard from "@/components/tickets/ticket-card";
import TicketQRModal from "@/components/tickets/ticket-qr-modal";
import TicketTransferModal from "@/components/tickets/ticket-transfer-modal";
import TicketResellModal from "@/components/tickets/ticket-resell-modal";

// Mock data for tickets
const upcomingTickets = [
  {
    id: "ticket-1",
    eventName: "Summer Music Festival 2023",
    eventDate: "Aug 15-17, 2023",
    venue: "Central Park",
    location: "New York",
    price: "0.15",
    currency: "ETH",
    purchaseDate: "Jul 10, 2023",
    ticketType: "VIP",
    ownershipStatus: "verified" as const,
    image: "/placeholder.svg?height=400&width=600",
    hasPerks: true,
    isTransferable: true,
  },
  {
    id: "ticket-2",
    eventName: "Blockchain Conference",
    eventDate: "Sep 5, 2023",
    venue: "Moscone Center",
    location: "San Francisco",
    price: "0.08",
    currency: "ETH",
    purchaseDate: "Aug 1, 2023",
    ticketType: "Early Bird",
    ownershipStatus: "verified" as const,
    image: "/placeholder.svg?height=400&width=600",
    hasPerks: false,
    isTransferable: true,
  },
  {
    id: "ticket-3",
    eventName: "NBA Finals 2023",
    eventDate: "Jun 10, 2023",
    venue: "Madison Square Garden",
    location: "New York",
    price: "0.25",
    currency: "ETH",
    purchaseDate: "May 15, 2023",
    ticketType: "Premium",
    ownershipStatus: "verified" as const,
    image: "/placeholder.svg?height=400&width=600",
    hasPerks: true,
    isTransferable: true,
  },
  {
    id: "ticket-4",
    eventName: "Electronic Dance Festival",
    eventDate: "Jul 22-24, 2023",
    venue: "Miami Beach",
    location: "Florida",
    price: "0.12",
    currency: "ETH",
    purchaseDate: "Jun 5, 2023",
    ticketType: "General",
    ownershipStatus: "pending" as const,
    image: "/placeholder.svg?height=400&width=600",
    hasPerks: false,
    isTransferable: false,
  },
];

const pastTickets = [
  {
    id: "ticket-5",
    eventName: "Tech Summit 2022",
    eventDate: "Nov 12-14, 2022",
    venue: "Convention Center",
    location: "Las Vegas",
    price: "0.10",
    currency: "ETH",
    purchaseDate: "Oct 1, 2022",
    ticketType: "General",
    ownershipStatus: "verified" as const,
    image: "/placeholder.svg?height=400&width=600",
    hasPerks: false,
    isPast: true,
    isTransferable: false,
  },
  {
    id: "ticket-6",
    eventName: "Broadway Show: Hamilton",
    eventDate: "Dec 15, 2022",
    venue: "Broadway Theater",
    location: "New York",
    price: "0.18",
    currency: "ETH",
    purchaseDate: "Nov 20, 2022",
    ticketType: "Premium",
    ownershipStatus: "verified" as const,
    image: "/placeholder.svg?height=400&width=600",
    hasPerks: false,
    isPast: true,
    isTransferable: false,
  },
];

// Combine all tickets
const allTickets = [...upcomingTickets, ...pastTickets];

export default function TicketsPage() {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isResellModalOpen, setIsResellModalOpen] = useState(false);

  // Filter tickets based on active filter and search query
  const filteredTickets = allTickets.filter((ticket: any) => {
    // Filter by category
    if (activeFilter === "upcoming" && ticket.isPast) return false;
    if (activeFilter === "past" && !ticket.isPast) return false;
    if (
      activeFilter === "transferable" &&
      (!ticket.isTransferable || ticket.isPast)
    )
      return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        ticket.eventName.toLowerCase().includes(query) ||
        ticket.venue.toLowerCase().includes(query) ||
        ticket.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const openQRModal = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsQRModalOpen(true);
  };

  const openTransferModal = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsTransferModalOpen(true);
  };

  const openResellModal = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsResellModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#030303]">
      <TicketFilter
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            My Tickets – Manage & Access Your Events
          </h1>
          <p className="text-white/40 max-w-3xl">
            View and manage your NFT tickets, transfer them to friends, or
            resell them on the marketplace.
          </p>
        </div>

        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} onClick={() => openQRModal(ticket)}>
                <TicketCard {...ticket} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              No tickets found
            </h3>
            <p className="text-white/40">
              {searchQuery
                ? "No tickets match your search criteria. Try a different search term."
                : activeFilter === "upcoming"
                ? "You don't have any upcoming tickets. Browse events to purchase tickets."
                : activeFilter === "past"
                ? "You don't have any past tickets."
                : "You don't have any transferable tickets."}
            </p>

            {!searchQuery && activeFilter === "upcoming" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium"
              >
                Browse Events
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {selectedTicket && (
        <TicketQRModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          ticketId={selectedTicket.id}
          eventName={selectedTicket.eventName}
          eventDate={selectedTicket.eventDate}
          ticketType={selectedTicket.ticketType}
          ownershipStatus={selectedTicket.ownershipStatus}
          qrCodeUrl="/placeholder.svg?height=200&width=200"
        />
      )}

      {/* Transfer Modal */}
      {selectedTicket && (
        <TicketTransferModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          ticketId={selectedTicket.id}
          eventName={selectedTicket.eventName}
        />
      )}

      {/* Resell Modal */}
      {selectedTicket && (
        <TicketResellModal
          isOpen={isResellModalOpen}
          onClose={() => setIsResellModalOpen(false)}
          ticketId={selectedTicket.id}
          eventName={selectedTicket.eventName}
          originalPrice={selectedTicket.price}
          currency={selectedTicket.currency}
        />
      )}
    </main>
  );
}
