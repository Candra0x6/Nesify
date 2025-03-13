"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Menu, X, LayoutDashboard } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { usePathname } from "next/navigation";
import SignButton from "./sign-button";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";

export default function NavMenu() {
  const account = useActiveAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Dashboard",
      href: `${
        user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"
      }`,
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: "Events",
      href: "/events",
      icon: <Calendar className="w-4 h-4" />,
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  account &&
    account.address &&
    localStorage.setItem("account", account.address);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`${
        pathname.includes("/admin/dashboard") ||
        pathname.includes("/user/dashboard")
          ? "hidden"
          : ""
      }  fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-[#030303]/80 backdrop-blur-md border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 w-full">
          {/* Logo */}
          <div className="flex w-full space-x-3">
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-between w-full">
              <div className="flex gap-2">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-lg"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      {link.icon}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
              <SignButton />
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Profile */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative"></div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 border-t border-white/[0.05]">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative p-3 rounded-lg text-sm flex items-center gap-3 transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-500/20 to-rose-500/20 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
                <SignButton />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
