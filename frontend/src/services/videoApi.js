import api from "./api";

export const getVideos = async (params = {}) => {
  return api.get("/videos", { params });
};

export const getVideo = async (id) => {
  return api.get(`/videos/${id}`);
};

export const likeVideo = async (id) => {
  return api.post(`/videos/${id}/like`);
};

export const getCategories = async () => {
  return api.get("/videos/categories");
};

export const getComments = async (videoId) => {
  return api.get(`/videos/${videoId}/comments`);
};

export const addComment = async (videoId, data) => {
  return api.post(`/videos/${videoId}/comments`, data);
};

export const updateWatchProgress = async (videoId, data) => {
  return api.post(`/watch/progress/${videoId}`, data);
};

export const getWatchProgress = async (videoId) => {
  return api.get(`/watch/progress/${videoId}`);
};

export const getContinueWatching = async () => {
  return api.get("/watch/continue");
};

export const getWatchHistory = async (params = {}) => {
  return api.get("/watch/history", { params });
};

export const clearWatchHistory = async () => {
  return api.delete("/watch/history");
};

export default {
  getVideos,
  getVideo,
  likeVideo,
  getCategories,
  getComments,
  addComment,
  updateWatchProgress,
  getWatchProgress,
  getContinueWatching,
  getWatchHistory,
  clearWatchHistory,
};
