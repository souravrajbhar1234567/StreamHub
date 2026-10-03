import api from "./api";

export const getDownloads = async () => {
  return api.get("/downloads");
};

export const getDownloadQuota = async () => {
  return api.get("/downloads/quota");
};

export const downloadVideo = async (videoId, quality = "720p") => {
  return api.post(`/downloads/${videoId}`, { quality });
};

export const deleteDownload = async (downloadId) => {
  return api.delete(`/downloads/${downloadId}`);
};

export default {
  getDownloads,
  getDownloadQuota,
  downloadVideo,
  deleteDownload,
};
