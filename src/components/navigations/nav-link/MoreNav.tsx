"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { BarChart2, Info, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import LogOutNav from "./LogoutNav";

export default function MoreNav() {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    setOpen(false);
  }, [isDesktop]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none sm:w-full">
        <div className="inline-flex flex-col items-center gap-x-2 gap-y-1 rounded-md p-2 hover:bg-[#31353f] lg:px-4 2xl:w-full 2xl:flex-row">
          <BarChart2
            size={28}
            strokeWidth={2}
            absoluteStrokeWidth
            className="rotate-[270deg] sm:rotate-90"
          />
          <p className="hidden font-medium xl:block xl:text-xs 2xl:text-base">
            More
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className={`${isDesktop ? "ml-5 lg:ml-7 2xl:ml-3" : "mr-9"} w-48 space-y-1 border-gray-600 bg-[#1f1f23]`}
      >
        <LogOutNav />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
