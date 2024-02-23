"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { X } from "lucide-react";

interface UserFollow {
  user: {
    username: string;
    name: string;
    image_url: string;
    _id: string;
    clerk_id: string;
  };
  timestamp: string;
}

interface Props {
  userFollow: UserFollow[];
  text: string;
}

export default function FollowInfo({ userFollow, text }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex flex-col items-center gap-x-1 duration-100 ease-in-out hover:text-white sm:flex-row">
          <p>{userFollow.length}</p> <p>{text}</p>
        </button>
      </DialogTrigger>
      <DialogContent className="h-fit max-h-[70vh] w-full border-[#414853] bg-[#1f1f23] p-10 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="">{text}</DialogTitle>
        </DialogHeader>
        <div className="divide-w-border grid h-fit max-h-[55vh] divide-y overflow-y-auto">
          {userFollow.length ? (
            <>
              {userFollow.map((data) => (
                <Link
                  href={`/profile/${data.user.clerk_id}`}
                  className="hover:bg-m-second-hover flex gap-x-2"
                  key={data.user._id}
                >
                  <div className="py-3 pl-5">
                    <Avatar className="h-11 w-11">
                      <AvatarImage
                        className="object-cover"
                        src={data.user.image_url}
                      />
                      <AvatarFallback>
                        <div className="relative h-11 w-11 rounded-full bg-gray-600"></div>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-full pr-5 pt-3">
                    <p className="font-bold">{data.user.name}</p>
                    <p className="text-sm leading-none text-gray-500">
                      @{data.user.username}
                    </p>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <p className="text-center">0 {text} User</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer dismissible={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="inline-flex flex-col items-center gap-x-1 duration-100 ease-in-out hover:text-white sm:flex-row">
          <p>{userFollow.length}</p> <p>{text}</p>
        </button>
      </DrawerTrigger>
      <DrawerContent className="border-[#414853] bg-[#1f1f23] p-8">
        <DrawerHeader className="flex justify-between p-0">
          <DrawerTitle>{text}</DrawerTitle>
          <DrawerClose>
            <X />
          </DrawerClose>
        </DrawerHeader>
        <div className="divide-w-border mt-5 grid h-full max-h-[60vh] divide-y overflow-y-auto text-left">
          {userFollow.length ? (
            <>
              {userFollow.map((data) => (
                <Link
                  href={`/profile/${data.user.clerk_id}`}
                  className="hover:bg-m-second-hover flex gap-x-2"
                  key={data.user._id}
                >
                  <div className="py-3 pl-5">
                    <Avatar className="h-11 w-11">
                      <AvatarImage
                        className="object-cover"
                        src={data.user.image_url}
                      />
                      <AvatarFallback>
                        <div className="relative h-11 w-11 rounded-full bg-gray-600"></div>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-full pr-5 pt-3">
                    <p className="font-bold">{data.user.name}</p>
                    <p className="text-sm leading-none text-gray-500">
                      @{data.user.username}
                    </p>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <p className="text-center">0 {text} User</p>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
