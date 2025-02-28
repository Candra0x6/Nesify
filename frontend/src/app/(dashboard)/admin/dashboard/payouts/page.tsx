"use client";

import type React from "react";

import { useState } from "react";
import { Download } from "lucide-react";
import { DollarSign } from "lucide-react"; // Import DollarSign

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayoutsEarnings from "@/components/admin/payouts-earnings";

// Mock data for payouts
const payoutData = {
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

export default function PayoutsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdrawal logic
    console.log("Withdrawing:", withdrawAmount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Payouts & Earnings
          </h1>
          <p className="text-muted-foreground">
            Manage your earnings and withdraw funds
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white active:bg-white/[0.02] active:text-white">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PayoutsEarnings data={payoutData} />
        </TabsContent>

        <TabsContent value="withdraw">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Withdrawal Form */}
            <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] text-white">
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
                <CardDescription>
                  Transfer your earnings to your connected wallet or bank
                  account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdraw} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="pl-9 border-white/[0.05] focus:border-white/[0.05] active:border-white/[0.05] bg-transparent"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available balance: $
                      {payoutData.totalEarnings.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Withdrawal Method</Label>
                    <Select defaultValue="wallet">
                      <SelectTrigger className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl">
                        <SelectValue placeholder="Select withdrawal method" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
                        <SelectItem value="wallet">Connected Wallet</SelectItem>
                        <SelectItem value="bank">Bank Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full">
                    Withdraw Funds
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Connected Accounts */}
            <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] text-white">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage your withdrawal destinations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 bg-white/[0.03] backdrop-blur-sm border-white/[0.05]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Connected Wallet</p>
                        <p className="text-sm text-muted-foreground">
                          0x1234...5678
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/[0.05] border-white/[0.05]"
                    >
                      Change
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-white/[0.03] backdrop-blur-sm border-white/[0.05]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-muted-foreground">
                          ****1234
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/[0.05] border-white/[0.05]"
                    >
                      Change
                    </Button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-white/[0.05] border-white/[0.05] hover:bg-white/[0.03] hover:border-white/[0.05] hover:text-white"
                >
                  Add New Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] text-white">
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>
                Configure your payout preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Automatic Payouts</Label>
                <Select defaultValue="manual">
                  <SelectTrigger className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl">
                    <SelectValue placeholder="Select payout frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/70 backdrop-blur-sm border border-white/[0.05] rounded-xl text-white">
                    <SelectItem value="manual">Manual Withdrawals</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose how often you want to receive automatic payouts
                </p>
              </div>

              <div className="space-y-2">
                <Label>Minimum Payout Amount</Label>
                <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-xl">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="100.00"
                    className="pl-9 bg-transparent"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Minimum amount required for automatic payouts
                </p>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
