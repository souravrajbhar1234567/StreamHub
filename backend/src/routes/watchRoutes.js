import express from "express";
import watchController from "../controllers/watchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/progress/:videoId", watchController.updateProgress);
router.get("/progress/:videoId", watchController.getProgress);
router.get("/continue", watchController.getContinueWatching);
router.get("/history", watchController.getWatchHistory);
router.delete("/history", watchController.clearWatchHistory);

export default router;
