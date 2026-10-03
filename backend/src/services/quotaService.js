import DownloadRecord from "../models/DownloadRecord.js";
import { getQuotaForPlan } from "../utils/quotaUtils.js";
import { getStartOfMonth } from "../utils/dateUtils.js";

export const getUserQuota = async (user) => {
  const membership = user.membership || "Free";
  const quota = getQuotaForPlan(membership);

  const startOfMonth = getStartOfMonth();
  const usedThisMonth = await DownloadRecord.countDocuments({
    user: user._id,
    createdAt: { $gte: startOfMonth },
    status: "completed",
  });

  const remaining = Math.max(0, quota.downloadLimit - usedThisMonth);

  return {
    membership,
    downloadLimit: quota.downloadLimit,
    used: usedThisMonth,
    remaining,
    maxDevices: quota.maxDevices,
    maxResolution: quota.maxResolution,
    canCreateMeetings: quota.canCreateMeetings,
  };
};

export default { getUserQuota };
