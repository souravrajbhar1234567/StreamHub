import OTPVerification from "../models/OTPVerification.js";

export const cleanupExpiredOTPs = async () => {
  try {
    const result = await OTPVerification.deleteMany({
      expiresAt: { $lt: new Date() },
    });
    if (result.deletedCount > 0) {
      console.log(`🔐 Cleaned up ${result.deletedCount} expired OTP records.`);
    }
  } catch (error) {
    console.error("❌ OTP cleanup job error:", error.message);
  }
};

export default cleanupExpiredOTPs;
