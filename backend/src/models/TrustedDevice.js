import mongoose from "mongoose";

const trustedDeviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    deviceName: {
      type: String,
      default: "Browser Device",
    },
    browser: {
      type: String,
      default: "Chrome",
    },
    os: {
      type: String,
      default: "macOS",
    },
    ipAddress: {
      type: String,
      default: "127.0.0.1",
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
    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
    isTrusted: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trusted validity
    },
  },
  {
    timestamps: true,
  }
);

trustedDeviceSchema.index({ user: 1, deviceId: 1 }, { unique: true });

export const TrustedDevice =
  mongoose.models.TrustedDevice ||
  mongoose.model("TrustedDevice", trustedDeviceSchema);
export default TrustedDevice;
