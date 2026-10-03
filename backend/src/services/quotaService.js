import DownloadRecord from "../models/DownloadRecord.js";
import { getQuotaForPlan } from "../utils/quotaUtils.js";
import { getStartOfDay } from "../utils/dateUtils.js";

export const getUserQuota = async (user) => {
  const membership = user.membership || "Free";
  const quota = getQuotaForPlan(membership);

  // Daily quota reset calculation
  const startOfDay = getStartOfDay ? getStartOfDay() : new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const usedToday = await DownloadRecord.countDocuments({
    user: user._id,
    createdAt: { $gte: startOfDay },
    status: "completed",
  });

  const remaining = Math.max(0, quota.downloadLimit - usedToday);

  return {
    membership,
    downloadLimit: quota.downloadLimit,
    used: usedToday,
    remaining,
    maxDevices: quota.maxDevices,
    maxResolution: quota.maxResolution,
    canCreateMeetings: quota.canCreateMeetings,
    maxMeetingParticipants: quota.maxMeetingParticipants,
    hasAdFree: quota.hasAdFree,
  };
};

export default { getUserQuota };
