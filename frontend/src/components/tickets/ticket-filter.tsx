"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Clock, Archive, RefreshCw, Search } from "lucide-react";
import { useState } from "react";

interface TicketFilterProps {
  onFilterChange: (filter: string) => void;
  onSearch: (query: string) => void;
}

export default function TicketFilter({
  onFilterChange,
  onSearch,
}: TicketFilterProps) {
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full bg-[#030303]/80 backdrop-blur-md sticky top-0 z-30 border-b border-white/[0.05]">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search your tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </form>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange("upcoming")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center gap-2 ${
                activeFilter === "upcoming"
                  ? "bg-primary text-white"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Upcoming Tickets</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange("past")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center gap-2 ${
                activeFilter === "past"
                  ? "bg-gradient-to-r from-indigo-500 to-rose-500 text-white"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <Archive className="w-4 h-4" />
              <span>Past Tickets</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterChange("transferable")}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center gap-2 ${
                activeFilter === "transferable"
                  ? "bg-primary text-white"
                  : "bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Transferable Tickets</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
