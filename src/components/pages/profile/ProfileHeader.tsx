import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "./FollowButton";
import FollowInfo from "./FollowInfo";
import EditProfile from "./EditProfile";

interface Props {
  currentUserClerkId: string;
  userClerkId: string;
  currentUserId: string;
  userId: string;
  email: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  countPosts: number;
  followers: {
    user: {
      username: string;
      name: string;
      image_url: string;
      _id: string;
      clerk_id: string;
    };
    timestamp: string;
  }[];
  following: {
    user: {
      username: string;
      name: string;
      image_url: string;
      _id: string;
      clerk_id: string;
    };
    timestamp: string;
  }[];
  followersFilterData: boolean;
}

export default function ProfileHeader({
  currentUserClerkId,
  userClerkId,
  currentUserId,
  userId,
  email,
  name,
  username,
  image,
  bio,
  countPosts,
  followers,
  following,
  followersFilterData,
}: Props) {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage className="object-cover" src={image} />
            <AvatarFallback>
              <div className="relative h-20 w-20 rounded-full bg-gray-600"></div>
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-bold">{name}</p>
            <p className="text-m-foreground">@{username}</p>
            <div className="text-w-text-secondary hidden gap-x-2 text-sm sm:inline-flex">
              <div className="inline-flex cursor-default flex-col items-center gap-x-1 duration-100 ease-in-out hover:text-white sm:flex-row">
                <p>{countPosts}</p>
                <p>Posts</p>
              </div>
              <p className="hidden sm:block">•</p>
              <FollowInfo userFollow={followers} text="Followers" />
              <p className="hidden sm:block">•</p>
              <FollowInfo userFollow={following} text="Following" />
            </div>
          </div>
        </div>
        {userClerkId === currentUserClerkId ? (
          <>
            <EditProfile
              clerkId={currentUserClerkId}
              email={email}
              username={username}
              name={name}
              bio={bio}
              imageUrl={image}
            />
          </>
        ) : (
          <FollowButton
            followerId={currentUserId}
            followedId={userId}
            isFollowed={followersFilterData}
          />
        )}
      </div>
      <div className="text-w-text-secondary mx-auto my-6 grid w-full max-w-80 grid-cols-3 justify-center gap-x-2 text-sm sm:hidden">
        <div className="inline-flex cursor-default flex-col items-center gap-x-1 duration-100 ease-in-out hover:text-white sm:flex-row">
          <p>{countPosts}</p>
          <p>Posts</p>
        </div>
        <p className="hidden sm:block">•</p>
        <FollowInfo userFollow={followers} text="Followers" />
        <p className="hidden sm:block">•</p>
        <FollowInfo userFollow={following} text="Following" />
      </div>
      <div className="sm:my-5">
        <p>{bio}</p>
      </div>
    </>
  );
}
