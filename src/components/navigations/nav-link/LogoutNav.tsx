"use client";

import { LogOut } from "lucide-react";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogOutNav() {
  const router = useRouter();
  return (
    <SignedIn>
      <SignOutButton signOutCallback={() => router.push("/sign-in")}>
        <Link
          href="/"
          className="flex gap-x-2 rounded-md p-2 hover:bg-[#31353f] lg:px-4"
        >
          <LogOut size={22} strokeWidth={2} absoluteStrokeWidth />
          <p className="text-md font-medium">Logout</p>
        </Link>
      </SignOutButton>
    </SignedIn>
  );
}
