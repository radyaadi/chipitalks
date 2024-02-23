"use server";

import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import Post from "../models/post.model";

interface LikingParams {
  postId: string;
  likingUserId: string;
  currentUserLiked: boolean;
  path: string;
}

interface FollowParams {
  followerId: string;
  followedId: string;
  isFollowed: boolean;
  path: string;
}

export async function getLikesActivity(userId: string) {
  try {
    connectToDb();

    const userPosts = await Post.find({
      author: userId,
      likes: {
        $ne: null,
        $not: { $size: 0 },
      },
    }).populate({
      path: "likes",
      populate: [
        {
          path: "user",
          model: User,
          select: "name image_url _id clerk_id",
        },
      ],
    });

    const userLikes = userPosts.reduce((acc: any, userPost: any) => {
      const likesWithNewVariable = userPost.likes.map((like: any) => ({
        post_id: userPost._id,
        timestamp: like.timestamp,
        user: like.user,
      }));
      return acc.concat(likesWithNewVariable);
    }, []);

    const sortedUserLikes = userLikes.sort(
      (a: any, b: any) => b.timestamp - a.timestamp,
    );

    const filteredData = sortedUserLikes?.filter(
      (item: any) => JSON.stringify(item.user._id) != JSON.stringify(userId),
    );

    return filteredData;
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function getCommentsActivity(userId: string) {
  try {
    connectToDb();

    const userPosts = await Post.find({ author: userId });

    const postChildId = userPosts.reduce((acc: any, userPost: any) => {
      return acc.concat(userPost.children);
    }, []);

    const postData = await Post.find({
      _id: { $in: postChildId },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image_url _id clerk_id",
    });

    return postData;
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function getFollowsActivity(userId: string) {
  try {
    connectToDb();

    const userDetail = await User.findOne({
      _id: userId,
    }).populate({
      path: "followers",
      populate: [
        {
          path: "user",
          model: User,
          select: "name image_url _id clerk_id",
        },
      ],
    });

    const userFollowers = userDetail.followers;

    const sortedUserFollowers = userFollowers.sort(
      (a: any, b: any) => b.timestamp - a.timestamp,
    );

    return sortedUserFollowers;
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function updatePostLike({
  postId,
  likingUserId,
  currentUserLiked,
  path,
}: LikingParams) {
  try {
    connectToDb();

    if (currentUserLiked) {
      await Post.findByIdAndUpdate(postId, {
        $pull: {
          likes: {
            user: likingUserId,
          },
        },
      });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $push: {
          likes: {
            user: likingUserId,
            timestamp: Date.now(),
          },
        },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function updateUserFollow({
  followerId,
  followedId,
  path,
  isFollowed,
}: FollowParams) {
  try {
    connectToDb();
    if (isFollowed) {
      await User.findByIdAndUpdate(followedId, {
        $pull: {
          followers: {
            user: followerId,
          },
        },
      });
      await User.findByIdAndUpdate(followerId, {
        $pull: {
          following: {
            user: followedId,
          },
        },
      });
    } else {
      await User.findByIdAndUpdate(followedId, {
        $push: {
          followers: {
            user: followerId,
            timestamp: Date.now(),
          },
        },
      });
      await User.findByIdAndUpdate(followerId, {
        $push: {
          following: {
            user: followedId,
          },
        },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}
