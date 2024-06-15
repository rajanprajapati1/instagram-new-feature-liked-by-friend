import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png", // you can set a default profile picture URL
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "reel", 
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = models?.user || model("user", UserSchema);
