import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  parent_id: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  likes: [
    {
      _id: false,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  shared: [
    {
      _id: false,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
