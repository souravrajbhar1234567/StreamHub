import User from "../models/User.js";
import Session from "../models/Session.js";
import TrustedDevice from "../models/TrustedDevice.js";

export const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const updateProfile = async (userId, updateData) => {
  const allowedFields = ["name", "bio", "avatar", "twoFactorEnabled", "theme"];
  const filteredData = {};
  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  }

  const user = await User.findByIdAndUpdate(userId, filteredData, {
    new: true,
    runValidators: true,
  }).select("-password");

  return user;
};

export const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    const error = new Error("Incorrect current password.");
    error.statusCode = 400;
    throw error;
  }

  user.password = newPassword;
  await user.save();

  return { success: true, message: "Password updated successfully." };
};

export const getSessions = async (userId) => {
  return await Session.find({ user: userId, isValid: true }).sort({ createdAt: -1 });
};

export const revokeSession = async (userId, sessionId) => {
  return await Session.findOneAndUpdate(
    { _id: sessionId, user: userId },
    { isValid: false },
    { new: true }
  );
};

export const getDevices = async (userId) => {
  return await TrustedDevice.find({ user: userId }).sort({ lastUsedAt: -1 });
};

export const removeDevice = async (userId, deviceId) => {
  return await TrustedDevice.findOneAndDelete({ user: userId, _id: deviceId });
};

export default {
  getProfile,
  updateProfile,
  changePassword,
  getSessions,
  revokeSession,
  getDevices,
  removeDevice,
};
