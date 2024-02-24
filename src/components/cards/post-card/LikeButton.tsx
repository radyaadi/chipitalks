"use client";
import { updatePostLike } from "@/lib/actions/activity.action";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LikeButton({
  postId,
  likingUserId,
  currentUserLiked,
}: {
  postId: string;
  likingUserId: string;
  currentUserLiked: boolean;
}) {
  const pathname = usePathname();

  const onLikeHandle = async () => {
    await updatePostLike({
      postId: postId,
      likingUserId: likingUserId,
      path: pathname,
      currentUserLiked,
    });
  };

  return (
    <>
      <Heart
        absoluteStrokeWidth
        fill={currentUserLiked ? "#ef4444" : "transparent"}
        strokeWidth={1.9}
        width={21}
        className={`${currentUserLiked ? "text-[#ef4444]" : "text-[#909098] hover:text-white"} cursor-pointer duration-75 ease-in-out `}
        onClick={onLikeHandle}
      />
    </>
  );
}
