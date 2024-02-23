import { getCommentsActivity } from "@/lib/actions/activity.action";
import UserHighlight from "@/components/cards/UserHighlight";

export default async function CommentTab({ userId }: { userId: string }) {
  const data = await getCommentsActivity(userId);
  // console.log(data);

  return data.length ? (
    data.map((detail: any) => (
      <UserHighlight
        key={JSON.stringify(detail._id)}
        pathLink={`/post/${detail.parent_id}`}
        profileImage={detail.author.image_url}
        name={detail.author.name}
        timestamp={detail.create_at}
        text="reply your post"
      />
    ))
  ) : (
    <p className="p-3 text-center">No comment activity</p>
  );
}
