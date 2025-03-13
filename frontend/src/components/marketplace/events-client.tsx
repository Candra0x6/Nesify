"use client";

import EventCard from "@/components/marketplace/event-card";
import MarketplaceFooter from "@/components/marketplace/marketplace-footer";
import { getAllEvents } from "@/lib/services/contracts/events";
import { useQuery } from "@tanstack/react-query";
import SearchFilters from "@/components/marketplace/search-filters";
import { Event } from "@/types/event";

export default function EventsClient() {
  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["GetAllEvents"],
    queryFn: getAllEvents,
  });

  return (
    <main className="min-h-screen bg-[#030303]">
      <SearchFilters />

      <div className="container mx-auto px-4 md:px-6 py-8">
        <section className="w-full py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            All Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eventsLoading ? (
              <div className="h-full w-full">Loading...</div>
            ) : eventsData && eventsData.data.length > 0 ? (
              eventsData.data.map((event: Event, index: number) => (
                <EventCard key={index} props={event} />
              ))
            ) : (
              <div className="h-full w-full">No events found</div>
            )}
          </div>
        </section>
      </div>

      <MarketplaceFooter />
    </main>
  );
}
