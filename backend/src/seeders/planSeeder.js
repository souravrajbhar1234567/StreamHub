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
          "1 offline download per day",
          "Personal profile & community comments",
          "Join video meetings",
        ],
        downloadLimit: 1,
        maxDevices: 1,
        maxResolution: "720p",
        isActive: true,
      },
      {
        code: "bronze",
        name: "Bronze",
        price: 199,
        currency: "INR",
        interval: "month",
        features: [
          "Full 1080p HD streaming",
          "5 offline downloads per day",
          "Watch history & progress auto-sync",
          "Create meetings up to 25 participants",
          "Up to 2 simultaneous devices",
        ],
        downloadLimit: 5,
        maxDevices: 2,
        maxResolution: "1080p",
        isActive: true,
      },
      {
        code: "silver",
        name: "Silver",
        price: 499,
        currency: "INR",
        interval: "month",
        features: [
          "1080p Full HD & High Bitrate",
          "15 offline downloads per day",
          "Ad-free viewing experience",
          "Host meetings up to 50 participants",
          "Screen sharing & in-call file transfer",
          "Up to 3 simultaneous devices",
        ],
        downloadLimit: 15,
        maxDevices: 3,
        maxResolution: "1080p",
        isActive: true,
      },
      {
        code: "gold",
        name: "Gold",
        price: 999,
        currency: "INR",
        interval: "month",
        features: [
          "Ultra HD 4K streaming quality",
          "50 offline downloads per day (Unlimited tier)",
          "Exclusive masterclasses & webinars",
          "Host meetings up to 100 participants",
          "Meeting recording & transcript access",
          "Up to 5 simultaneous devices",
          "Priority 24/7 dedicated support",
        ],
        downloadLimit: 50,
        maxDevices: 5,
        maxResolution: "4K",
        isActive: true,
      },
      // Aliases for compatibility
      {
        code: "pro",
        name: "Silver",
        price: 499,
        currency: "INR",
        interval: "month",
        features: [
          "1080p Full HD & High Bitrate",
          "15 offline downloads per day",
          "Ad-free viewing experience",
          "Host meetings up to 50 participants",
          "Up to 3 simultaneous devices",
        ],
        downloadLimit: 15,
        maxDevices: 3,
        maxResolution: "1080p",
        isActive: true,
      },
      {
        code: "premium",
        name: "Gold",
        price: 999,
        currency: "INR",
        interval: "month",
        features: [
          "Ultra HD 4K streaming quality",
          "50 offline downloads per day",
          "Exclusive masterclasses & live sessions",
          "Host meetings up to 100 participants",
          "Up to 5 simultaneous devices",
          "Priority 24/7 dedicated support",
        ],
        downloadLimit: 50,
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
    console.log("🌱 Subscription plans (Free, Bronze, Silver, Gold) seeded successfully.");
  } catch (error) {
    console.error("❌ Plans seeding error:", error.message);
  }
};

export default seedPlans;
