import express from "express";
import adminController from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(protect, requireAdmin);

router.get("/stats", adminController.getStats);
router.get("/users", adminController.getUsers);
router.put("/users/:id", adminController.updateUser);

router.get("/subscriptions", adminController.getAllSubscriptions);
router.get("/payments", adminController.getAllPayments);
router.get("/downloads", adminController.getAllDownloads);
router.get("/meetings", adminController.getAllMeetings);

router.get("/reports", adminController.getReports);
router.post("/reports/:reportId/resolve", adminController.resolveReport);

router.get("/audit-logs", adminController.getAuditLogs);

export default router;
