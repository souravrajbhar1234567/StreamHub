import CommentReport from "../models/CommentReport.js";
import Comment from "../models/Comment.js";

const BLOCKED_WORDS = ["spam", "scam", "phishing", "hate", "abuse"];

export const moderateText = (text) => {
  let cleanText = text;
  let flagged = false;

  for (const word of BLOCKED_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    if (regex.test(cleanText)) {
      cleanText = cleanText.replace(regex, "****");
      flagged = false; // We clean it automatically
    }
  }

  return { cleanText, flagged };
};

export const reportComment = async (userId, commentId, { reason, details }) => {
  const report = await CommentReport.create({
    comment: commentId,
    reporter: userId,
    reason,
    details: details || "",
  });
  return report;
};

export const getReports = async () => {
  return await CommentReport.find()
    .populate("reporter", "name email")
    .populate({
      path: "comment",
      populate: { path: "user", select: "name email" },
    })
    .sort({ createdAt: -1 });
};

export const resolveReport = async (reportId, adminId, action, moderationNote) => {
  const report = await CommentReport.findById(reportId);
  if (!report) {
    const error = new Error("Report not found.");
    error.statusCode = 404;
    throw error;
  }

  report.status = action === "delete" ? "resolved" : "dismissed";
  report.moderatedBy = adminId;
  report.moderationNote = moderationNote || "";
  await report.save();

  if (action === "delete") {
    await Comment.findByIdAndUpdate(report.comment, { isModerated: true });
  }

  return report;
};

export default { moderateText, reportComment, getReports, resolveReport };
