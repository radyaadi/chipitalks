import React from "react";
import BrandLogo from "./BrandLogo";
import { SignedIn } from "@clerk/nextjs";
import MoreNav from "../navigations/nav-link/MoreNav";

export default function TopBar() {
  return (
    <nav className="flex items-center justify-between px-7 py-2 sm:px-9 lg:px-14 lg:py-3">
      <BrandLogo />
      <SignedIn>
        <MoreNav />
      </SignedIn>
    </nav>
  );
}
