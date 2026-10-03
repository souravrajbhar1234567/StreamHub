import userService from "../services/userService.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updated = await userService.updateProfile(req.user._id, req.body);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.changePassword(req.user._id, {
      currentPassword,
      newPassword,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSessions = async (req, res, next) => {
  try {
    const sessions = await userService.getSessions(req.user._id);
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    next(error);
  }
};

export const revokeSession = async (req, res, next) => {
  try {
    await userService.revokeSession(req.user._id, req.params.sessionId);
    res.status(200).json({ success: true, message: "Session revoked successfully." });
  } catch (error) {
    next(error);
  }
};

export const getDevices = async (req, res, next) => {
  try {
    const devices = await userService.getDevices(req.user._id);
    res.status(200).json({ success: true, devices });
  } catch (error) {
    next(error);
  }
};

export const removeDevice = async (req, res, next) => {
  try {
    await userService.removeDevice(req.user._id, req.params.deviceId);
    res.status(200).json({ success: true, message: "Device removed." });
  } catch (error) {
    next(error);
  }
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
