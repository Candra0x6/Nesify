"use client";

import DashboardLayout, {
  SidebarMenuType,
} from "@/components/dashboard-wrap/dashboard-layout";
import React from "react";
import {
  LayoutDashboard,
  NotepadText,
  LucideGift,
  WalletIcon,
  TicketIcon,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

function UserLayout({ children }: { children: React.ReactNode }) {
  const account = useActiveAccount();

  if (!account?.address) {
    redirect("/");
  }
  return (
    <DashboardLayout sidebarMenus={sidebarMenus}>{children}</DashboardLayout>
  );
}

export default UserLayout;

const sidebarMenus: SidebarMenuType[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/user/dashboard",
    isActive: true,
  },
  {
    title: "My Tickets",
    icon: TicketIcon,
    path: "/user/dashboard/tickets",
  },
  {
    title: "Missions",
    icon: NotepadText,
    path: "/user/dashboard/missions",
  },
  {
    title: "Rewards",
    icon: LucideGift,
    path: "/user/dashboard/rewards",
  },
  {
    title: "Wallets",
    icon: WalletIcon,
    path: "/user/dashboard/wallets",
  },
];
