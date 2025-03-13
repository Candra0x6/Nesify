"use client";

import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  MapPin,
  Tag,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function SearchFilters() {
  const [showFilters, setShowFilters] = useState(false);

  const dates = [
    "Any Date",
    "Today",
    "This Week",
    "This Weekend",
    "This Month",
  ];
  const sortOptions = [
    "Trending",
    "Lowest Price",
    "Most Popular",
    "Newest Added",
  ];

  return (
    <div className="w-full bg-[#030303]/80 backdrop-blur-md sticky top-0 z-30 border-b border-white/[0.05]">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Search events, artists, or venues..."
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
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
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
                  <span className="text-sm font-medium">Date</span>
                </div>
                <select className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                  {dates.map((date, index) => (
                    <option key={index} value={date} className="bg-[#121212]">
                      {date}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <input
                  type="text"
                  placeholder="City or venue"
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/70">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-medium">Price Range</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                  <span className="text-white/40">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-sm font-medium">Sort By</span>
                </div>
                <select className="w-full px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                  {sortOptions.map((option, index) => (
                    <option key={index} value={option} className="bg-[#121212]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-sm font-medium"
                >
                  Apply Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
