import EventCard from "@/components/marketplace/event-card";
import FeaturedEvents from "@/components/marketplace/featured-events";
import MarketplaceFooter from "@/components/marketplace/marketplace-footer";
import SearchFilters from "@/components/marketplace/search-filters";

// Mock data for events
const trendingEvents = [
  {
    id: "1",
    title: "Summer Music Festival 2023",
    image: "/placeholder.svg?height=400&width=600",
    date: "Aug 15-17, 2023",
    location: "Central Park, New York",
    price: "0.15",
    currency: "ETH",
    availableTickets: 156,
    tags: ["VIP", "Limited"],
  },
  {
    id: "2",
    title: "Blockchain Conference",
    image: "/placeholder.svg?height=400&width=600",
    date: "Sep 5, 2023",
    location: "Moscone Center, San Francisco",
    price: "0.08",
    currency: "ETH",
    availableTickets: 89,
    tags: ["Early Bird"],
  },
  {
    id: "3",
    title: "NBA Finals 2023",
    image: "/placeholder.svg?height=400&width=600",
    date: "Jun 10, 2023",
    location: "Madison Square Garden, New York",
    price: "0.25",
    currency: "ETH",
    availableTickets: 42,
    tags: ["Exclusive"],
  },
  {
    id: "4",
    title: "Electronic Dance Festival",
    image: "/placeholder.svg?height=400&width=600",
    date: "Jul 22-24, 2023",
    location: "Miami Beach, Florida",
    price: "0.12",
    currency: "ETH",
    availableTickets: 210,
    tags: ["VIP"],
  },
];

const upcomingEvents = [
  {
    id: "5",
    title: "Tech Summit 2023",
    image: "/placeholder.svg?height=400&width=600",
    date: "Oct 12-14, 2023",
    location: "Convention Center, Las Vegas",
    price: "0.10",
    currency: "ETH",
    availableTickets: 320,
    tags: [],
  },
  {
    id: "6",
    title: "Broadway Show: Hamilton",
    image: "/placeholder.svg?height=400&width=600",
    date: "Weekly Shows",
    location: "Broadway Theater, New York",
    price: "0.18",
    currency: "ETH",
    availableTickets: 64,
    tags: ["Premium"],
  },
  {
    id: "7",
    title: "Comic Con 2023",
    image: "/placeholder.svg?height=400&width=600",
    date: "Nov 3-5, 2023",
    location: "San Diego Convention Center",
    price: "0.09",
    currency: "ETH",
    availableTickets: 178,
    tags: [],
  },
  {
    id: "8",
    title: "World Cup Qualifier",
    image: "/placeholder.svg?height=400&width=600",
    date: "Sep 30, 2023",
    location: "MetLife Stadium, New Jersey",
    price: "0.15",
    currency: "ETH",
    availableTickets: 95,
    tags: ["Limited"],
  },
];

// Combine all events for the main listing
const allEvents = [
  ...trendingEvents,
  ...upcomingEvents,
  {
    id: "9",
    title: "Jazz Night at Blue Note",
    image: "/placeholder.svg?height=400&width=600",
    date: "Every Friday",
    location: "Blue Note, New York",
    price: "0.05",
    currency: "ETH",
    availableTickets: 45,
    tags: [],
  },
  {
    id: "10",
    title: "Art Exhibition Opening",
    image: "/placeholder.svg?height=400&width=600",
    date: "Aug 3, 2023",
    location: "Modern Art Museum, Los Angeles",
    price: "0.03",
    currency: "ETH",
    availableTickets: 120,
    tags: ["Early Bird"],
  },
  {
    id: "11",
    title: "Food & Wine Festival",
    image: "/placeholder.svg?height=400&width=600",
    date: "Sep 15-17, 2023",
    location: "Napa Valley, California",
    price: "0.07",
    currency: "ETH",
    availableTickets: 85,
    tags: ["VIP"],
  },
  {
    id: "12",
    title: "Startup Pitch Competition",
    image: "/placeholder.svg?height=400&width=600",
    date: "Oct 5, 2023",
    location: "Innovation Hub, Austin",
    price: "0.04",
    currency: "ETH",
    availableTickets: 150,
    tags: [],
  },
];

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <SearchFilters />

      <div className="container mx-auto px-4 md:px-6 py-8">
        <FeaturedEvents
          title="Trending Events"
          description="The most popular events that are selling fast"
          events={trendingEvents}
          viewAllLink="/events/trending"
        />

        <FeaturedEvents
          title="Upcoming Events"
          description="Don't miss out on these exciting upcoming events"
          events={upcomingEvents}
          viewAllLink="/events/upcoming"
        />

        <section className="w-full py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
            All Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </section>
      </div>

      <MarketplaceFooter />
    </main>
  );
}
