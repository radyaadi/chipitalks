import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Props {
  author: { _id: string; clerk_id: string; name: string; image_url: string };
  comments: { author: { image_url: string } }[];
  isChild?: boolean;
  isMain?: boolean;
}

export default function PostHeaderImage({
  author,
  comments,
  isChild,
  isMain,
}: Props) {
  return (
    <>
      <Avatar className="h-12 w-12">
        <Link href={`/profile/${author.clerk_id}`}>
          <AvatarImage className="object-cover" src={author.image_url} />
          <AvatarFallback>
            <div className="relative h-12 w-12 rounded-full bg-gray-600"></div>
          </AvatarFallback>
        </Link>
      </Avatar>
      {(comments.length && isChild) || !isMain ? (
        <div className="my-0 h-full w-[2px] bg-[#414853]"></div>
      ) : null}

      <div className="flex min-w-16 justify-center">
        {isChild && comments.length ? (
          <>
            {comments.slice(0, 3).map((comment, index) => (
              <Avatar
                key={index}
                className={`${index !== 0 && "-ml-5"} ${comments.length > 2 ? "h-7 w-7" : "h-8 w-8"} object-cover`}
              >
                <AvatarImage
                  className="object-cover"
                  src={comment.author.image_url}
                />
                <AvatarFallback>
                  <div
                    className={`${index !== 0 && "-ml-5"} ${comments.length > 2 ? "h-7 w-7" : "h-8 w-8"} relative h-8 w-8 rounded-full bg-gray-600`}
                  ></div>
                </AvatarFallback>
              </Avatar>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
