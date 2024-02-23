import { fetchUserById } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ACTIVITY_TABS } from "@/constants/activity-tabs";

export default async function Page() {
  const clerk = await currentUser();
  if (!clerk) return null;

  const user = await fetchUserById(clerk.id);
  if (!user?.on_boarded) redirect("/onboarding");

  return (
    <section className="w-full">
      <h1 className="mb-5 text-xl font-bold xl:text-2xl">Activity</h1>
      <Tabs defaultValue="like" className="mx-auto w-full">
        <TabsList className="w-full">
          {ACTIVITY_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="w-full">
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {ACTIVITY_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-5">
            <tab.component userId={user._id} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
