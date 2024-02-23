"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ProfileNav({
  clerkId,
  profileImg,
}: {
  clerkId: string;
  profileImg: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={`/profile/${clerkId}`}
      className={`${pathname === `/profile/${clerkId}` ? "text-[#ffffff]" : "text-[#909098]"} flex w-full flex-col items-center gap-x-2 gap-y-1 rounded-md p-2 hover:bg-[#31353f] lg:px-4 2xl:w-full 2xl:flex-row`}
    >
      <Avatar className="h-8 w-8 xl:-ml-[2px]">
        <AvatarImage className="object-cover" src={profileImg} />
        <AvatarFallback>
          <div className="relative h-8 w-8 rounded-full bg-[#909098]"></div>
        </AvatarFallback>
      </Avatar>
      <p className="hidden font-medium xl:block xl:text-xs 2xl:text-base">
        Profile
      </p>
    </Link>
  );
}
