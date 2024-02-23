import UserHighlight from "@/components/cards/UserHighlight";
import { fetchUserById, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const clerk = await currentUser();
  if (!clerk) return null;

  const user = await fetchUserById(clerk.id);
  if (!user?.on_boarded) redirect("/onboarding");

  const { data } = await fetchUsers({
    userId: user._id,
    searchValue: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="mb-5 text-xl font-bold xl:text-2xl">Search User</h1>
      <div className="grid w-full grid-cols-1 gap-x-10">
        {!data.length ? (
          <p>d</p>
        ) : (
          <>
            {data.map((detail) => (
              <UserHighlight
                key={JSON.stringify(detail._id)}
                pathLink={`/profile/${detail.clerk_id}`}
                profileImage={detail.image_url}
                name={detail.name}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
