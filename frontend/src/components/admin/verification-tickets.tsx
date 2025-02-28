"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  QrCode,
  Search,
  Ticket,
  X,
} from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for recent verifications
const recentVerifications = [
  {
    id: "1",
    ticketId: "TICKET-001",
    event: "Summer Music Festival",
    verifiedAt: new Date().toISOString(),
    status: "valid",
    holder: "John Doe",
  },
  {
    id: "2",
    ticketId: "TICKET-002",
    event: "Tech Conference",
    verifiedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    status: "invalid",
    holder: "Jane Smith",
  },
  // Add more verifications...
];

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState("scan");
  const [searchQuery, setSearchQuery] = useState("");
  const [verificationResult, setVerificationResult] = useState<{
    status: "valid" | "invalid" | null;
    message: string;
  }>({ status: null, message: "" });

  const handleManualVerification = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate ticket verification
    const isValid = Math.random() > 0.5;
    setVerificationResult({
      status: isValid ? "valid" : "invalid",
      message: isValid
        ? "Ticket verified successfully"
        : "Invalid or already used ticket",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Ticket Verification
        </h1>
        <p className="text-muted-foreground">
          Scan and verify tickets at your events
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Scans
            </CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">24 in the last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid Tickets</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">91% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Invalid Attempts
            </CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">9% of total scans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Events in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Verification Interface */}
        <Card>
          <CardHeader>
            <CardTitle>Verify Tickets</CardTitle>
            <CardDescription>
              Scan QR codes or enter ticket IDs manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="scan">QR Scanner</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>

              <TabsContent value="scan" className="space-y-4">
                <div className="aspect-square max-w-md mx-auto border-2 border-dashed rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Point your camera at the ticket&apos;s QR code
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="manual">
                <form onSubmit={handleManualVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ticket ID</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter ticket ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <Button type="submit">Verify Ticket</Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Verification Result */}
            {verificationResult.status && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-lg border ${
                  verificationResult.status === "valid"
                    ? "bg-green-500/10 border-green-500/20 text-green-500"
                    : "bg-red-500/10 border-red-500/20 text-red-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  {verificationResult.status === "valid" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <p className="font-medium">{verificationResult.message}</p>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Recent Verifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>
              Latest ticket verification attempts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVerifications.map((verification) => (
                <div
                  key={verification.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      verification.status === "valid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {verification.ticketId}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{verification.event}</span>
                      <span>•</span>
                      <span>{verification.holder}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(verification.verifiedAt).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
