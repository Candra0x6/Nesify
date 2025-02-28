"use client";

import DashboardLayout, {
  SidebarMenuType,
} from "@/components/dashboard-wrap/dashboard-layout";
import React from "react";
import {
  LayoutDashboard,
  TicketIcon,
  CalendarCog,
  Users,
  CreditCardIcon,
} from "lucide-react";

function AdminLayout({ children }: { children: React.ReactNode }) {
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
    title: "Customers",
    icon: Users,
    path: "/admin/dashboard/customers",
  },
  {
    title: "Payouts",
    icon: CreditCardIcon,
    path: "/admin/dashboard/payouts",
  },
];
