import CommentTab from "@/components/pages/activity/CommentTab";
import FollowTab from "@/components/pages/activity/FollowTab";
import LikeTab from "@/components/pages/activity/LikeTab";

export const ACTIVITY_TABS = [
  { name: "Like", value: "like", component: LikeTab },
  { name: "Comment", value: "comment", component: CommentTab },
  { name: "Follow", value: "follow", component: FollowTab },
];
