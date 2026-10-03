import express from "express";
import meetingController from "../controllers/meetingController.js";
import { protect, optionalAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { createMeetingValidator } from "../validators/meetingValidator.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createMeetingValidator,
  validateRequest,
  meetingController.createMeeting
);

router.get("/:roomId", optionalAuth, meetingController.getMeeting);
router.post("/:roomId/end", protect, meetingController.endMeeting);
router.get("/:roomId/messages", optionalAuth, meetingController.getMessages);
router.post("/:roomId/messages", optionalAuth, meetingController.sendMessage);

export default router;
