"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HomeNav() {
  const pathname = usePathname();
  return (
    <Link
      href="/home"
      className={`${pathname === "/home" ? "text-[#ffffff]" : "text-[#909098]"} flex w-full flex-col items-center gap-x-2 gap-y-1 rounded-md p-2 hover:bg-[#31353f] lg:px-4 2xl:w-full 2xl:flex-row`}
    >
      <Home
        fill={`${pathname === "/home" ? "#ffffff" : "#1f1f21"}`}
        size={28}
        strokeWidth={`${pathname === "/" ? 2.5 : 2}`}
        absoluteStrokeWidth
        className="duration-150 ease-in-out"
      />
      <p className="hidden font-medium xl:block xl:text-xs 2xl:text-base">
        Home
      </p>
    </Link>
  );
}
