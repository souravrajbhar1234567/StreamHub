import api from "./api";

export const getAdminStats = async () => {
  return api.get("/admin/stats");
};

export const getAdminUsers = async (params = {}) => {
  return api.get("/admin/users", { params });
};

export const updateAdminUser = async (id, data) => {
  return api.put(`/admin/users/${id}`, data);
};

export const getAdminSubscriptions = async () => {
  return api.get("/admin/subscriptions");
};

export const getAdminPayments = async () => {
  return api.get("/admin/payments");
};

export const getAdminReports = async () => {
  return api.get("/admin/reports");
};

export const resolveAdminReport = async (reportId, data) => {
  return api.post(`/admin/reports/${reportId}/resolve`, data);
};

export const getAdminMeetings = async () => {
  return api.get("/admin/meetings");
};

export const getAdminDownloads = async () => {
  return api.get("/admin/downloads");
};

export const getAdminAuditLogs = async (params = {}) => {
  return api.get("/admin/audit-logs", { params });
};

export const createAdminVideo = async (formData) => {
  return api.post("/videos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateAdminVideo = async (id, data) => {
  return api.put(`/videos/${id}`, data);
};

export const deleteAdminVideo = async (id) => {
  return api.delete(`/videos/${id}`);
};

export default {
  getAdminStats,
  getAdminUsers,
  updateAdminUser,
  getAdminSubscriptions,
  getAdminPayments,
  getAdminReports,
  resolveAdminReport,
  getAdminMeetings,
  getAdminDownloads,
  getAdminAuditLogs,
  createAdminVideo,
  updateAdminVideo,
  deleteAdminVideo,
};
