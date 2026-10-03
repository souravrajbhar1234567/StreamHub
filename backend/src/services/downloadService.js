import DownloadRecord from "../models/DownloadRecord.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import { parseDevice } from "../utils/deviceParser.js";
import { parseBrowser } from "../utils/browserParser.js";
import { getClientIp } from "../utils/ipUtils.js";

import quotaService from "./quotaService.js";

export const initiateDownload = async (
  userId,
  videoId,
  quality = "720p",
  req = null
) => {
  const [video, user] = await Promise.all([
    Video.findById(videoId),
    User.findById(userId),
  ]);

  if (!video) {
    const error = new Error("Video not found.");
    error.statusCode = 404;
    throw error;
  }

  // Check subscription validity if paid plan
  if (user?.membership && user.membership !== "Free") {
    const activeSub = await Subscription.findOne({
      user: userId,
      status: "active",
      endDate: { $gte: new Date() },
    });
    if (!activeSub && user.role !== "admin") {
      user.membership = "Free";
      await user.save();
    }
  }

  // Verify daily download quota before proceeding
  const quota = await quotaService.getUserQuota(user);
  if (quota.remaining <= 0) {
    const error = new Error(
      `Daily download limit reached for ${user?.membership || "Free"} plan (${quota.downloadLimit} download${
        quota.downloadLimit === 1 ? "" : "s"
      }/day). Please upgrade your plan or try again tomorrow.`
    );
    error.statusCode = 429;
    throw error;
  }

  // Prevent duplicate downloads from counting multiple times within 24 hours
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const existingRecentDownload = await DownloadRecord.findOne({
    user: userId,
    video: videoId,
    createdAt: { $gte: twentyFourHoursAgo },
    status: "completed",
  });

  if (existingRecentDownload) {
    return {
      success: true,
      downloadUrl: video.videoUrl,
      downloadRecord: existingRecentDownload,
      isRepeatDownload: true,
      message: "Re-downloading recent video (does not deduct daily quota).",
    };
  }

  // Parse client device and browser for audit tracking
  const userAgent = req?.headers ? req.headers["user-agent"] || "" : "";
  const ip = req ? getClientIp(req) : "127.0.0.1";
  const parsedDevice = parseDevice(userAgent);
  const parsedBrowser = parseBrowser(userAgent);

  // Calculate file size based on duration & quality
  const seconds = video.durationSeconds || 600;
  const bitrateMultiplier =
    quality === "4K" ? 8 : quality === "1080p" ? 4 : quality === "720p" ? 2 : 1;
  const estimatedBytes = seconds * bitrateMultiplier * 150000;

  const downloadRecord = await DownloadRecord.create({
    user: userId,
    video: video._id,
    videoTitle: video.title,
    quality,
    fileSize: estimatedBytes,
    downloadUrl: video.videoUrl,
    status: "completed",
    ipAddress: ip,
    deviceInfo: `${parsedDevice.type} (${parsedDevice.os})`,
    browser: `${parsedBrowser.name} ${parsedBrowser.version}`,
    subscriptionPlan: user?.membership || "Free",
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
