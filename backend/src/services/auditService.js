import AuditLog from "../models/AuditLog.js";

export const getAuditLogs = async ({ page = 1, limit = 50, action = "", status = "" }) => {
  const query = {};
  if (action) query.action = action;
  if (status) query.status = status;

  const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
  const take = parseInt(limit, 10);

  const [logs, total] = await Promise.all([
    AuditLog.find(query).populate("user", "name email").sort({ createdAt: -1 }).skip(skip).limit(take),
    AuditLog.countDocuments(query),
  ]);

  return { logs, total, page: parseInt(page, 10), totalPages: Math.ceil(total / take) || 1 };
};

export default { getAuditLogs };
