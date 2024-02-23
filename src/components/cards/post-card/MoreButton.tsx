"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { MoreVertical, Trash, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from "next/navigation";
import DeletePostButton from "./DeletePostButton";

export default function MoreButton({ postId }: { postId: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  return isDesktop ? (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="h-fit w-fit">
        <button className="h-fit w-fit">
          <MoreVertical
            size={20}
            strokeWidth={2}
            absoluteStrokeWidth
            className="duration-150 ease-in-out"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-2 border-[#414853] bg-[#1f1f23] p-0"
        side="left"
      >
        <DeletePostButton
          path={pathname}
          postId={postId}
          onMoreButtonOpen={setOpen}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Drawer dismissible={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="h-fit w-fit">
          <MoreVertical
            size={20}
            strokeWidth={2}
            absoluteStrokeWidth
            className="duration-150 ease-in-out"
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#1f1f23] p-8">
        <DrawerHeader className="mb-5 flex justify-between p-0">
          <DrawerTitle>More</DrawerTitle>
          <DrawerClose>
            <X />
          </DrawerClose>
        </DrawerHeader>
        <DeletePostButton
          path={pathname}
          postId={postId}
          onMoreButtonOpen={setOpen}
        />
      </DrawerContent>
    </Drawer>
  );
  null;
}
