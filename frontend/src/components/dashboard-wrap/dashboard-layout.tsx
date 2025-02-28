"use client";

import type React from "react";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { SidebarProvider } from "../ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardHeader from "./dashboard-header";

export type SidebarMenuType = {
  title: string;
  icon: React.ElementType;
  path: string;
  isActive?: boolean;
};

export default function DashboardLayout({
  children,
  sidebarMenus,
}: {
  children: React.ReactNode;
  sidebarMenus: SidebarMenuType[];
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const pathname = "Dashboard";
  return (
    <div className="relative min-h-screen w-full bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex h-screen"
      >
        <SidebarProvider>
          <DashboardSidebar sidebarMenus={sidebarMenus} />
          <div className="flex-1 overflow-auto">
            <DashboardHeader pathname={pathname} />
            {children}
          </div>
        </SidebarProvider>
      </motion.div>
    </div>
  );
}
