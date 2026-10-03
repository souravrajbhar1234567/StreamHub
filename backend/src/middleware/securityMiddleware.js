import { getClientIp } from "../utils/ipUtils.js";
import AuditLog from "../models/AuditLog.js";

export const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
};

export const logSecurityEvent = async (action, req, details = {}) => {
  try {
    await AuditLog.create({
      user: req.user?._id || null,
      userEmail: req.user?.email || "Anonymous",
      action,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"] || "",
      details,
    });
  } catch (err) {
    // Avoid crashing if audit logging fails
  }
};

export default { securityHeaders, logSecurityEvent };
