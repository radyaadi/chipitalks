import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "@/lib/actions/user.action";
import { fetchPosts } from "@/lib/actions/post.action";
import PostCard from "@/components/cards/post-card/PostCard";

export default async function Home() {
  const clerk = await currentUser();
  if (!clerk) return null;

  const user = await fetchUserById(clerk.id);
  if (!user?.on_boarded) redirect("/onboarding");

  // TODO: Pagination
  const { data } = await fetchPosts(1);

  return (
    <section className="w-full">
      <div className="divide-w-border grid w-full grid-cols-1 divide-y-2">
        {!data.length ? (
          <p className="mt-10 text-center text-sm font-medium text-[#909098]">
            Oops! No chipi chipi created yet
          </p>
        ) : (
          <>
            {data.map((post) => (
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
                isChild={true}
                isMain={true}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
