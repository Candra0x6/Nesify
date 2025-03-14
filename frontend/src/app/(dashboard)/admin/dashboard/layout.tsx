"use client";

import DashboardLayout, {
  SidebarMenuType,
} from "@/components/dashboard-wrap/dashboard-layout";
import React from "react";
import {
  LayoutDashboard,
  TicketIcon,
  CalendarCog,
  CreditCardIcon,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const account = useActiveAccount();

  if (!account?.address) {
    redirect("/");
  }
  if (!user) {
    return redirect("/");
  }

  if (user.role !== "ADMIN") {
    return redirect("/user/dashboard");
  }

  return (
    <DashboardLayout sidebarMenus={sidebarMenus}>
      <main className="p-4">{children}</main>
    </DashboardLayout>
  );
}

export default AdminLayout;

const sidebarMenus: SidebarMenuType[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
    isActive: true,
  },
  {
    title: "Events",
    icon: CalendarCog,
    path: "/admin/dashboard/events",
  },
  {
    title: "Tickets",
    icon: TicketIcon,
    path: "/admin/dashboard/tickets",
  },

  {
    title: "Payouts",
    icon: CreditCardIcon,
    path: "/admin/dashboard/payouts",
  },
];
