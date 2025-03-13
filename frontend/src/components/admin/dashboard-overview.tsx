"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Ticket } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { getUserTickets } from "@/lib/services/api/ticket";
import { useUser } from "@/hooks/useUser";
import { getUserEvents } from "@/lib/services/contracts/events";

const recentActivities = [
  {
    id: 1,
    type: "purchase",
    event: "Summer Music Festival",
    user: "Alex Johnson",
    amount: "$150.00",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "resale",
    event: "Tech Conference 2024",
    user: "Maria Garcia",
    amount: "$75.00",
    time: "15 minutes ago",
  },
  // Add more activities...
];

export default function DashboardOverview() {
  const { user } = useUser();
  const { data: tickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getUserTickets(user?.id || ""),
  });
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () => getUserEvents(),
  });

  const totalTickets = tickets?.result?.length || 0;

  const totalEvents = events?.data?.length || 0;
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid gap-6 md:grid-cols-2 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tickets Sold
              </CardTitle>
              <Ticket className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTickets}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Events
              </CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="">
        <Card className="col-span-4 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-5 text-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest transactions and ticket sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-lg w-full mt-4 py-2 bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white text-sm transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        {activity.type === "purchase" ? (
                          <Ticket className="w-4 h-4 text-primary" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.event}</p>
                        <p className="text-xs text-muted-foreground">
                          by {activity.user}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{activity.amount}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
