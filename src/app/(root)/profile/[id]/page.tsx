import { fetchUserById } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PROFILE_TABS } from "@/constants/profile-tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/pages/profile/ProfileHeader";

export default async function Page({ params }: { params: { id: string } }) {
  const clerk = await currentUser();
  if (!clerk) return null;

  const user = await fetchUserById(params.id);
  if (!user?.on_boarded) redirect("/onboarding");

  const authUser = await fetchUserById(clerk.id);

  const data = {
    currentUserClerkId: clerk.id,
    userClerkId: user.clerk_id,
    currentUserId: JSON.parse(JSON.stringify(authUser._id)),
    userId: user._id,
    email: user.email,
    name: user.name,
    username: user.username,
    image: user.image_url,
    bio: user.bio,
    countPosts: user.posts.length,
    followers: JSON.parse(JSON.stringify(user.followers)),
    following: JSON.parse(JSON.stringify(user.following)),
  };

  const filteredData = JSON.parse(JSON.stringify(user.followers))?.filter(
    (item: any) => item.user._id === JSON.parse(JSON.stringify(authUser._id)),
  );

  return (
    <section className="w-full">
      <ProfileHeader
        {...data}
        followersFilterData={filteredData.length ? true : false}
      />
      <div className="mt-10">
        <Tabs defaultValue="posts" className="mx-auto w-full">
          <TabsList className="w-full">
            {PROFILE_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="w-full">
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {PROFILE_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <tab.component {...data} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
