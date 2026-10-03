import SubscriptionPlan from "../models/SubscriptionPlan.js";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { addMonths } from "../utils/dateUtils.js";

export const getPlans = async () => {
  return await SubscriptionPlan.find({ isActive: true }).sort({ price: 1 });
};

export const getUserSubscription = async (userId) => {
  const sub = await Subscription.findOne({
    user: userId,
    status: "active",
  })
    .populate("plan")
    .sort({ createdAt: -1 });

  return sub;
};

export const activateSubscription = async (userId, planCode) => {
  const plan = await SubscriptionPlan.findOne({ code: planCode.toLowerCase() });
  if (!plan) {
    const error = new Error("Subscription plan not found.");
    error.statusCode = 404;
    throw error;
  }

  // Deactivate any currently active subscriptions for this user
  await Subscription.updateMany(
    { user: userId, status: "active" },
    { status: "cancelled" }
  );

  const startDate = new Date();
  const endDate = addMonths(startDate, 1);

  const subscription = await Subscription.create({
    user: userId,
    plan: plan._id,
    planName: plan.name,
    status: "active",
    startDate,
    endDate,
    autoRenew: true,
  });

  // Update user membership
  await User.findByIdAndUpdate(userId, { membership: plan.name });

  // Send notification
  await Notification.create({
    user: userId,
    title: "Subscription Activated",
    message: `You are now subscribed to the ${plan.name} plan! Enjoy high-speed streaming and offline downloads.`,
    type: "subscription",
    link: "/subscription",
  });

  return subscription;
};

export const cancelSubscription = async (userId) => {
  const sub = await Subscription.findOneAndUpdate(
    { user: userId, status: "active" },
    { autoRenew: false },
    { new: true }
  );

  if (!sub) {
    const error = new Error("No active subscription found to cancel.");
    error.statusCode = 404;
    throw error;
  }

  return sub;
};

export default {
  getPlans,
  getUserSubscription,
  activateSubscription,
  cancelSubscription,
};
