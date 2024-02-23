import React from "react";
import HomeNav from "./nav-link/HomeNav";
import SearchNav from "./nav-link/SearchNav";
import CreatePostNav from "./nav-link/CreatePostNav";
import ActivitiesNav from "./nav-link/ActivitiesNav";
import ProfileNav from "./nav-link/ProfileNav";
import { currentUser } from "@clerk/nextjs";
import { fetchUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

export default async function NavLink() {
  const clerk = await currentUser();
  if (!clerk) return null;

  const user = await fetchUserById(clerk.id);
  if (!user?.on_boarded) redirect("/onboarding");
  if (!user) return null;

  return (
    <>
      <HomeNav />
      <SearchNav />
      <CreatePostNav
        userId={JSON.parse(JSON.stringify(user._id))}
        username={user.username}
        name={user.name}
        profileImg={user.image_url}
      />
      <ActivitiesNav />
      <ProfileNav clerkId={clerk.id} profileImg={user.image_url} />
    </>
  );
}
