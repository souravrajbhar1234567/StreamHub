export const PLAN_LIMITS = {
  Free: {
    downloadLimit: 1, // 1 download per day
    maxDevices: 1,
    maxResolution: "720p",
    canCreateMeetings: false,
    maxMeetingParticipants: 2,
    hasAdFree: false,
  },
  Bronze: {
    downloadLimit: 5, // 5 downloads per day
    maxDevices: 2,
    maxResolution: "1080p",
    canCreateMeetings: true,
    maxMeetingParticipants: 25,
    hasAdFree: false,
  },
  Silver: {
    downloadLimit: 15, // 15 downloads per day
    maxDevices: 3,
    maxResolution: "1080p",
    canCreateMeetings: true,
    maxMeetingParticipants: 50,
    hasAdFree: true,
  },
  Gold: {
    downloadLimit: 50, // 50 downloads per day (Unlimited tier)
    maxDevices: 5,
    maxResolution: "4K",
    canCreateMeetings: true,
    maxMeetingParticipants: 100,
    hasAdFree: true,
  },
  // Compatibility aliases
  Pro: {
    downloadLimit: 15,
    maxDevices: 3,
    maxResolution: "1080p",
    canCreateMeetings: true,
    maxMeetingParticipants: 50,
    hasAdFree: true,
  },
  Premium: {
    downloadLimit: 50,
    maxDevices: 5,
    maxResolution: "4K",
    canCreateMeetings: true,
    maxMeetingParticipants: 100,
    hasAdFree: true,
  },
};

export const getQuotaForPlan = (planName = "Free") => {
  const normalized =
    planName.charAt(0).toUpperCase() + planName.slice(1).toLowerCase();
  return PLAN_LIMITS[normalized] || PLAN_LIMITS[planName] || PLAN_LIMITS.Free;
};

export const canDownload = (planName, currentDailyDownloads) => {
  const quota = getQuotaForPlan(planName);
  return currentDailyDownloads < quota.downloadLimit;
};

export default { PLAN_LIMITS, getQuotaForPlan, canDownload };
