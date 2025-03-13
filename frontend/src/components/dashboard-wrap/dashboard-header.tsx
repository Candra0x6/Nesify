import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Bell } from "lucide-react";
import SignButton from "../elements/sign-button";

function DashboardHeader({ pathname }: { pathname: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 backdrop-blur-md bg-[#030303]/70 border-b border-white/[0.08]">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-white/60 hover:text-white" />
        <h1 className="text-xl font-medium text-white ml-2">{pathname}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/[0.05]">
          <Bell className="h-5 w-5 text-white/60" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2">
          <SignButton />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
