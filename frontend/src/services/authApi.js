import api from "./api";

export const registerUser = async (data) => {
  return api.post("/auth/register", data);
};

export const loginUser = async (data) => {
  return api.post("/auth/login", data);
};

export const getMe = async () => {
  return api.get("/auth/me");
};

export const logoutUser = async () => {
  return api.post("/auth/logout");
};

export const forgotPassword = async (email) => {
  return api.post("/auth/forgot-password", { email });
};

export const resetPassword = async (data) => {
  return api.post("/auth/reset-password", data);
};

export const getProfile = async () => {
  return api.get("/users/profile");
};

export const updateProfile = async (data) => {
  return api.put("/users/profile", data);
};

export const changePassword = async (data) => {
  return api.put("/users/change-password", data);
};

export const getSessions = async () => {
  return api.get("/users/sessions");
};

export const revokeSession = async (sessionId) => {
  return api.delete(`/users/sessions/${sessionId}`);
};

export const getDevices = async () => {
  return api.get("/users/devices");
};

export const removeDevice = async (deviceId) => {
  return api.delete(`/users/devices/${deviceId}`);
};

export default {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
  getSessions,
  revokeSession,
  getDevices,
  removeDevice,
};
