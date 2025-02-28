"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  Ticket,
  Users,
} from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const pieData = [
  { name: "General", value: 400, color: "#FF8042" },
  { name: "VIP", value: 300, color: "#00C49F" },
  { name: "Early Bird", value: 300, color: "#FFBB28" },
];

export default function DashboardOverview() {
  //return (
  //<div className="w-full">
  //<motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
  //{/* Header */}
  //<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
  //<div>
  //<h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Overview</h1>
  //<p className="text-gray-400 mt-1">Monitor your events and ticket sales</p>
  //</div>
  //<div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-xl rounded-lg p-1 border border-gray-800">
  //{["24h", "7d", "30d", "90d", "All"].map((range) => (
  //<button
  //key={range}
  //onClick={() => setTimeRange(range)}
  //className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
  //timeRange === range
  //? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
  //: "text-gray-400 hover:text-white"
  //}`}
  //>
  //{range}
  //</button>
  //))}
  //</div>
  //</div>

  //{/* Stats Grid */}
  //<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  //<StatCard
  //title="Total Tickets Sold"
  //value="1,248"
  //icon={<Ticket size={20} />}
  //change="12.5% ↑"
  //positive={true}
  ///>
  //<StatCard
  //title="Revenue Generated"
  //value="$42,580"
  //icon={<DollarSign size={20} />}
  //change="8.3% ↑"
  //positive={true}
  ///>
  //<StatCard
  //title="Resale Activity"
  //value="126"
  //icon={<RefreshCw size={20} />}
  //change="3.2% ↑"
  //positive={true}
  ///>
  //<StatCard
  //title="Royalties Earned"
  //value="$3,842"
  //icon={<BarChart3 size={20} />}
  //change="5.7% ↓"
  //positive={false}
  ///>
  //</div>

  //{/* Events and Activity Section */}
  //<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //{/* Events Section */}
  //<div className="lg:col-span-2 space-y-4">
  //<div className="flex justify-between items-center">
  //<h2 className="text-xl font-semibold text-white">Your Events</h2>
  //<Link href="/admin/events">
  //<button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
  //</Link>
  //</div>

  //<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //<EventCard
  //id="1"
  //name="Summer Music Festival"
  //date="Jun 15, 2023 • 2:00 PM"
  //ticketsSold={850}
  //totalTickets={1000}
  //revenue="$25,500"
  //status="upcoming"
  ///>
  //<EventCard
  //id="2"
  //name="Tech Conference 2023"
  //date="May 10, 2023 • 9:00 AM"
  //ticketsSold={425}
  //totalTickets={500}
  //revenue="$12,750"
  //status="live"
  ///>
  //<EventCard
  //id="3"
  //name="Art Exhibition"
  //date="Apr 22, 2023 • 10:00 AM"
  //ticketsSold={180}
  //totalTickets={200}
  //revenue="$5,400"
  //status="past"
  ///>
  //<EventCard
  //id="4"
  //name="Blockchain Summit"
  //date="Mar 15, 2023 • 1:00 PM"
  //ticketsSold={320}
  //totalTickets={350}
  //revenue="$9,600"
  //status="past"
  ///>
  //</div>
  //</div>

  //{/* Activity Section */}
  //<div className="space-y-4">
  //<div className="flex justify-between items-center">
  //<h2 className="text-xl font-semibold text-white">Recent Activity</h2>
  //<button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
  //</div>

  //<div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800">
  //<ActivityItem
  //type="Ticket Purchase"
  //event="Summer Music Festival"
  //time="10 minutes ago"
  //details="User 0x7a...3f4d purchased 2 VIP tickets"
  //icon={<Ticket size={18} />}
  ///>
  //<ActivityItem
  //type="Ticket Resale"
  //event="Tech Conference 2023"
  //time="45 minutes ago"
  //details="User 0x3b...9c2e resold 1 ticket for $350"
  //icon={<RefreshCw size={18} />}
  ///>
  //<ActivityItem
  //type="Payout Completed"
  //event="Art Exhibition"
  //time="2 hours ago"
  //details="$4,320 transferred to your wallet"
  //icon={<DollarSign size={18} />}
  ///>
  //<ActivityItem
  //type="New Attendees"
  //event="Blockchain Summit"
  //time="5 hours ago"
  //details="15 new attendees registered"
  //icon={<Users size={18} />}
  ///>
  //<ActivityItem
  //type="Event Reminder"
  //event="Tech Conference 2023"
  //time="6 hours ago"
  //details="Your event starts in 24 hours"
  //icon={<Clock size={18} />}
  ///>
  //</div>
  //</div>
  //</div>
  //</motion.div>
  //</div>
  //)
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
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
          <Card className="relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Tickets Sold
              </CardTitle>
              <Ticket className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,345</div>
              <p className="text-xs text-muted-foreground">
                +15% from last week
              </p>
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
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 ending soon</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +8.1% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
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

        <Card className="col-span-3 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-5 text-white">
          <CardHeader>
            <CardTitle>Ticket Distribution</CardTitle>
            <CardDescription>Breakdown by ticket type</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute bottom-6 flex flex-col gap-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
