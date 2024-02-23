import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "@/lib/actions/user.action";
import UserBoardForm from "@/components/forms/UserProfileForm";

export default async function Page() {
  const clerk = await currentUser();
  if (!clerk) return null;

  const user = await fetchUserById(clerk.id);
  if (user?.on_boarded) redirect("/home");

  const userData = {
    clerkId: clerk?.id,
    email: user?.email || clerk?.emailAddresses[0].emailAddress,
    username: user?.username || clerk?.username,
    name: user?.name || clerk?.firstName,
    bio: user?.bio || "",
    imageUrl: user?.image_url || clerk?.imageUrl,
  };

  return (
    <div className="h-full w-full py-10">
      <div className="mx-auto max-w-screen-sm px-7 lg:px-10">
        <h1 className="text-xl font-bold lg:text-2xl">Onboarding</h1>
        <p className="mb-10 text-sm text-[#909098]">
          Complete your profile first to continue to use ChipiTalks
        </p>
        <UserBoardForm {...userData} />
      </div>
    </div>
  );
}
