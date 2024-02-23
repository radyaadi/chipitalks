import SideProfile from "./SideProfile";
import PostContent from "./PostContent";
import MoreButton from "./MoreButton";

interface Props {
  currentUserClerkId: string;
  postId: string;
  author: { _id: string; clerk_id: string; name: string; image_url: string };
  content: string;
  createAt: string;
  comments: { author: { image_url: string } }[];
  likes: { user: string; timestamp: string }[];
  currentUserId: string;
  isChild?: boolean;
  isMain?: boolean;
}

export default function PostCard({
  currentUserClerkId,
  postId,
  author,
  content,
  createAt,
  comments,
  likes,
  currentUserId,
  isChild,
  isMain,
}: Props) {
  const filteredData = likes?.filter(
    (item: any) => item.user === currentUserId,
  );

  const data = {
    currentUserClerkId,
    postId,
    author,
    content,
    createAt,
    comments,
    likes,
    currentUserId,
    isChild,
    isMain,
  };

  return (
    <>
      <div
        className={`${isMain && isChild && "py-6"} flex w-full gap-x-2 leading-none`}
      >
        <div className="flex flex-col items-center justify-between">
          <SideProfile {...data} />
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <PostContent
            {...data}
            likesFilterData={filteredData.length ? true : false}
          />
        </div>
        {currentUserClerkId == author.clerk_id && (
          <MoreButton postId={postId} />
        )}
      </div>
      {!isMain && isChild ? (
        <div className="flex w-16 justify-center">
          <div className="my-0 h-6 w-[2px] bg-[#414853]"></div>
        </div>
      ) : null}
    </>
  );
}
