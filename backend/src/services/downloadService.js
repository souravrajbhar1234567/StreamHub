import DownloadRecord from "../models/DownloadRecord.js";
import Video from "../models/Video.js";

export const initiateDownload = async (userId, videoId, quality = "720p") => {
  const video = await Video.findById(videoId);
  if (!video) {
    const error = new Error("Video not found.");
    error.statusCode = 404;
    throw error;
  }

  // Calculate estimated file size based on duration & quality
  const seconds = video.durationSeconds || 600;
  const bitrateMultiplier = quality === "4K" ? 8 : quality === "1080p" ? 4 : quality === "720p" ? 2 : 1;
  const estimatedBytes = seconds * bitrateMultiplier * 150000;

  const downloadRecord = await DownloadRecord.create({
    user: userId,
    video: video._id,
    videoTitle: video.title,
    quality,
    fileSize: estimatedBytes,
    downloadUrl: video.videoUrl,
    status: "completed",
  });

  return {
    success: true,
    downloadUrl: video.videoUrl,
    downloadRecord,
  };
};

export const getUserDownloads = async (userId) => {
  return await DownloadRecord.find({ user: userId, status: "completed" })
    .populate("video")
    .sort({ createdAt: -1 });
};

export const deleteDownload = async (userId, downloadId) => {
  const record = await DownloadRecord.findOneAndDelete({
    _id: downloadId,
    user: userId,
  });
  if (!record) {
    const error = new Error("Download record not found.");
    error.statusCode = 404;
    throw error;
  }
  return { success: true };
};

export default {
  initiateDownload,
  getUserDownloads,
  deleteDownload,
};
