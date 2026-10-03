import express from "express";
import downloadController from "../controllers/downloadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkDownloadQuota } from "../middleware/downloadMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { downloadVideoValidator } from "../validators/downloadValidator.js";

const router = express.Router();

router.use(protect);

router.get("/", downloadController.getUserDownloads);
router.get("/quota", downloadController.getQuota);

router.post(
  "/:id",
  checkDownloadQuota,
  downloadVideoValidator,
  validateRequest,
  downloadController.downloadVideo
);

router.delete("/:downloadId", downloadController.deleteDownload);

export default router;
