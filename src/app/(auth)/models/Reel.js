import mongoose from "mongoose";

const ReelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  likes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  views: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  shares: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  hashtags: [{ type: String, trim: true }],
  location: { type: String },
  status: {
    type: String,
    enum: ["active", "deleted", "archived"],
    default: "active",
  },
  privacy: { type: String, enum: ["public", "private"], default: "public" },
  duration: { type: Number },
  ReelId: { type: String , required : true },
  filters: [{ type: String }],
  song: {
    name: { type: String },
    poster: { type: String , default : "https://f4.bcbits.com/img/a4139357031_10.jpg" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ReelSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Reel = mongoose?.models?.reel || mongoose?.model("reel", ReelSchema);
