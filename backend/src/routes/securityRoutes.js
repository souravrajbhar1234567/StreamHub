import express from "express";
import securityController from "../controllers/securityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/overview", securityController.getSecurityOverview);

export default router;
