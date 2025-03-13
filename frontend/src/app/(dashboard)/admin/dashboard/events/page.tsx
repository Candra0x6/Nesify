"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActiveAccount } from "thirdweb/react";

import { getAllEvents } from "@/lib/services/contracts/events";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import { ContractRes } from "@/types/contract";

// Dynamically import heavy components
const EventsList = dynamic(() => import("@/components/admin/events-list"), {
  loading: () => <Loader2 className="animate-spin" />,
});

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const activeAccount = useActiveAccount();
  console.log(activeAccount?.address);
  const { data: eventsData, isLoading } = useQuery<ContractRes<Event[]>>({
    queryKey: ["getAllEvents"],
    queryFn: async () => await getAllEvents(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const filteredEvents = eventsData?.data.filter((event: Event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = event.soldOut === true ? "Sold Out" : "Available";
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Events
          </h1>
          <p className="text-muted-foreground">
            Manage your events and ticket sales
          </p>
        </div>
        <Link href="/admin/dashboard/events/create">
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
        {isLoading ? (
          <div className="h-full w-full">Loading...</div>
        ) : filteredEvents ? (
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <div>
              {filteredEvents.map((event) => (
                <EventsList event={event} key={event.eventId} />
              ))}
            </div>
          </Suspense>
        ) : (
          <div className="h-full w-full">No events found</div>
        )}
      </motion.div>
    </div>
  );
}
