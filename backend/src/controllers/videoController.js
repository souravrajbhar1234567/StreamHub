import videoService from "../services/videoService.js";
import streamingService from "../services/streamingService.js";

export const getVideos = async (req, res, next) => {
  try {
    const { search, category, sort, page, limit } = req.query;
    const result = await videoService.getVideos({
      search,
      category,
      sort,
      page,
      limit,
    });
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getVideoById = async (req, res, next) => {
  try {
    const video = await videoService.getVideoById(req.params.id, true);
    res.status(200).json({ success: true, video });
  } catch (error) {
    next(error);
  }
};

export const streamVideo = async (req, res, next) => {
  try {
    const video = await videoService.getVideoById(req.params.id, false);
    streamingService.streamVideo(video.videoUrl, req, res);
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const videoData = { ...req.body };
    if (req.file) {
      videoData.videoUrl = `/uploads/${req.file.filename}`;
    }
    const video = await videoService.createVideo(videoData, req.user);
    res.status(201).json({
      success: true,
      message: "Video created successfully.",
      video,
    });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await videoService.updateVideo(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Video updated successfully.",
      video,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    await videoService.deleteVideo(req.params.id);
    res.status(200).json({
      success: true,
      message: "Video deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const likeVideo = async (req, res, next) => {
  try {
    const video = await videoService.likeVideo(req.params.id);
    res.status(200).json({
      success: true,
      likes: video.likes,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await videoService.getCategories();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

export default {
  getVideos,
  getVideoById,
  streamVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  getCategories,
};
