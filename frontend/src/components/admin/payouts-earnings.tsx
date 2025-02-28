"use client";

import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Download } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for charts
const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const payoutData = [
  { name: "Jan", value: 3500 },
  { name: "Feb", value: 2800 },
  { name: "Mar", value: 4500 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 5500 },
  { name: "Jun", value: 5000 },
];

interface PayoutsEarningsProps {
  data?: {
    totalEarnings: number;
    pendingPayouts: number;
    completedPayouts: number;
    transactions: Array<{
      id: string;
      date: string;
      type: string;
      amount: number;
      status: string;
    }>;
  };
}

export default function PayoutsEarnings({ data }: PayoutsEarningsProps) {
  const defaultData = {
    totalEarnings: 125000,
    pendingPayouts: 15000,
    completedPayouts: 110000,
    transactions: [
      {
        id: "1",
        date: "2024-02-27",
        type: "Primary Sale",
        amount: 5000,
        status: "completed",
      },
      {
        id: "2",
        date: "2024-02-26",
        type: "Secondary Sale",
        amount: 2500,
        status: "completed",
      },
      {
        id: "3",
        date: "2024-02-25",
        type: "Royalty",
        amount: 750,
        status: "pending",
      },
    ],
  };

  const finalData = data || defaultData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white"
    >
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border-white/[0.05] transition-all hover:shadow-lg text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-rose-500/5 opacity-0    group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${finalData.totalEarnings.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
              <Progress
                value={
                  (finalData.completedPayouts / finalData.totalEarnings) * 100
                }
                className="mt-4 h-2 bg-white/[0.05]"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border-white/[0.05] transition-all hover:shadow-lg text-white pb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payouts
              </CardTitle>
              <ArrowUpIcon className="h-4 w-4 text-rose-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${finalData.pendingPayouts.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                5 pending transactions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border-white/[0.05] transition-all hover:shadow-lg text-white pb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Payouts
              </CardTitle>
              <ArrowDownIcon className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${finalData.completedPayouts.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +10.5% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border-white/[0.05] text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-rose-500/5" />
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
            <CardDescription>
              View your earnings trends and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="earnings" className="space-y-4">
              <TabsList className="bg-white/[0.05] border-white/[0.05]">
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
              </TabsList>
              <TabsContent value="earnings">
                <div className="h-[350px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient
                          id="colorEarnings"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="rgb(99, 102, 241)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="rgb(99, 102, 241)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-white/10"
                      />
                      <XAxis dataKey="name" stroke="white" opacity={0.5} />
                      <YAxis stroke="white" opacity={0.5} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="rgb(99, 102, 241)"
                        fillOpacity={1}
                        fill="url(#colorEarnings)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="payouts">
                <div className="h-[350px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={payoutData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-white/10"
                      />
                      <XAxis dataKey="name" stroke="white" opacity={0.5} />
                      <YAxis stroke="white" opacity={0.5} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="rgb(99, 102, 241)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border-white/[0.05] text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-indigo-500/5" />
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                A list of your recent transactions and their status
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/[0.05] border-white/[0.05]"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-white/[0.02] border-white/[0.05]">
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalData.transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-white/[0.02] border-white/[0.05]"
                  >
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>
                      ${transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
