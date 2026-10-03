import express from "express";
import userController from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.put("/change-password", userController.changePassword);

router.get("/sessions", userController.getSessions);
router.delete("/sessions/:sessionId", userController.revokeSession);

router.get("/devices", userController.getDevices);
router.delete("/devices/:deviceId", userController.removeDevice);

export default router;
