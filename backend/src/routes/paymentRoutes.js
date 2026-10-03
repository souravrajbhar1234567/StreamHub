import express from "express";
import paymentController from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import {
  createOrderValidator,
  verifyPaymentValidator,
} from "../validators/paymentValidator.js";

const router = express.Router();

router.use(protect);

router.post(
  "/order",
  createOrderValidator,
  validateRequest,
  paymentController.createOrder
);

router.post(
  "/verify",
  verifyPaymentValidator,
  validateRequest,
  paymentController.verifyPayment
);

router.get("/history", paymentController.getPaymentHistory);
router.get("/invoice/:paymentId", paymentController.getInvoice);

export default router;
