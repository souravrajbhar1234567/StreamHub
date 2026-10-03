import DownloadRecord from "../models/DownloadRecord.js";
import { getQuotaForPlan } from "../utils/quotaUtils.js";
import { getStartOfMonth } from "../utils/dateUtils.js";

export const checkDownloadQuota = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please login to download videos.",
    });
  }

  // Admins bypass quota
  if (req.user.role === "admin") {
    return next();
  }

  const membership = req.user.membership || "Free";
  const quota = getQuotaForPlan(membership);

  if (quota.downloadLimit === 0) {
    return res.status(403).json({
      success: false,
      requiresUpgrade: true,
      message: "Your current Free plan does not support video downloads. Please upgrade to Pro or Premium.",
    });
  }

  const startOfMonth = getStartOfMonth();
  const downloadCount = await DownloadRecord.countDocuments({
    user: req.user._id,
    createdAt: { $gte: startOfMonth },
    status: "completed",
  });

  if (downloadCount >= quota.downloadLimit) {
    return res.status(403).json({
      success: false,
      requiresUpgrade: true,
      message: `You have reached your monthly download limit of ${quota.downloadLimit} videos. Upgrade to Premium for higher quota.`,
      used: downloadCount,
      limit: quota.downloadLimit,
    });
  }

  req.downloadQuota = {
    used: downloadCount,
    limit: quota.downloadLimit,
    remaining: quota.downloadLimit - downloadCount,
  };

  next();
};

export default checkDownloadQuota;
