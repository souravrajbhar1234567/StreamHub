import TrustedDevice from "../models/TrustedDevice.js";
import Session from "../models/Session.js";
import AuditLog from "../models/AuditLog.js";

export const getSecurityOverview = async (userId) => {
  const [sessions, devices, recentLogs] = await Promise.all([
    Session.find({ user: userId, isValid: true }).sort({ createdAt: -1 }),
    TrustedDevice.find({ user: userId }).sort({ lastUsedAt: -1 }),
    AuditLog.find({ user: userId }).sort({ createdAt: -1 }).limit(10),
  ]);

  return {
    activeSessionsCount: sessions.length,
    trustedDevicesCount: devices.length,
    sessions,
    devices,
    recentLogs,
  };
};

export default { getSecurityOverview };
