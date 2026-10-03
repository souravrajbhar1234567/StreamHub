import express from "express";
import videoController from "../controllers/videoController.js";
import commentController from "../controllers/commentController.js";
import { protect, optionalAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { createVideoValidator } from "../validators/videoValidator.js";
import { addCommentValidator } from "../validators/commentValidator.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { commentLimiter } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.get("/categories", videoController.getCategories);
router.get("/", optionalAuth, videoController.getVideos);
router.get("/:id", optionalAuth, videoController.getVideoById);
router.get("/:id/stream", videoController.streamVideo);
router.post("/:id/like", protect, videoController.likeVideo);

// Video comments
router.get("/:videoId/comments", commentController.getComments);
router.post(
  "/:videoId/comments",
  protect,
  commentLimiter,
  addCommentValidator,
  validateRequest,
  commentController.addComment
);

// Admin video operations
router.post(
  "/",
  protect,
  requireAdmin,
  upload.single("video"),
  createVideoValidator,
  validateRequest,
  videoController.createVideo
);
router.put("/:id", protect, requireAdmin, videoController.updateVideo);
router.delete("/:id", protect, requireAdmin, videoController.deleteVideo);

export default router;
