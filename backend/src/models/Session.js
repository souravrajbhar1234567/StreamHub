import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      index: true,
    },
    ipAddress: {
      type: String,
      default: "127.0.0.1",
    },
    userAgent: {
      type: String,
      default: "",
    },
    browser: {
      type: String,
      default: "Unknown Browser",
    },
    os: {
      type: String,
      default: "Unknown OS",
    },
    deviceType: {
      type: String,
      default: "Desktop",
    },
    city: {
      type: String,
      default: "Mumbai",
    },
    region: {
      type: String,
      default: "Maharashtra",
    },
    country: {
      type: String,
      default: "India",
    },
    isValid: {
      type: Boolean,
      default: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
export default Session;
