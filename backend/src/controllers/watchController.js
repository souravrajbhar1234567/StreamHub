import watchProgressService from "../services/watchProgressService.js";

export const updateProgress = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { progressSeconds, totalDuration } = req.body;
    const progress = await watchProgressService.updateProgress(
      req.user._id,
      videoId,
      { progressSeconds, totalDuration }
    );
    res.status(200).json({ success: true, progress });
  } catch (error) {
    next(error);
  }
};

export const getProgress = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const progress = await watchProgressService.getProgress(
      req.user._id,
      videoId
    );
    res.status(200).json({ success: true, progress });
  } catch (error) {
    next(error);
  }
};

export const getContinueWatching = async (req, res, next) => {
  try {
    const items = await watchProgressService.getContinueWatching(req.user._id);
    res.status(200).json({ success: true, continueWatching: items });
  } catch (error) {
    next(error);
  }
};

export const getWatchHistory = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await watchProgressService.getWatchHistory(
      req.user._id,
      page,
      limit
    );
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const clearWatchHistory = async (req, res, next) => {
  try {
    await watchProgressService.clearWatchHistory(req.user._id);
    res.status(200).json({ success: true, message: "Watch history cleared." });
  } catch (error) {
    next(error);
  }
};

export default {
  updateProgress,
  getProgress,
  getContinueWatching,
  getWatchHistory,
  clearWatchHistory,
};
