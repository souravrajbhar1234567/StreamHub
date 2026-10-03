import mongoose from "mongoose";

const otpVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["register", "login", "reset_password", "2fa"],
      default: "reset_password",
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // Document automatically deletes upon expiration
    },
  },
  {
    timestamps: true,
  }
);

export const OTPVerification =
  mongoose.models.OTPVerification ||
  mongoose.model("OTPVerification", otpVerificationSchema);
export default OTPVerification;
