"use client";

import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export default function DashboardContent() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative h-full w-full overflow-auto">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 backdrop-blur-md bg-[#030303]/70 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-white/60 hover:text-white" />
          <h1 className="text-xl font-medium text-white ml-2">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-white/[0.05]">
            <Bell className="h-5 w-5 text-white/60" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <motion.div
          custom={0}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-white">
            Welcome back,{" "}
            <span
              className={cn(
                "text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-rose-300",
                pacifico.className
              )}
            >
              Alex
            </span>
          </h2>
          <p className="text-white/40 mt-1">
            Here's what's happening with your projects today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              title: "Total Users",
              value: "2,543",
              change: "+12.5%",
              color: "from-indigo-500 to-blue-500",
            },
            {
              title: "Revenue",
              value: "$12,765",
              change: "+8.2%",
              color: "from-emerald-500 to-teal-500",
            },
            {
              title: "Active Projects",
              value: "24",
              change: "+3",
              color: "from-amber-500 to-orange-500",
            },
            {
              title: "Conversion Rate",
              value: "3.6%",
              change: "+0.8%",
              color: "from-rose-500 to-pink-500",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              custom={index + 1}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white/60 text-sm">{card.title}</h3>
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${card.color} opacity-80`}
                ></div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="text-emerald-400 text-sm mt-1">{card.change}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            custom={5}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm lg:col-span-2"
          >
            <h3 className="text-white font-medium mb-4">
              Performance Overview
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="text-white/40 text-sm">
                Chart visualization goes here
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={6}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm"
          >
            <h3 className="text-white font-medium mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { title: "New user registered", time: "2 minutes ago" },
                { title: "Meeting scheduled", time: "1 hour ago" },
                { title: "Project deadline updated", time: "3 hours ago" },
                { title: "Task completed", time: "Yesterday" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5"></div>
                  <div>
                    <p className="text-white text-sm">{activity.title}</p>
                    <p className="text-white/40 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
