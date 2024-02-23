import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerk_id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bio: String,
  image_url: String,
  on_boarded: { type: Boolean, default: false },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  following: [
    {
      _id: false,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  followers: [
    {
      _id: false,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  create_at: { type: Date, default: Date.now, required: true },
  update_at: { type: Date, default: Date.now, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
