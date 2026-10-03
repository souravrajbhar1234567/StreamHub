import express from "express";
import authController from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validators/authValidator.js";
import { authLimiter } from "../middleware/rateLimitMiddleware.js";
import { verifyCaptcha } from "../middleware/captchaMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  verifyCaptcha,
  registerValidator,
  validateRequest,
  authController.register
);

router.post(
  "/login",
  authLimiter,
  verifyCaptcha,
  loginValidator,
  validateRequest,
  authController.login
);

router.get("/me", protect, authController.getMe);
router.post("/logout", protect, authController.logout);

router.post(
  "/forgot-password",
  authLimiter,
  forgotPasswordValidator,
  validateRequest,
  authController.forgotPassword
);

router.post(
  "/reset-password",
  authLimiter,
  resetPasswordValidator,
  validateRequest,
  authController.resetPassword
);

export default router;
