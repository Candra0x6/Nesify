"use client";

import type React from "react";
import { type ReactNode } from "react";
import {
  Calendar,
  Image,
  Ticket,
  MapPin,
  Users,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Lightbulb,
  AlertCircle,
  Star,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/services/api";
import toast from "react-hot-toast";

interface GuideStep {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  tips: string[];
  content: ReactNode;
}

export default function NFTCreationGuide() {
  const { user } = useUser();
  const router = useRouter();
  const { mutate: updateUserRole } = useMutation({
    mutationFn: () =>
      updateUser(user?.id as string, {
        role: "ADMIN",
      }),
    onSuccess: () => {
      router.push("/admin/dashboard/events/create");
    },
    onError: () => {
      toast.error("Failed to update user role");
    },
  });
  const guideSteps: GuideStep[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      description:
        "Learn the basics of creating successful NFTs on our platform.",
      tips: [
        "Have all your NFT details ready before starting",
        "High-quality images increase NFT value by up to 35%",
        "Clear, concise descriptions perform better",
      ],
      content: (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden">
              <h3 className="text-lg font-semibold mb-3 flex items-center text-white">
                <CheckCircle2 className="mr-2 h-5 w-5 text-emerald-400" />
                Before You Begin
              </h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    Prepare a compelling NFT title (max 60 characters)
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    Gather high-resolution images (1200×630px recommended)
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Draft a detailed NFT description</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Determine the NFT collection and its theme</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden">
              <h3 className="text-lg font-semibold mb-3 flex items-center text-white">
                <Lightbulb className="mr-2 h-5 w-5 text-amber-400" />
                Platform Benefits
              </h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-rose-400 shrink-0 mt-0.5" />
                  <span>Blockchain-verified NFTs reduce fraud by 99%</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    Smart contracts ensure transparent revenue distribution
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-rose-400 shrink-0 mt-0.5" />
                  <span>Real-time analytics for NFT sales and engagement</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-2 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    Secondary market control with royalties on resales
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: "event-details",
      title: "NFT Details",
      icon: Calendar,
      description:
        "Learn how to craft compelling NFT information that attracts buyers.",
      tips: [
        "Use action-oriented language in your title",
        "Include searchable keywords in your description",
        "Be specific about what the NFT represents",
      ],
      content: (
        <div className="space-y-6">
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Crafting Your NFT Details
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <Calendar className="h-5 w-5 mr-2 text-white" />
                    NFT Title & Collection
                  </h4>
                  <p className="text-sm text-white/70">
                    Your title should be clear, compelling, and include key
                    information like artist name or NFT type. Choose a
                    collection name that reflects the theme or series of your
                    NFTs.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <MapPin className="h-5 w-5 mr-2 text-rose-400" />
                    Collection Details
                  </h4>
                  <p className="text-sm text-white/70">
                    Include complete collection information, including the
                    creator&apos;s name and any relevant background story.
                  </p>
                </div>
              </div>

              <div className="space-y-4 grid grid-rows-2">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image className="h-5 w-5 mr-2 text-emerald-400" />
                    Visual Content
                  </h4>
                  <p className="text-sm text-white/70">
                    Upload high-resolution images (1200×630px) that capture the
                    essence of your NFT. High-quality images increase NFT value
                    and attractiveness.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <Users className="h-5 w-5 mr-2 text-amber-400" />
                    Target Audience
                  </h4>
                  <p className="text-sm text-white/70">
                    Clearly define who your NFT is for. This helps with
                    marketing and ensures the right buyers discover your NFT.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/80">
                  <span className="font-medium">Pro Tip:</span> NFTs with
                  complete details are 3x more likely to sell. Take time to fill
                  out every field in the form, even optional ones.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm text-white/90">
                Example of a well-completed NFT details form
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ticket-setup",
      title: "NFT Setup",
      icon: Ticket,
      description:
        "Configure different NFT types, pricing tiers, and special offers.",
      tips: [
        "Offer early bird pricing to drive initial sales",
        "Create VIP tiers with exclusive benefits",
        "Set inventory limits to create scarcity",
      ],
      content: (
        <div className="space-y-6">
          <Tabs defaultValue="blockchain-benefits" className="w-full">
            <TabsList className="grid grid-cols-1 text-white mb-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl">
              <TabsTrigger className="text-white" value="blockchain-benefits">
                <h1 className="text-white">Blockchain Benefits</h1>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blockchain-benefits" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] p-6 text-white">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-amber-400" />
                    Benefits for Creators
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">
                          Secondary Market Royalties
                        </span>
                        <p className="text-sm text-white/70">
                          Earn 5-10% on every resale transaction automatically
                          through smart contracts
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Fraud Prevention</span>
                        <p className="text-sm text-white/70">
                          Eliminate counterfeit NFTs with blockchain
                          verification
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Instant Settlement</span>
                        <p className="text-sm text-white/70">
                          Receive funds immediately after sales without payment
                          processor delays
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Sales Tracking</span>
                        <p className="text-sm text-white/70">
                          Real-time verification and analytics on NFT sales
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] p-6 text-white">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    Benefits for Buyers
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">
                          Ownership & Transferability
                        </span>
                        <p className="text-sm text-white/70">
                          Easily transfer or resell NFTs with complete security
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Collectible Value</span>
                        <p className="text-sm text-white/70">
                          NFT retains value as digital memorabilia after the
                          event
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Exclusive Benefits</span>
                        <p className="text-sm text-white/70">
                          Access to special content, future discounts, and
                          community perks
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Transparent Pricing</span>
                        <p className="text-sm text-white/70">
                          Clear view of original price and fair market value
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-20">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="getting-started" className="w-full">
          <div className="grid md:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Navigation */}
            <div className="space-y-4">
              <motion.div
                className="h-[80%]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden text-white p-4 sticky top-24 h-full">
                  <h2 className="text-xl font-semibold mb-4">Guide Sections</h2>
                  <TabsList className="flex flex-col h-auto bg-transparent p-0 space-y-1">
                    {guideSteps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <TabsTrigger
                          value={step.id}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left justify-start h-auto data-[state=active]:bg-[#6366f1] data-[state=active]:text-white data-[state=active]:shadow-none data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/70"
                        >
                          <step.icon className="h-5 w-5 shrink-0" />
                          <span>{step.title}</span>
                        </TabsTrigger>
                      </motion.div>
                    ))}
                  </TabsList>
                </Card>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {guideSteps.map((step) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                    }}
                  >
                    <TabsContent value={step.id} className="mt-0 space-y-4">
                      <motion.div
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div
                          className="h-10 w-10 rounded-full bg-primary flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <step.icon className="h-5 w-5 text-white" />
                        </motion.div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                          {step.title}
                        </h2>
                      </motion.div>

                      <motion.p
                        className="text-lg text-white/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {step.description}
                      </motion.p>

                      {/* Tips Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Card className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl overflow-hidden p-4">
                          <h3 className="font-semibold flex items-center text-white mb-3">
                            <Lightbulb className="h-5 w-5 mr-2 text-amber-400" />
                            Quick Tips
                          </h3>
                          <ul className="space-y-2">
                            {step.tips.map((tip, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                              >
                                <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-white/80">{tip}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </Card>
                      </motion.div>

                      {/* Main Content */}
                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {step.content}
                      </motion.div>
                    </TabsContent>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full px-4 md:px-6 relative z-10 mb-8"
      >
        <div className="w-full mx-auto bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join the Future of Ticketing
            </h2>

            <p className="text-white/40 max-w-2xl mx-auto">
              Whether you&apos;re an event organizer, artist, or attendee, our
              NFT ticketing platform offers unparalleled benefits. Get started
              today and experience the revolution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => updateUserRole()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-primary text-white font-medium"
            >
              Create Event Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
