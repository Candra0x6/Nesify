"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LucideIcon,
  StoreIcon,
  TicketIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/services/api/auth";
import toast from "react-hot-toast";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}
const navItems = [
  { name: "Home", url: "/", icon: HomeIcon },
  { name: "Marketplace", url: "/marketplace", icon: StoreIcon },
  { name: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
  { name: "Events", url: "/events", icon: CalendarIcon },
  { name: "Tickets", url: "/tickets", icon: TicketIcon },
];

const client = createThirdwebClient({
  clientId: "ab39788a6d6e079e925823fd98c0470b" as string,
});

export function NavMenu({ items = navItems, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (address: string) => {
      const response = await signup(address);
      if (response.status === 200) {
        return response;
      }
      throw new Error(response.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      console.log("signup success!", data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("signup error!", error);
    },
  });

  const logout = async () => {
    console.log("logging out!");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-white/[0.2] text-primary"
              )}
            >
              {!isMobile ? (
                <span className="text-white">{item.name}</span>
              ) : (
                <Icon size={18} strokeWidth={2.5} />
              )}
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/[0.03] rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: isMobile ? 200 : 300,
                    damping: isMobile ? 20 : 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white shadow-white shadow-2xl rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
        <ConnectButton
          client={client}
          auth={{
            isLoggedIn: async (address) => {
              console.log("checking if logged in!", address);
              return true;
            },
            doLogin: async (params) => {
              const data = await mutateAsync(params.payload.address);

              console.log("login success!", data);
            },
            getLoginPayload: async ({ address }) => {
              return {
                domain: "tubelight.xyz",
                address,
                statement: "Sign in to Tubelight",
                version: "1",
                nonce: "1234567890",
                issued_at: new Date().toISOString(),
                expiration_time: new Date(
                  Date.now() + 1000 * 60 * 60 * 24
                ).toISOString(),
                invalid_before: new Date(
                  Date.now() - 1000 * 60 * 60 * 24
                ).toISOString(),
              };
            },
            doLogout: async () => {
              console.log("logging out!");
              await logout();
            },
          }}
        />
      </div>
    </div>
  );
}
