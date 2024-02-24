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
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";
import UserProfileForm from "@/components/forms/UserProfileForm";

interface Props {
  clerkId: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  imageUrl: string;
}
export default function EditProfile({
  clerkId,
  email,
  username,
  name,
  bio,
  imageUrl,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const data = {
    clerkId: clerkId,
    email: email,
    username: username,
    name: name,
    bio: bio,
    imageUrl: imageUrl,
  };
  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Pencil className="h-4 w-4 sm:mr-2" />
              <p className="hidden sm:block">Edit Profile</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="over h-fit w-full border-[#414853] bg-[#1f1f23] p-10 sm:max-w-xl ">
            <DialogHeader>
              <DialogTitle className="">Edit Profile</DialogTitle>
            </DialogHeader>
            <UserProfileForm {...data} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>
              <Pencil className="h-4 w-4 sm:mr-2" />
              <p className="hidden sm:block">Edit Profile</p>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh] w-full bg-[#1f1f23] p-5 px-9">
            <DrawerHeader>
              <DrawerTitle>Edit Profile</DrawerTitle>
            </DrawerHeader>
            <UserProfileForm {...data} />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
