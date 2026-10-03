import { body } from "express-validator";

export const createOrderValidator = [
  body("planCode")
    .trim()
    .notEmpty()
    .withMessage("Plan code is required"),
];

export const verifyPaymentValidator = [
  body("razorpay_order_id")
    .trim()
    .notEmpty()
    .withMessage("Razorpay order ID is required"),
  body("razorpay_payment_id")
    .trim()
    .notEmpty()
    .withMessage("Razorpay payment ID is required"),
  body("razorpay_signature")
    .trim()
    .notEmpty()
    .withMessage("Razorpay signature is required"),
];

export default { createOrderValidator, verifyPaymentValidator };
