import crypto from "crypto";
import { getRazorpayInstance } from "../config/razorpay.js";
import { ENV } from "../config/env.js";
import SubscriptionPlan from "../models/SubscriptionPlan.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import { activateSubscription } from "./subscriptionService.js";
import { generateInvoiceNumber, formatInvoiceData } from "../utils/generateInvoice.js";
import { sendEmail } from "./emailService.js";

export const createOrder = async (userId, planCode) => {
  const plan = await SubscriptionPlan.findOne({ code: planCode.toLowerCase() });
  if (!plan) {
    const error = new Error("Plan not found.");
    error.statusCode = 404;
    throw error;
  }

  if (plan.price === 0) {
    // Free plan activation directly
    const subscription = await activateSubscription(userId, "free");
    return { freePlan: true, subscription };
  }

  const razorpay = getRazorpayInstance();
  let orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  if (razorpay) {
    try {
      const order = await razorpay.orders.create({
        amount: Math.round(plan.price * 100), // amount in paise
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: { userId: userId.toString(), planCode },
      });
      orderId = order.id;
    } catch (err) {
      console.warn("⚠️ Razorpay order creation warning, using sandbox order ID:", err.message);
    }
  }

  const payment = await Payment.create({
    user: userId,
    plan: plan._id,
    planName: plan.name,
    amount: plan.price,
    currency: "INR",
    status: "created",
    razorpayOrderId: orderId,
    invoiceNumber: generateInvoiceNumber(),
  });

  return {
    orderId,
    amount: plan.price * 100,
    currency: "INR",
    keyId: ENV.RAZORPAY_KEY_ID,
    planName: plan.name,
    paymentId: payment._id,
  };
};

export const verifyPayment = async (
  userId,
  { razorpay_order_id, razorpay_payment_id, razorpay_signature, planCode }
) => {
  const razorpaySecret = ENV.RAZORPAY_KEY_SECRET;

  // Verify signature if secret configured
  if (razorpaySecret && razorpaySecret !== "YOUR_RAZORPAY_TEST_SECRET") {
    const expectedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      const error = new Error("Payment signature verification failed.");
      error.statusCode = 400;
      throw error;
    }
  }

  // Update payment status
  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "success",
    },
    { new: true }
  );

  const targetPlan = planCode || (payment ? payment.planName.toLowerCase() : "pro");
  const subscription = await activateSubscription(userId, targetPlan);

  // Send receipt email in background
  const user = await User.findById(userId);
  if (user && payment) {
    sendEmail({
      to: user.email,
      subject: "StreamHub - Payment Receipt",
      text: `Thank you for your payment of ₹${payment.amount} for the ${payment.planName} plan. Invoice: ${payment.invoiceNumber}`,
    }).catch(() => {});
  }

  return {
    success: true,
    payment,
    subscription,
  };
};

export const getPaymentHistory = async (userId) => {
  return await Payment.find({ user: userId }).sort({ createdAt: -1 });
};

export const getInvoice = async (paymentId, userId) => {
  const payment = await Payment.findById(paymentId).populate("user").populate("plan");
  if (!payment) {
    const error = new Error("Payment record not found.");
    error.statusCode = 404;
    throw error;
  }

  return formatInvoiceData({
    payment,
    user: payment.user,
    plan: payment.plan || { name: payment.planName },
  });
};

export default {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getInvoice,
};
