"use client";

import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogOut, Search } from "lucide-react";
import { SidebarMenuType } from "./dashboard-layout";
import { useRouter } from "next/navigation";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export default function DashboardSidebar({
  sidebarMenus,
}: {
  sidebarMenus: SidebarMenuType[];
}) {
  const router = useRouter();
  return (
    <Sidebar variant="floating" className="border-r border-white/[0.08]  ">
      <SidebarHeader className="p-4 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-2"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500">
            <Image
              src="https://kokonutui.com/logo.svg"
              alt="Kokonut UI"
              width={20}
              height={20}
            />
          </div>
          <span className={cn("text-xl text-white", pacifico.className)}>
            Kokonut
          </span>
        </motion.div>

        <div className="mt-6 flex items-center gap-2 px-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-full py-2 pl-10 pr-4 text-sm text-white/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-white/40">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenus.map((item) => (
                <SidebarMenuItem
                  onClick={() => router.push(item.path)}
                  key={item.title}
                >
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className="text-white/60 hover:text-white data-[active=true]:bg-white/[0.08] data-[active=true]:text-white"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-white/60 hover:text-white">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
