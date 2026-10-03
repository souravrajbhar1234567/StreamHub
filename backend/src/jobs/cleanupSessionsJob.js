import Session from "../models/Session.js";

export const cleanupExpiredSessions = async () => {
  try {
    const result = await Session.deleteMany({
      $or: [{ expiresAt: { $lt: new Date() } }, { isValid: false }],
    });
    if (result.deletedCount > 0) {
      console.log(`🧹 Cleaned up ${result.deletedCount} expired sessions.`);
    }
  } catch (error) {
    console.error("❌ Session cleanup job error:", error.message);
  }
};

export default cleanupExpiredSessions;
