"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SearchNav() {
  const pathname = usePathname();
  return (
    <Link
      href="/search"
      className={`${pathname === "/search" ? "text-[#ffffff]" : "text-[#909098]"} flex w-full flex-col items-center gap-x-2 gap-y-1 rounded-md p-2 hover:bg-[#31353f] lg:px-4 2xl:w-full 2xl:flex-row`}
    >
      <Search
        fill={`${pathname === "/search" ? "#ffffff" : "#1f1f21"}`}
        size={28}
        strokeWidth={`${pathname === "/search" ? 2.5 : 2}`}
        absoluteStrokeWidth
        className="duration-150 ease-in-out"
      />
      <p className="hidden font-medium xl:block xl:text-xs 2xl:text-base">
        Search
      </p>
    </Link>
  );
}
