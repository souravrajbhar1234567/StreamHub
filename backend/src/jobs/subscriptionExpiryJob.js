import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const checkSubscriptionExpiries = async () => {
  try {
    const now = new Date();
    // Find active subscriptions that have passed their end date
    const expiredSubs = await Subscription.find({
      status: "active",
      endDate: { $lt: now },
    });

    for (const sub of expiredSubs) {
      sub.status = "expired";
      await sub.save();

      // Downgrade user to Free
      await User.findByIdAndUpdate(sub.user, { membership: "Free" });

      // Send in-app notification
      await Notification.create({
        user: sub.user,
        title: "Subscription Expired",
        message: `Your ${sub.planName} subscription has expired. Upgrade anytime to restore premium features.`,
        type: "warning",
        link: "/plans",
      });
    }

    if (expiredSubs.length > 0) {
      console.log(`⏰ Processed ${expiredSubs.length} expired subscriptions.`);
    }
  } catch (error) {
    console.error("❌ Subscription expiry job error:", error.message);
  }
};

export default checkSubscriptionExpiries;
