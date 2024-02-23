"use client";

import { updateUserFollow } from "@/lib/actions/activity.action";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";

interface Props {
  followerId: string;
  followedId: string;
  isFollowed: boolean;
}
export default function FollowButton({
  followerId,
  followedId,
  isFollowed,
}: Props) {
  const pathname = usePathname();
  const onFollowHandle = async () => {
    await updateUserFollow({
      followerId: followerId,
      followedId: followedId,
      path: pathname,
      isFollowed,
    });
  };
  return (
    <Button className="overflow-hidden" onClick={onFollowHandle}>
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
}
