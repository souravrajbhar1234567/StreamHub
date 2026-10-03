import { body } from "express-validator";

export const createOrderValidator = [
  body("planCode")
    .trim()
    .notEmpty()
    .withMessage("Plan code is required"),
];

export const verifyPaymentValidator = [
  body("razorpay_payment_id")
    .trim()
    .notEmpty()
    .withMessage("Razorpay payment ID is required"),
  body("razorpay_order_id").optional().trim(),
  body("razorpay_signature").optional().trim(),
  body("planCode").optional().trim(),
];

export default { createOrderValidator, verifyPaymentValidator };
