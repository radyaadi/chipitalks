import { fetchUserComments } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { Button } from "../../ui/button";
import PostCard from "@/components/cards/post-card/PostCard";

interface Props {
  currentUserClerkId: string;
  userClerkId: string;
  userId: string;
}

export default async function ReplyTab({ currentUserClerkId, userId }: Props) {
  const data = await fetchUserComments(userId);
  if (!data) return redirect("/");

  return (
    <div className="mt-5 grid w-full grid-cols-1 divide-y-[1px] divide-gray-700/70">
      {data.length ? (
        <>
          {data.map((post: any) => (
            <PostCard
              currentUserClerkId={currentUserClerkId}
              key={JSON.parse(JSON.stringify(post._id))}
              postId={JSON.parse(JSON.stringify(post._id))}
              currentUserId={JSON.parse(JSON.stringify(userId))}
              author={post.author}
              content={post.text}
              createAt={post.create_at}
              comments={post.children}
              likes={JSON.parse(JSON.stringify(post.likes))}
              isChild={true}
              isMain={true}
            />
          ))}
        </>
      ) : (
        <Button className="mx-auto w-fit">Create your first chipi chipi</Button>
      )}
    </div>
  );
}
