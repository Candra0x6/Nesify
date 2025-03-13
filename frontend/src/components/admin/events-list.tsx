"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";

export default function EventsList({ event }: { event: Event }) {
  return (
    <div className="h-full w-full">
      <motion.div
        key={event.eventId}
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
                  {new Date(event.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-white/60">{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="text-white/60">
                  {event.soldOut ? "Sold Out" : "Available"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/admin/dashboard/events/${event.eventId}`}>
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
            <span>{Math.round((Number(10) / Number(10)) * 100)}%</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full  transition-all  bg-gradient-to-r from-indigo-500 to-rose-500 "
              style={{
                width: `${(Number(10) / Number(10)) * 100}%`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
