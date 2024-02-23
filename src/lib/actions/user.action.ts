"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import Post from "../models/post.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  clerk_id: string;
  email: string;
  username: string;
  name: string;
  image_url: string;
  bio: string;
  path: string;
}

export async function fetchUsers({
  userId,
  searchValue = "",
  pageNumber = 1,
  pageSize = 20,
  sortOrder = "desc",
}: {
  userId?: string;
  searchValue?: string;
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: SortOrder;
}) {
  try {
    connectToDb();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchValue, "i");
    const query: FilterQuery<typeof User> = { id: { $ne: userId } };

    if (searchValue.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createAt: sortOrder };
    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const userTotalCount = await User.countDocuments(query);
    const data = await usersQuery.exec();
    const isNext = userTotalCount > skipAmount + data.length;

    return { data, isNext };
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function fetchUserPost(userId: string) {
  try {
    connectToDb();

    const userPost = await User.findOne({
      clerk_id: userId,
    }).populate({
      path: "posts",
      model: Post,
      options: { sort: { create_at: -1 } },
      populate: [
        {
          path: "author",
          model: User,
          select: "_id clerk_id name image_url",
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
    });

    return userPost;
  } catch (error: any) {
    throw new Error(`Failed to fetch user post: ${error.message}`);
  }
}

export async function fetchUserComments(userId: string) {
  try {
    connectToDb();

    const postQuery = await Post.find({
      parent_id: { $ne: null, $exists: true },
      author: userId,
    })
      .sort({
        create_at: "desc",
      })
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parent_id image_url",
        },
      });

    return postQuery;
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function fetchUserById(userId: string) {
  try {
    connectToDb();
    return await User.findOne({ clerk_id: userId })
      .populate({
        path: "followers",
        populate: [
          {
            path: "user",
            model: User,
            select: "username name image_url _id clerk_id",
          },
        ],
      })
      .populate({
        path: "following",
        populate: [
          {
            path: "user",
            model: User,
            select: "username name image_url _id clerk_id",
          },
        ],
      });
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}

export async function updateUser({
  clerk_id,
  email,
  username,
  name,
  image_url,
  bio,
  path,
}: Params): Promise<void> {
  try {
    connectToDb();
    await User.findOneAndUpdate(
      { clerk_id: clerk_id },
      {
        email,
        username: username.toLowerCase(),
        name,
        image_url,
        bio,
        on_boarded: true,
        update_at: new Date(),
      },
      { upsert: true },
    );

    if (path === "/profile/edit") revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
}
