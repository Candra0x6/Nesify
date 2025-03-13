"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, QrCode, Search, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useQuery } from "@tanstack/react-query";
import { getUserTickets } from "@/lib/services/api/ticket";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function TicketsPage() {
  const { user } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);

  const { data: tickets } = useQuery({
    queryKey: ["tickets", user?.id],
    queryFn: () => getUserTickets(user?.id || ""),
    enabled: !!user?.id,
  });

  // Function to check if a date is within the specified time range
  const isDateInRange = (
    date: Date | null | undefined,
    rangeInDays: number
  ): boolean => {
    if (!date) return false;

    const purchaseDate = new Date(date);
    const now = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = now.getTime() - purchaseDate.getTime();

    // Convert milliseconds to days
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    // Check if the date is within the range
    return daysDiff <= rangeInDays;
  };

  const filteredTickets = tickets?.result?.filter((ticket) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.eventId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.tokenId.toLowerCase().includes(searchQuery.toLowerCase());

    // Date filter
    let matchesDate = true;
    if (dateFilter) {
      const purchaseDate = ticket.purchaseDate
        ? new Date(ticket.purchaseDate)
        : null;

      switch (dateFilter) {
        case "1 week ago":
          matchesDate = isDateInRange(purchaseDate, 7);
          break;
        case "1 month ago":
          matchesDate = isDateInRange(purchaseDate, 30);
          break;
        case "3 months ago":
          matchesDate = isDateInRange(purchaseDate, 90);
          break;
        case "6 months ago":
          matchesDate = isDateInRange(purchaseDate, 180);
          break;
        default:
          matchesDate = true;
      }
    }

    return matchesSearch && matchesDate;
  });

  const totalTickets = tickets?.result?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted- ">
            Manage and verify tickets for all events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
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
            <div className="text-2xl font-bold">{totalTickets}</div>
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
        <Select
          value={dateFilter}
          onValueChange={(value: string) => setDateFilter(value)}
        >
          <SelectTrigger className="w-[180px] bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl text-white py-6">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <SelectItem value="1 week ago">Last week</SelectItem>
            <SelectItem value="1 month ago">Last month</SelectItem>
            <SelectItem value="3 months ago">Last 3 months</SelectItem>
            <SelectItem value="6 months ago">Last 6 months</SelectItem>
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
              <TableHead>Scan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets?.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="border-white/[0.08] hover:bg-white/[0.02]"
              >
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.eventId}</TableCell>
                <TableCell>{ticket.tokenId}</TableCell>
                <TableCell>{ticket.userId}</TableCell>
                <TableCell>
                  {ticket.purchaseDate
                    ? new Date(ticket.purchaseDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      ticket.validated
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ticket.validated ? "Valid" : "Invalid"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      router.push(`/admin/dashboard/tickets/${ticket.id}/scan`)
                    }
                    className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan Ticket
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {(!filteredTickets || filteredTickets.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No tickets found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
