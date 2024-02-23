import UserHighlight from "@/components/cards/UserHighlight";
import { getFollowsActivity } from "@/lib/actions/activity.action";

export default async function FollowTab({ userId }: { userId: string }) {
  const data = await getFollowsActivity(userId);
  return data.length ? (
    data.map((detail: any) => (
      <UserHighlight
        key={JSON.stringify(detail.user._id)}
        pathLink={`/profile/${detail.user.clerk_id}`}
        profileImage={detail.user.image_url}
        name={detail.user.name}
        timestamp={detail.timestamp}
        text="started following you"
      />
    ))
  ) : (
    <p className="p-3 text-center">No follow activity</p>
  );
}
