import mongoose from "mongoose";

const downloadRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    videoTitle: {
      type: String,
      default: "",
    },
    quality: {
      type: String,
      default: "720p",
    },
    fileSize: {
      type: Number,
      default: 0, // In bytes
    },
    downloadUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["completed", "in_progress", "failed", "expired"],
      default: "completed",
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  },
  {
    timestamps: true,
  }
);

export const DownloadRecord =
  mongoose.models.DownloadRecord ||
  mongoose.model("DownloadRecord", downloadRecordSchema);
export default DownloadRecord;
