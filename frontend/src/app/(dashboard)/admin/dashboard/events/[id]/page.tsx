"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for event details
const eventData = {
  id: "1",
  name: "Summer Music Festival",
  date: "2024-06-15",
  time: "14:00",
  location: "Central Park, NY",
  description: "A fantastic summer music festival featuring top artists...",
  status: "upcoming",
  ticketsSold: 850,
  totalTickets: 1000,
  revenue: "$25,500",
  ticketTypes: [
    {
      id: "1",
      name: "General Admission",
      price: "$50",
      sold: 500,
      total: 600,
    },
    {
      id: "2",
      name: "VIP",
      price: "$150",
      sold: 350,
      total: 400,
    },
  ],
  recentSales: [
    {
      id: "1",
      buyer: "John Doe",
      type: "General Admission",
      quantity: 2,
      total: "$100",
      time: "2 hours ago",
    },
    // Add more sales...
  ],
};

export default function EventDetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {eventData.name}
          </h1>
          <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(eventData.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {eventData.location}
            </div>
          </div>
        </div>
        <Button>Edit Event</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventData.revenue}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tickets Sold
              </CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventData.ticketsSold}/{eventData.totalTickets}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (eventData.ticketsSold / eventData.totalTickets) * 100
                )}
                % of total tickets
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventData.ticketsSold}</div>
              <p className="text-xs text-muted-foreground">
                Expected attendees
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Price
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$75</div>
              <p className="text-xs text-muted-foreground">Per ticket</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white active:bg-white/[0.02]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Basic information about the event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {eventData.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-medium">Date & Time</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(eventData.date).toLocaleDateString()} at{" "}
                    {eventData.time}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {eventData.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader>
              <CardTitle>Ticket Types</CardTitle>
              <CardDescription>
                Available ticket types and their sales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventData.ticketTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between rounded-lg  p-4 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05]  text-white"
                  >
                    <div>
                      <h3 className="font-medium">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {type.price} per ticket
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {type.sold}/{type.total}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tickets sold
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>Latest ticket purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventData.recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between rounded-lg  p-4 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05]  text-white"
                  >
                    <div>
                      <h3 className="font-medium">{sale.buyer}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sale.type} x {sale.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{sale.total}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          {/* Ticket management content */}
        </TabsContent>

        <TabsContent value="attendees">
          {/* Attendees list content */}
        </TabsContent>

        <TabsContent value="settings">
          {/* Event settings content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
