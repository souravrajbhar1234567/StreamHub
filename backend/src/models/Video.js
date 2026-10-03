import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },
    thumbnailUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=900&q=80",
    },
    duration: {
      type: String,
      default: "10:00",
    },
    durationSeconds: {
      type: Number,
      default: 600,
    },
    category: {
      type: String,
      default: "Technology",
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    resolution: {
      type: String,
      default: "1080p",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    authorName: {
      type: String,
      default: "StreamHub Creator",
    },
    status: {
      type: String,
      enum: ["published", "draft", "unlisted"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

// Search indexes
videoSchema.index({ title: "text", description: "text", tags: "text" });

export const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);
export default Video;
