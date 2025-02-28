"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for events
const events = [
  {
    id: "1",
    name: "Summer Music Festival",
    date: "2024-06-15",
    location: "Central Park, NY",
    status: "upcoming",
    ticketsSold: 850,
    totalTickets: 1000,
    revenue: "$25,500",
  },
  {
    id: "2",
    name: "Tech Conference 2024",
    date: "2024-05-10",
    location: "Convention Center, SF",
    status: "live",
    ticketsSold: 425,
    totalTickets: 500,
    revenue: "$12,750",
  },
  // Add more events...
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage your events and ticket sales
          </p>
        </div>
        <Link href="/admin/events/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form className="relative w-full">
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl text-white py-6">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6"
      >
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="group p-6 shadow-sm transition-all hover:shadow-md bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] text-white rounded-xl "
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {event.name}
                </h2>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-white/60">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-white/60">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-white/60">
                      {event.ticketsSold}/{event.totalTickets} tickets sold
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium">{event.revenue}</p>
                  <p className="text-xs text-white">Total Revenue</p>
                </div>
                <Link href={`/admin/dashboard/events/${event.id}`}>
                  <Button
                    variant="outline"
                    className="hover:bg-white/[0.03] bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white text-sm transition-colors"
                  >
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/60">
                <span>Tickets Sold</span>
                <span>
                  {Math.round((event.ticketsSold / event.totalTickets) * 100)}%
                </span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full  transition-all  bg-gradient-to-r from-indigo-500 to-rose-500 "
                  style={{
                    width: `${(event.ticketsSold / event.totalTickets) * 100}%`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
