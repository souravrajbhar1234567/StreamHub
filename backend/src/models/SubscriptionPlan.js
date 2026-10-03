import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    interval: {
      type: String,
      enum: ["month", "year"],
      default: "month",
    },
    features: [
      {
        type: String,
      },
    ],
    downloadLimit: {
      type: Number,
      default: 0,
    },
    maxDevices: {
      type: Number,
      default: 1,
    },
    maxResolution: {
      type: String,
      default: "720p",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SubscriptionPlan =
  mongoose.models.SubscriptionPlan ||
  mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
export default SubscriptionPlan;
