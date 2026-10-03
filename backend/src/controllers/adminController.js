import User from "../models/User.js";
import Video from "../models/Video.js";
import Subscription from "../models/Subscription.js";
import Payment from "../models/Payment.js";
import Meeting from "../models/Meeting.js";
import DownloadRecord from "../models/DownloadRecord.js";
import moderationService from "../services/moderationService.js";
import auditService from "../services/auditService.js";

export const getStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalVideos,
      activeSubscriptions,
      payments,
      totalDownloads,
      activeMeetings,
    ] = await Promise.all([
      User.countDocuments(),
      Video.countDocuments(),
      Subscription.countDocuments({ status: "active" }),
      Payment.find({ status: "success" }),
      DownloadRecord.countDocuments({ status: "completed" }),
      Meeting.countDocuments({ status: "active" }),
    ]);

    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalVideos,
        activeSubscriptions,
        totalRevenue,
        totalDownloads,
        activeMeetings,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { search = "", role = "", page = 1, limit = 20 } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (role) query.role = role;

    const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const [users, total] = await Promise.all([
      User.find(query).select("-password").sort({ createdAt: -1 }).skip(skip).limit(take),
      User.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      users,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / take) || 1,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { role, membership, status } = req.body;
    const updateData = {};
    if (role) updateData.role = role;
    if (membership) updateData.membership = membership;
    if (status) updateData.status = status;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user", "name email")
      .populate("plan")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, payments });
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const reports = await moderationService.getReports();
    res.status(200).json({ success: true, reports });
  } catch (error) {
    next(error);
  }
};

export const resolveReport = async (req, res, next) => {
  try {
    const { action, note } = req.body;
    const report = await moderationService.resolveReport(
      req.params.reportId,
      req.user._id,
      action,
      note
    );
    res.status(200).json({
      success: true,
      message: "Report resolved.",
      report,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMeetings = async (req, res, next) => {
  try {
    const meetings = await Meeting.find()
      .populate("host", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, meetings });
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req, res, next) => {
  try {
    const result = await auditService.getAuditLogs(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getAllDownloads = async (req, res, next) => {
  try {
    const downloads = await DownloadRecord.find()
      .populate("user", "name email")
      .populate("video", "title")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, downloads });
  } catch (error) {
    next(error);
  }
};

export default {
  getStats,
  getUsers,
  updateUser,
  getAllSubscriptions,
  getAllPayments,
  getAllDownloads,
  getReports,
  resolveReport,
  getAllMeetings,
  getAuditLogs,
};
