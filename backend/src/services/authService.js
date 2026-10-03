import User from "../models/User.js";
import Session from "../models/Session.js";
import TrustedDevice from "../models/TrustedDevice.js";
import { generateToken } from "../utils/generateToken.js";
import { hashString } from "../utils/encryption.js";
import { parseDevice } from "../utils/deviceParser.js";
import { parseBrowser } from "../utils/browserParser.js";
import { getClientIp } from "../utils/ipUtils.js";
import { requestOTP, verifyOTP } from "./otpService.js";

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("An account with this email already exists.");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({
    name,
    email,
    password,
    membership: "Free",
    role: "user",
  });

  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      membership: user.membership,
      avatar: user.avatar,
    },
    token,
  };
};

export const login = async ({ email, password, req }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  if (user.status === "banned" || user.status === "suspended") {
    const error = new Error(`Your account has been ${user.status}.`);
    error.statusCode = 403;
    throw error;
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateToken(user._id, user.role);

  // Track session and device if request object is provided
  if (req) {
    const userAgent = req.headers["user-agent"] || "";
    const ip = getClientIp(req);
    const parsedDevice = parseDevice(userAgent);
    const parsedBrowser = parseBrowser(userAgent);

    const tokenHash = hashString(token);
    await Session.create({
      user: user._id,
      tokenHash,
      ipAddress: ip,
      userAgent,
      browser: `${parsedBrowser.name} ${parsedBrowser.version}`,
      os: parsedDevice.os,
      deviceType: parsedDevice.type,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const deviceId = hashString(`${ip}-${userAgent}`);
    await TrustedDevice.findOneAndUpdate(
      { user: user._id, deviceId },
      {
        deviceId,
        deviceName: `${parsedBrowser.name} on ${parsedDevice.os}`,
        browser: parsedBrowser.name,
        os: parsedDevice.os,
        ipAddress: ip,
        lastUsedAt: new Date(),
      },
      { upsert: true, new: true }
    );
  }

  return {
    user: {
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      membership: user.membership,
      avatar: user.avatar,
      bio: user.bio,
      twoFactorEnabled: user.twoFactorEnabled,
    },
    token,
  };
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    // Return success to avoid email enumeration
    return { success: true, message: "If that email exists, an OTP has been sent." };
  }
  return await requestOTP(email, "reset_password");
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  const verification = await verifyOTP(email, otp, "reset_password");
  if (!verification.valid) {
    const error = new Error(verification.message || "Invalid or expired OTP.");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  user.password = newPassword;
  await user.save();

  return { success: true, message: "Password reset successful. You can now login." };
};

export default { register, login, forgotPassword, resetPassword };
