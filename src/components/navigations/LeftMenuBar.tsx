import { MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import NavLink from "./NavLink";
import MoreNav from "./nav-link/MoreNav";

export default function LeftMenuBar() {
  return (
    <div className="sticky left-0 top-0 z-10 hidden h-screen w-fit flex-col justify-between border-r px-3 py-5 sm:flex 2xl:w-60 2xl:py-7">
      <div className="flex flex-col items-center gap-y-20 xl:items-start">
        <Link
          href="#"
          className="flex w-full flex-col items-center gap-x-2 gap-y-1 rounded-md p-2 hover:bg-[#31353f] lg:px-4 2xl:w-full 2xl:flex-row"
        >
          <MessageSquareHeart size={30} strokeWidth={2} absoluteStrokeWidth />
          <p className="mb-1 hidden text-xl font-bold 2xl:block">ChipiChat</p>
        </Link>
        <div className="flex w-full flex-col items-center gap-y-4 xl:items-start">
          <NavLink />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3 xl:items-start">
        <MoreNav />
      </div>
    </div>
  );
}
