"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  Search,
  SlidersHorizontal,
  Calendar,
  Tag,
  MapPin,
  Loader2,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import MarketplaceTicketCard from "@/components/marketplace/marketplace-ticket-card";
import { useQuery } from "@tanstack/react-query";
import { getResaleTicketsByTokenId } from "@/lib/services/contracts/tickets";

export default function ResaleTicketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getResaleTicketsByTokenId("1"),
  });
  const filteredTickets = tickets?.data.filter((ticket) => {
    const matchesSearch =
      ticket.ticket.eventName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      ticket.ticket.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriceRange =
      priceRange === "all" ||
      (priceRange === "under100" && Number(ticket.price) < 100) ||
      (priceRange === "100to200" &&
        Number(ticket.price) >= 100 &&
        Number(ticket.price) <= 200) ||
      (priceRange === "200to500" &&
        Number(ticket.price) >= 200 &&
        Number(ticket.price) <= 500) ||
      (priceRange === "over500" && Number(ticket.price) > 500);

    return matchesSearch && matchesPriceRange;
  });

  return (
    <main className="min-h-screen bg-[#030303] pt-20">
      <div className="w-full bg-[#030303]/80 backdrop-blur-md sticky top-0 z-30 border-b border-white/[0.05]">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col gap-4">
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Link
                href="/events"
                className="text-white/70 hover:text-white transition-colors"
              >
                ← Back to Marketplace
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/40" />
              </div>
              <input
                type="text"
                placeholder="Search events, venues, or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filters</span>
              </motion.button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/[0.05]"
              >
                {/* Date Filter */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Event Date</span>
                  </div>
                  <select className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                    <option value="any" className="bg-[#121212]">
                      Any Date
                    </option>
                    <option value="thisWeek" className="bg-[#121212]">
                      This Week
                    </option>
                    <option value="thisMonth" className="bg-[#121212]">
                      This Month
                    </option>
                    <option value="nextMonth" className="bg-[#121212]">
                      Next Month
                    </option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70">
                    <Tag className="h-4 w-4" />
                    <span className="text-sm font-medium">Price Range</span>
                  </div>
                  <select
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="all" className="bg-[#121212]">
                      Any Price
                    </option>
                    <option value="under100" className="bg-[#121212]">
                      Under $100
                    </option>
                    <option value="100to200" className="bg-[#121212]">
                      $100 - $200
                    </option>
                    <option value="200to500" className="bg-[#121212]">
                      $200 - $500
                    </option>
                    <option value="over500" className="bg-[#121212]">
                      Over $500
                    </option>
                  </select>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <select className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                    <option value="any" className="bg-[#121212]">
                      Any Location
                    </option>
                    <option value="ny" className="bg-[#121212]">
                      New York
                    </option>
                    <option value="la" className="bg-[#121212]">
                      Los Angeles
                    </option>
                    <option value="sf" className="bg-[#121212]">
                      San Francisco
                    </option>
                    <option value="miami" className="bg-[#121212]">
                      Miami
                    </option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/70">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="text-sm font-medium">Sort By</span>
                  </div>
                  <select className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                    <option value="recommended" className="bg-[#121212]">
                      Recommended
                    </option>
                    <option value="priceLow" className="bg-[#121212]">
                      Price: Low to High
                    </option>
                    <option value="priceHigh" className="bg-[#121212]">
                      Price: High to Low
                    </option>
                    <option value="dateClosest" className="bg-[#121212]">
                      Date: Closest First
                    </option>
                    <option value="sellerRating" className="bg-[#121212]">
                      Seller Rating
                    </option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            Resale Tickets Marketplace
          </h1>
          <p className="text-white/40 max-w-3xl">
            Browse verified resale tickets from other fans. All transactions are
            secured by blockchain technology.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : filteredTickets ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTickets?.map((ticket) => (
              <MarketplaceTicketCard key={ticket.resaleId} data={ticket} />
            ))}
          </div>
        ) : (
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-8 text-center">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-white/40 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No tickets found
            </h3>
            <p className="text-white/40 mb-6">
              We couldn&apos;t find any tickets matching your search criteria.
              Try adjusting your filters or search terms.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setPriceRange("all");
              }}
              className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white border-0"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
