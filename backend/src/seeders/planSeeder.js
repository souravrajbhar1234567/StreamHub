import SubscriptionPlan from "../models/SubscriptionPlan.js";

export const seedPlans = async () => {
  try {
    const plans = [
      {
        code: "free",
        name: "Free",
        price: 0,
        currency: "INR",
        interval: "month",
        features: [
          "Watch free videos",
          "Basic 720p streaming",
          "Personal user profile",
          "Community comments",
        ],
        downloadLimit: 0,
        maxDevices: 1,
        maxResolution: "720p",
        isActive: true,
      },
      {
        code: "pro",
        name: "Pro",
        price: 299,
        currency: "INR",
        interval: "month",
        features: [
          "1080p Full HD streaming",
          "Download up to 25 videos offline",
          "Full watch history & resume playback",
          "Ad-free experience",
          "Host video meetings up to 50 people",
        ],
        downloadLimit: 25,
        maxDevices: 3,
        maxResolution: "1080p",
        isActive: true,
      },
      {
        code: "premium",
        name: "Premium",
        price: 599,
        currency: "INR",
        interval: "month",
        features: [
          "Ultra HD 4K streaming",
          "100 offline video downloads",
          "Exclusive masterclasses & live sessions",
          "Up to 5 simultaneous devices",
          "Priority 24/7 dedicated support",
          "Advanced meeting room controls",
        ],
        downloadLimit: 100,
        maxDevices: 5,
        maxResolution: "4K",
        isActive: true,
      },
    ];

    for (const plan of plans) {
      await SubscriptionPlan.findOneAndUpdate({ code: plan.code }, plan, {
        upsert: true,
        new: true,
      });
    }
    console.log("🌱 Subscription plans seeded successfully.");
  } catch (error) {
    console.error("❌ Plans seeding error:", error.message);
  }
};

export default seedPlans;
