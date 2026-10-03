import mongoose from "mongoose";

const downloadLockSchema = new mongoose.Schema(
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
    deviceId: {
      type: String,
      required: true,
    },
    lockExpiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index
    },
  },
  {
    timestamps: true,
  }
);

downloadLockSchema.index({ user: 1, video: 1, deviceId: 1 }, { unique: true });

export const DownloadLock =
  mongoose.models.DownloadLock ||
  mongoose.model("DownloadLock", downloadLockSchema);
export default DownloadLock;
