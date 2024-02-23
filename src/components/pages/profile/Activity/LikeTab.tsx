import { getLikesActivity } from "@/lib/actions/activity.actions";
import UserHighlight from "@/components/Shared/Cards/UserHighlight";

export default async function LikeTab({ userId }: { userId: string }) {
  const data = await getLikesActivity(userId);
  return data.length ? (
    data.map((detail: any, index: number) => (
      <UserHighlight
        key={`${detail.user._id}-${index}`}
        pathLink={`/post/${detail.post_id}`}
        profileImage={detail.user.image_url}
        name={detail.user.name}
        timestamp={detail.timestamp}
        text="like your post"
      />
    ))
  ) : (
    <p className="p-3 text-center">No like activity</p>
  );
}
