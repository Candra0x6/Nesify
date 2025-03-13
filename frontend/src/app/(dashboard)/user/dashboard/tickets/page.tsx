"use client";

import { useState, Suspense } from "react";
import TicketFilter from "@/components/tickets/ticket-filter";
import TicketCard from "@/components/tickets/ticket-card";
import TicketQRModal from "@/components/tickets/ticket-qr-modal";
import TicketTransferModal from "@/components/tickets/ticket-transfer-modal";
import TicketResellModal from "@/components/tickets/ticket-resell-modal";

import { getMyTickets, MyTicket } from "@/lib/services/contracts/tickets";
import { useQuery } from "@tanstack/react-query";
import { Link, Loader2 } from "lucide-react";

export default function TicketsPage() {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<MyTicket | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isResellModalOpen, setIsResellModalOpen] = useState(false);

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["myTickets"],
    queryFn: () => getMyTickets(),
  });
  // const filteredTickets = allTickets.filter((ticket: any) => {
  //   // Filter by category
  //   if (activeFilter === "upcoming" && ticket.isPast) return false;
  //   if (activeFilter === "past" && !ticket.isPast) return false;
  //   if (
  //     activeFilter === "transferable" &&
  //     (!ticket.isTransferable || ticket.isPast)
  //   )
  //     return false;

  //   // Filter by search query
  //   if (searchQuery) {
  //     const query = searchQuery.toLowerCase();
  //     return (
  //       ticket.eventName.toLowerCase().includes(query) ||
  //       ticket.venue.toLowerCase().includes(query) ||
  //       ticket.location.toLowerCase().includes(query)
  //     );
  //   }

  //   return true;
  // });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const openQRModal = (ticket: MyTicket) => {
    setSelectedTicket(ticket);
    setIsQRModalOpen(true);
  };

  const openTransferModal = (ticket: MyTicket) => {
    setSelectedTicket(ticket);
    setIsTransferModalOpen(true);
  };

  const openResellModal = (ticket: MyTicket) => {
    setSelectedTicket(ticket);
    setIsResellModalOpen(true);
  };

  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <main className="min-h-screen bg-[#030303]">
        <TicketFilter
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-primary">
              My Tickets – Manage & Access Your Events
            </h1>
            <p className="text-white/40 max-w-3xl">
              View and manage your NFT tickets, transfer them to friends, or
              resell them on the marketplace.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Loader2 className="animate-spin text-white" />
            </div>
          ) : tickets?.data && tickets?.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tickets?.data.map((ticket: MyTicket) => (
                <div key={ticket.tokenId}>
                  <TicketCard
                    data={ticket}
                    openResellModal={openResellModal}
                    openQRModal={openQRModal}
                    openTransferModal={openTransferModal}
                  />
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
                <Link
                  href="/events"
                  className="mt-4 px-6 py-2 rounded-full bg-primary text-white text-sm font-medium"
                >
                  Browse Events
                </Link>
              )}
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        {selectedTicket && (
          <TicketQRModal
            isOpen={isQRModalOpen}
            onClose={() => setIsQRModalOpen(false)}
            ticketId={selectedTicket.tokenId.toString()}
            eventName={selectedTicket.eventName}
            eventDate={selectedTicket.startDate}
            ticketType={selectedTicket.ticketName}
            ownershipStatus={selectedTicket.quantity.toString()}
            qrCodeUrl="/placeholder.svg?height=200&width=200"
          />
        )}

        {/* Transfer Modal */}
        {selectedTicket && (
          <TicketTransferModal
            isOpen={isTransferModalOpen}
            onClose={() => setIsTransferModalOpen(false)}
            ticketId={selectedTicket.tokenId.toString()}
            eventName={selectedTicket.eventName}
          />
        )}

        {/* Resell Modal */}
        {selectedTicket && (
          <TicketResellModal
            isOpen={isResellModalOpen}
            onClose={() => setIsResellModalOpen(false)}
            ticketId={selectedTicket.tokenId.toString()}
            eventName={selectedTicket.eventName}
            originalPrice={selectedTicket.price}
            currency={"MATIC"}
            maxPrice={selectedTicket.maxPrice.matic}
            royaltyFee={selectedTicket.royaltyFee ?? 0}
            gbpMaxPrice={selectedTicket.maxPrice.gbp ?? 0}
          />
        )}
      </main>
    </Suspense>
  );
}
