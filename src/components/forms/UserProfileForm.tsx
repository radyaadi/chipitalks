"use client";

import { useState, ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidator } from "@/lib/validations/user";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  clerkId: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  imageUrl: string;
}

export default function UserProfileForm({
  clerkId,
  email,
  username,
  name,
  bio,
  imageUrl,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      _image_url: imageUrl || "",
      _name: name || "",
      _bio: bio || "",
    },
  });

  const handleProfileImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof UserValidator>) => {
    setLoading(true);
    const blob = values._image_url;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(file);

      if (imgRes && imgRes[0].url) {
        values._image_url = imgRes[0].url;
      }
    }

    await updateUser({
      clerk_id: clerkId,
      email: email,
      username: username,
      name: values._name,
      image_url: values._image_url,
      bio: values._bio,
      path: pathname,
    });

    setLoading(false);

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/home");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-2 flex flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="_image_url"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center gap-x-5 gap-y-2 sm:flex-row">
              <FormLabel>
                {field.value ? (
                  <Avatar className="h-28 w-28">
                    <AvatarImage src={field.value} className="object-cover" />
                    <AvatarFallback>Photo</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="h-28 w-28">
                    <AvatarImage src="/image.svg" />
                    <AvatarFallback>Photo</AvatarFallback>
                  </Avatar>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload Profile Image"
                  onChange={(e) => handleProfileImage(e, field.onChange)}
                  className="cursor-pointer border-[#414853] file:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              disabled
              placeholder={email}
              className="bg-[#31353f] placeholder:text-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              disabled
              placeholder={username}
              className="bg-[#31353f] placeholder:text-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="border-[#414853]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="_bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-28 border-[#414853]"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled className="mx-auto w-fit sm:mx-0">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="mx-auto w-fit sm:mx-0">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
