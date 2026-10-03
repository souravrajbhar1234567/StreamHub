import OTPVerification from "../models/OTPVerification.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendOTPEmail } from "./emailService.js";

export const requestOTP = async (email, purpose = "reset_password") => {
  const otp = generateOTP(6);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Remove existing OTP for this email and purpose
  await OTPVerification.deleteMany({ email, purpose });

  await OTPVerification.create({
    email,
    otp,
    purpose,
    expiresAt,
  });

  await sendOTPEmail(email, otp);
  return { success: true, message: "OTP sent to your email." };
};

export const verifyOTP = async (email, otp, purpose = "reset_password") => {
  const record = await OTPVerification.findOne({
    email,
    otp,
    purpose,
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    return { valid: false, message: "Invalid or expired OTP." };
  }

  // Once verified, remove it
  await OTPVerification.findByIdAndDelete(record._id);
  return { valid: true };
};

export default { requestOTP, verifyOTP };
