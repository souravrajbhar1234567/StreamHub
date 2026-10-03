import authService from "../services/authService.js";
import Session from "../models/Session.js";
import { hashString } from "../utils/encryption.js";
import { logSecurityEvent } from "../middleware/securityMiddleware.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register({ name, email, password });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    logSecurityEvent("USER_REGISTER", req, { email });

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password, req });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    logSecurityEvent("USER_LOGIN_SUCCESS", req, { email });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      ...result,
    });
  } catch (error) {
    logSecurityEvent("USER_LOGIN_FAILED", req, { email: req.body?.email });
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    if (req.token) {
      const tokenHash = hashString(req.token);
      await Session.findOneAndUpdate({ tokenHash }, { isValid: false });
    }

    res.clearCookie("token");

    logSecurityEvent("USER_LOGOUT", req);

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await authService.resetPassword({ email, otp, newPassword });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
};
