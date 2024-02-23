"use server";

import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";

interface PostParams {
  author: string;
  text: string;
  path: string;
}

interface CommentParams {
  _id: string;
  author: string;
  text: string;
  path: string;
}

interface LikingParams {
  postId: string;
  likingUserId: string;
  currentUserLiked: boolean;
  path: string;
}

export async function fetchPosts(
  pageNumber: number = 1,
  pageSize: number = 100,
) {
  try {
    connectToDb();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postQuery = Post.find({ parent_id: { $in: [null, undefined] } })
      .sort({
        create_at: "desc",
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parent_id image_url",
        },
      });

    const postTotalCount = await Post.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const data = await postQuery.exec();
    const isNext = postTotalCount > skipAmount + data.length;

    return { data, isNext };
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function fetchPostById(id: string) {
  try {
    connectToDb();

    const data = await Post.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id clerk_id name image_url",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id clerk_id parent_id name image_url",
          },
          {
            path: "children",
            model: Post,
            populate: {
              path: "author",
              model: User,
              select: "_id clerk_id name image_url",
            },
          },
        ],
      })
      .exec();

    return data;
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function createPost({ author, text, path }: PostParams) {
  try {
    connectToDb();

    const createdPost = await Post.create({ author, text });
    await User.findByIdAndUpdate(author, { $push: { posts: createdPost._id } });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function createComment({
  _id,
  author,
  text,
  path,
}: CommentParams) {
  try {
    connectToDb();

    const mainPost = await Post.findById(_id);
    if (!mainPost) throw new Error(`Post not found`);

    const postComment = new Post({
      parent_id: _id,
      author: author,
      text: text,
    });

    const savePostComment = await postComment.save();
    mainPost.children.push(savePostComment._id);

    await mainPost.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

async function fetchAllPostChilds(postId: string): Promise<any[]> {
  const postChilds = await Post.find({ parent_id: postId });

  const descendantPosts = [];
  for (const postChild of postChilds) {
    const descendants = await fetchAllPostChilds(postChild._id);
    descendantPosts.push(postChild, ...descendants);
  }

  return descendantPosts;
}

export async function deletePost(id: string, path: string): Promise<void> {
  try {
    connectToDb();

    // Find the thread to be deleted (the main thread)
    const mainPost = await Post.findById(id).populate("author");

    if (!mainPost) {
      throw new Error("Thread not found");
    }

    const descendantPosts = await fetchAllPostChilds(id);
    const descendantPostIds = [id, ...descendantPosts.map((post) => post._id)];

    const uniqueAuthorIds = new Set(
      [
        ...descendantPosts.map((post) => post.author?._id?.toString()),
        mainPost.author?._id?.toString(),
      ].filter((id) => id !== undefined),
    );

    await Post.deleteMany({ _id: { $in: descendantPostIds } });

    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { post: { $in: descendantPostIds } } },
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}
