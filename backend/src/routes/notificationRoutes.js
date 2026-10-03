import express from "express";
import notificationController from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", notificationController.getNotifications);
router.put("/read-all", notificationController.markAsRead);
router.delete("/:id", notificationController.deleteNotification);

export default router;
