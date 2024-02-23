import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "@/lib/actions/user.action";
import { fetchPostById } from "@/lib/actions/post.action";
import PostCard from "@/components/cards/post-card/PostCard";
import CommentForm from "@/components/forms/CommentForm";

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const clerk = await currentUser();
  if (!clerk) return null;

  const user = await fetchUserById(clerk.id);
  if (user?.onboarded) redirect("/onboarding");

  const post = await fetchPostById(params.id);

  return (
    <section className="w-full">
      <div>
        <PostCard
          currentUserClerkId={clerk.id}
          key={JSON.parse(JSON.stringify(post._id))}
          postId={JSON.parse(JSON.stringify(post._id))}
          currentUserId={JSON.parse(JSON.stringify(user._id))}
          author={post.author}
          content={post.text}
          createAt={post.create_at}
          comments={post.children}
          likes={JSON.parse(JSON.stringify(post.likes))}
          isChild={false}
          isMain={true}
        />
      </div>
      <div className="mt-10">
        <h1 className="mb- text-xl font-bold">Comment</h1>
        <CommentForm
          postId={JSON.parse(JSON.stringify(post._id))}
          currentUserImage={user.image_url}
          currentUserId={JSON.parse(JSON.stringify(user._id))}
          authorName={post.author.name}
        />
      </div>
      <div className="mt-5">
        {!post.children.length ? (
          <p className="mt-10 text-center text-sm font-medium text-[#909098]">
            No comment yet
          </p>
        ) : (
          <>
            {post.children.map((child: any) => (
              <PostCard
                currentUserClerkId={clerk.id}
                key={JSON.parse(JSON.stringify(child._id))}
                postId={JSON.parse(JSON.stringify(child._id))}
                currentUserId={JSON.parse(JSON.stringify(user._id))}
                author={child.author}
                content={child.text}
                createAt={child.create_at}
                comments={child.children}
                likes={JSON.parse(JSON.stringify(child.likes))}
                isChild={true}
                isMain={false}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
