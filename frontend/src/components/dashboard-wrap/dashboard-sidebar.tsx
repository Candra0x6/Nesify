"use client";

import Image from "next/image";
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
import { LogOut } from "lucide-react";
import { SidebarMenuType } from "./dashboard-layout";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardSidebar({
  sidebarMenus,
}: {
  sidebarMenus: SidebarMenuType[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" className="border-r bg border-white/[0.08]  ">
      <SidebarHeader className="p-4 ">
        <Link
          href="/"
          className="flex items-center gap-2 border-white/[0.05] border-r pr-4"
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src={"/images/logo.jpg"}
              alt="NFT Tickets"
              width={500}
              height={500}
              className="rounded-full"
            />
          </div>
          <div className="text-lg md:text-xl font-bold bg-clip-text text-white ">
            Nesify
          </div>
        </Link>
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
                    isActive={pathname === item.path}
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
