import WatchProgress from "../models/WatchProgress.js";
import WatchHistory from "../models/WatchHistory.js";

export const updateProgress = async (userId, videoId, { progressSeconds, totalDuration }) => {
  const percentage =
    totalDuration > 0 ? Math.min(100, Math.round((progressSeconds / totalDuration) * 100)) : 0;
  const isCompleted = percentage >= 90;

  const progress = await WatchProgress.findOneAndUpdate(
    { user: userId, video: videoId },
    {
      progressSeconds,
      totalDuration,
      percentage,
      isCompleted,
      lastUpdated: new Date(),
    },
    { upsert: true, new: true }
  );

  // Add or update to watch history
  await WatchHistory.findOneAndUpdate(
    { user: userId, video: videoId },
    { watchedAt: new Date() },
    { upsert: true, new: true }
  );

  return progress;
};

export const getProgress = async (userId, videoId) => {
  return await WatchProgress.findOne({ user: userId, video: videoId });
};

export const getContinueWatching = async (userId) => {
  return await WatchProgress.find({
    user: userId,
    isCompleted: false,
    progressSeconds: { $gt: 10 },
  })
    .populate("video")
    .sort({ lastUpdated: -1 })
    .limit(10);
};

export const getWatchHistory = async (userId, page = 1, limit = 20) => {
  const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
  const take = parseInt(limit, 10);

  const [history, total] = await Promise.all([
    WatchHistory.find({ user: userId })
      .populate("video")
      .sort({ watchedAt: -1 })
      .skip(skip)
      .limit(take),
    WatchHistory.countDocuments({ user: userId }),
  ]);

  return { history, total };
};

export const clearWatchHistory = async (userId) => {
  await Promise.all([
    WatchHistory.deleteMany({ user: userId }),
    WatchProgress.deleteMany({ user: userId }),
  ]);
  return { success: true };
};

export default {
  updateProgress,
  getProgress,
  getContinueWatching,
  getWatchHistory,
  clearWatchHistory,
};
