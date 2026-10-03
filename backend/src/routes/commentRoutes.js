import express from "express";
import commentController from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { reportCommentValidator } from "../validators/commentValidator.js";

const router = express.Router();

router.delete("/:commentId", protect, commentController.deleteComment);
router.post("/:commentId/react", protect, commentController.reactToComment);
router.post(
  "/:commentId/report",
  protect,
  reportCommentValidator,
  validateRequest,
  commentController.reportComment
);
router.post("/translate", commentController.translateComment);

export default router;
