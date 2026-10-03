import Notification from "../models/Notification.js";

export const cleanupOldNotifications = async () => {
  try {
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const result = await Notification.deleteMany({
      createdAt: { $lt: sixtyDaysAgo },
      isRead: true,
    });
    if (result.deletedCount > 0) {
      console.log(`📬 Purged ${result.deletedCount} old read notifications.`);
    }
  } catch (error) {
    console.error("❌ Notification cleanup job error:", error.message);
  }
};

export default cleanupOldNotifications;
