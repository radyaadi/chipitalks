"use client";

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PostValidation } from "@/lib/validations/post";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/post.action";
import { Dispatch, SetStateAction, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function PostForm({
  userId,
  openChange,
}: {
  userId: string;
  openChange: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      _post: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    await createPost({
      author: userId,
      text: values._post,
      path: pathname,
    });
    openChange(false);
    setLoading(false);
    router.push("/home");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="_post"
          render={({ field }) => (
            <FormItem>
              <FormControl className="max-h-[40vh] sm:max-h-[40vh]">
                <Textarea
                  className="border-[#414853]"
                  placeholder="Start a post..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          {loading ? (
            <Button type="submit" className="">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit">Send</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
