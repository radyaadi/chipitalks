import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import LikeButton from "./LikeButton";

interface Props {
  currentUserClerkId: string;
  postId: string;
  author: { _id: string; clerk_id: string; name: string; image_url: string };
  content: string;
  createAt: string;
  comments: { author: { image_url: string } }[];
  likes: { user: string; timestamp: string }[];
  currentUserId: string;
  isChild?: boolean;
  likesFilterData: boolean;
}

export default function PostContent({
  currentUserClerkId,
  postId,
  author,
  content,
  createAt,
  comments,
  likes,
  currentUserId,
  isChild,
  likesFilterData,
}: Props) {
  return (
    <>
      <div className="inline-flex gap-x-2">
        <Link
          href={`/profile/${author.clerk_id}`}
          className="font-bold hover:underline hover:underline-offset-2"
        >
          {author.name}{" "}
        </Link>
        {currentUserClerkId == author.clerk_id && (
          <p className="text-xs text-[#909098]">(You)</p>
        )}
        <p className="text-xs leading-snug text-[#909098]">
          {formatDate(createAt)}
        </p>
      </div>
      <Link href={`/post/${postId}`}>
        <p className="leading-snug">{content}</p>
      </Link>
      <div className="mt-1 flex gap-x-4">
        <LikeButton
          postId={postId}
          likingUserId={currentUserId}
          currentUserLiked={likesFilterData}
        />
        {isChild && (
          <Link href={`/post/${postId}`}>
            <MessageCircle
              absoluteStrokeWidth
              strokeWidth={1.9}
              width={21}
              className="cursor-pointer text-[#909098] duration-75 ease-in-out hover:text-white"
            />
          </Link>
        )}
        {/* TODO : Shared Functions */}
      </div>

      <p className={`${isChild ? "mb-[5px]" : ""} text-sm text-[#909098]`}>
        {likes.length ? (
          <>
            {likes.length} {likes.length > 1 ? "likes" : "like"}
          </>
        ) : null}
        {likes.length && comments.length ? <> · </> : null}
        {comments.length ? (
          <Link href={`/post/${postId}`}>
            {comments.length} {comments.length > 1 ? "replies" : "reply"}
          </Link>
        ) : null}
      </p>
    </>
  );
}
