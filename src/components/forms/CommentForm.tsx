"use client";

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CommentValidation } from "@/lib/validations/post";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createComment } from "@/lib/actions/post.action";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  postId: string;
  currentUserImage: string;
  currentUserId: string;
  authorName: string;
}

export default function CommentForm({
  postId,
  currentUserImage,
  currentUserId,
  authorName,
}: Props) {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      _comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await createComment({
      _id: postId,
      author: currentUserId,
      text: values._comment,
      path: pathname,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-xs:flex-col flex items-center gap-1 border-b border-[#414853] py-5 sm:gap-2 xl:gap-5"
      >
        <FormField
          control={form.control}
          name="_comment"
          render={({ field }) => (
            <FormItem className="flex w-full items-center">
              <FormLabel className="hidden sm:block">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    className="object-cover"
                    src={currentUserImage}
                  />
                  <AvatarFallback>
                    <div className="relative h-12 w-12 rounded-full bg-gray-600"></div>
                  </AvatarFallback>
                </Avatar>
              </FormLabel>
              <FormControl className="pb-3">
                <Input
                  type="text"
                  placeholder={`reply to @${authorName}...`}
                  className="border-none text-[1rem] text-white placeholder:text-[#909098] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mx-auto w-fit sm:mx-0">
          Send
        </Button>
      </form>
    </Form>
  );
}
