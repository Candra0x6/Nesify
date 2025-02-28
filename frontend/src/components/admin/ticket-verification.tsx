"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  QrCode,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";

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

export default function TicketVerification() {
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");
  const [searchQuery, setSearchQuery] = useState("");

  const handleVerification = () => {
    // Simulate verification process
    const isValid = Math.random() > 0.5;
    setVerificationStatus(isValid ? "valid" : "invalid");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Ticket Verification
          </h2>
          <p className="text-muted-foreground">
            Verify tickets and manage access control
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Verify Ticket</CardTitle>
            <CardDescription>
              Scan QR code or enter ticket ID manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="manual" className="space-y-4">
              <TabsList>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="qr">QR Scanner</TabsTrigger>
              </TabsList>
              <TabsContent value="manual" className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="ticketId">Ticket ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id="ticketId"
                      placeholder="Enter ticket ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button onClick={handleVerification}>
                      <Search className="h-4 w-4 mr-2" />
                      Verify
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="qr" className="space-y-4">
                <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed rounded-lg">
                  <QrCode className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Point your camera at the ticket&apos;s QR code
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {verificationStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Card
                  className={`border-2 ${
                    verificationStatus === "valid"
                      ? "border-green-500"
                      : "border-red-500"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      {verificationStatus === "valid" ? (
                        <>
                          <CheckCircle2 className="h-8 w-8 text-green-500" />
                          <div>
                            <h3 className="font-semibold text-green-500">
                              Valid Ticket
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Ticket ID: #123456
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-8 w-8 text-red-500" />
                          <div>
                            <h3 className="font-semibold text-red-500">
                              Invalid Ticket
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              This ticket is not valid or has already been used
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>Last 5 ticket verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                >
                  {i % 2 === 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">
                      Ticket #{Math.floor(Math.random() * 1000000)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Verified {Math.floor(Math.random() * 60)} minutes ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
