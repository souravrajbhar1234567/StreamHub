import express from "express";
import subscriptionController from "../controllers/subscriptionController.js";
import { protect, optionalAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { subscribeValidator } from "../validators/subscriptionValidator.js";

const router = express.Router();

router.get("/plans", optionalAuth, subscriptionController.getPlans);
router.get("/my", protect, subscriptionController.getMySubscription);
router.post(
  "/subscribe",
  protect,
  subscribeValidator,
  validateRequest,
  subscriptionController.activateSubscription
);
router.post("/cancel", protect, subscriptionController.cancelSubscription);

export default router;
