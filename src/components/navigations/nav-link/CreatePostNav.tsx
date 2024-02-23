"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { MessageSquareDiff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostForm from "@/components/forms/PostForm";

export default function CreatePostNav({
  userId,
  username,
  name,
  profileImg,
}: {
  userId: string;
  username: string;
  name: string;
  profileImg: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full flex-col items-center gap-x-2 gap-y-1 rounded-md p-2 text-[#909098] hover:bg-[#31353f] lg:px-4 2xl:w-full 2xl:flex-row"
      >
        <MessageSquareDiff
          size={28}
          strokeWidth={2}
          absoluteStrokeWidth
          className="duration-150 ease-in-out"
        />

        <p className="hidden font-medium xl:block xl:text-xs 2xl:text-base">
          Create
        </p>
      </button>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="h-fit w-full bg-[#1f1f23] p-10 sm:max-h-[70vh] sm:max-w-xl xl:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="mb-1">New Post</DialogTitle>
              <div className="inline-flex gap-x-2">
                <div className="py-3">
                  <Avatar className="h-11 w-11">
                    <AvatarImage className="object-cover" src={profileImg} />
                    <AvatarFallback>
                      <div className="bg-w-background-third relative h-11 w-11 rounded-full"></div>
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="w-full pt-3 text-sm">
                  <p className="font-bold">{name}</p>
                  <p className="text-w-text-secondary">@{username}</p>
                </div>
              </div>
            </DialogHeader>
            <PostForm userId={userId} openChange={setOpen} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-[90vh] w-full bg-[#1f1f23] p-5">
            <DrawerHeader>
              <DrawerTitle className="my-2">New Post</DrawerTitle>
              <div className="inline-flex gap-x-2">
                <div className="py-3">
                  <Avatar className="h-11 w-11">
                    <AvatarImage className="object-cover" src={profileImg} />
                    <AvatarFallback>
                      <div className="relative h-11 w-11 rounded-full bg-gray-600"></div>
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="pt-3 text-start text-sm">
                  <p className="font-bold">{name}</p>
                  <p className="text-w-text-secondary">@{username}</p>
                </div>
              </div>
            </DrawerHeader>
            <PostForm userId={userId} openChange={setOpen} />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
