export const PLAN_LIMITS = {
  Free: {
    downloadLimit: 0,
    maxDevices: 1,
    maxResolution: "720p",
    canCreateMeetings: false,
  },
  Pro: {
    downloadLimit: 25,
    maxDevices: 3,
    maxResolution: "1080p",
    canCreateMeetings: true,
  },
  Premium: {
    downloadLimit: 100,
    maxDevices: 5,
    maxResolution: "4K",
    canCreateMeetings: true,
  },
};

export const getQuotaForPlan = (planName = "Free") => {
  return PLAN_LIMITS[planName] || PLAN_LIMITS.Free;
};

export const canDownload = (planName, currentMonthlyDownloads) => {
  const quota = getQuotaForPlan(planName);
  return currentMonthlyDownloads < quota.downloadLimit;
};

export default { PLAN_LIMITS, getQuotaForPlan, canDownload };
