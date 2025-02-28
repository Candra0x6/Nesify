"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, QrCode, Search, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for tickets
const tickets = [
  {
    id: "TICKET-001",
    event: "Summer Music Festival",
    type: "VIP",
    holder: "John Doe",
    purchaseDate: "2024-02-25",
    status: "valid",
    price: "$150.00",
  },
  {
    id: "TICKET-002",
    event: "Tech Conference 2024",
    type: "General Admission",
    holder: "Jane Smith",
    purchaseDate: "2024-02-24",
    status: "used",
    price: "$50.00",
  },
  // Add more tickets...
];

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">
            Manage and verify tickets for all events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <QrCode className="mr-2 h-4 w-4" />
            Scan Ticket
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>
        {/* Add more stat cards */}
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

      {/* Tickets Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" border bg-white/[0.02] backdrop-blur-sm border-white/[0.05] rounded-xl text-white"
      >
        <Table className="text-white">
          <TableHeader className="bg-white/[0.02] backdrop-blur-sm border-white/[0.05] rounded-xl text-white">
            <TableRow className="border-white/[0.08] hover:bg-white/[0.02]">
              <TableHead>Ticket ID</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Holder</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="border-white/[0.08] hover:bg-white/[0.02]"
              >
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.event}</TableCell>
                <TableCell>{ticket.type}</TableCell>
                <TableCell>{ticket.holder}</TableCell>
                <TableCell>
                  {new Date(ticket.purchaseDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      ticket.status === "valid"
                        ? "bg-green-100 text-green-700"
                        : ticket.status === "used"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ticket.status.charAt(0).toUpperCase() +
                      ticket.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{ticket.price}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
