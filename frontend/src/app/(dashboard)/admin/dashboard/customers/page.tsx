"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for customers
const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    ticketsPurchased: 5,
    totalSpent: "$450.00",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 891",
    ticketsPurchased: 3,
    totalSpent: "$275.00",
    joinDate: "2024-02-01",
    avatar: "/placeholder.svg",
  },
  // Add more customers...
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Button
            variant="outline"
            className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white hover:bg-white/[0.03] hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
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
              <TableHead>Customer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Tickets Purchased</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Join Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                className="border-white/[0.08] hover:bg-white/[0.02]"
              >
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.ticketsPurchased}</TableCell>
                <TableCell>{customer.totalSpent}</TableCell>
                <TableCell>
                  {new Date(customer.joinDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
