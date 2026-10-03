import Comment from "../models/Comment.js";
import CommentReaction from "../models/CommentReaction.js";
import { moderateText } from "./moderationService.js";

export const getComments = async (videoId, sortBy = "newest") => {
  let sortCriteria = { createdAt: -1 };
  if (sortBy === "oldest") sortCriteria = { createdAt: 1 };
  else if (sortBy === "most_liked") sortCriteria = { likesCount: -1, createdAt: -1 };
  else if (sortBy === "most_relevant") sortCriteria = { likesCount: -1, dislikesCount: 1, createdAt: -1 };

  const comments = await Comment.find({
    video: videoId,
    parentComment: null,
    isModerated: false,
  })
    .populate("user", "name avatar membership")
    .sort(sortCriteria);

  // Load nested replies
  const commentIds = comments.map((c) => c._id);
  const replies = await Comment.find({
    parentComment: { $in: commentIds },
    isModerated: false,
  })
    .populate("user", "name avatar membership")
    .sort({ createdAt: 1 });

  const replyMap = {};
  replies.forEach((r) => {
    const parentId = r.parentComment.toString();
    if (!replyMap[parentId]) replyMap[parentId] = [];
    replyMap[parentId].push(r);
  });

  return comments.map((c) => {
    const obj = c.toObject();
    obj.replies = replyMap[c._id.toString()] || [];
    return obj;
  });
};

export const addComment = async (
  userId,
  videoId,
  { text, content, parentCommentId, userLocation = "India" }
) => {
  const commentText = (text || content || "").trim();
  if (!commentText) {
    const error = new Error("Comment text is required.");
    error.statusCode = 400;
    throw error;
  }

  // Prevent duplicate comments posted within 60 seconds
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const duplicate = await Comment.findOne({
    user: userId,
    video: videoId,
    text: commentText,
    createdAt: { $gte: oneMinuteAgo },
  });
  if (duplicate) {
    const error = new Error("Duplicate comment detected. Please wait before posting identical content.");
    error.statusCode = 429;
    throw error;
  }

  // Check for repeated special characters or emoji flooding (e.g. repeated 8+ times)
  if (/(.)\1{7,}/.test(commentText)) {
    const error = new Error("Comment contains excessive repeated characters or spam patterns.");
    error.statusCode = 400;
    throw error;
  }

  // Automatic moderation check (profanity, malicious links)
  const modResult = moderateText(commentText);

  // Extract @mentions
  const mentions = (commentText.match(/@(\w+)/g) || []).map((m) => m.slice(1));

  const comment = await Comment.create({
    video: videoId,
    user: userId,
    parentComment: parentCommentId || null,
    text: modResult.cleanText,
    userLocation,
    mentions,
    isModerated: modResult.flagged,
  });

  return await comment.populate("user", "name avatar membership");
};

export const editComment = async (userId, commentId, newText) => {
  const text = (newText || "").trim();
  if (!text) {
    const error = new Error("Updated comment text cannot be empty.");
    error.statusCode = 400;
    throw error;
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    const error = new Error("Comment not found.");
    error.statusCode = 404;
    throw error;
  }

  if (comment.user.toString() !== userId.toString()) {
    const error = new Error("You can only edit your own comments.");
    error.statusCode = 403;
    throw error;
  }

  // Enforce 15-minute editing time limit
  const fifteenMinutesMs = 15 * 60 * 1000;
  const timeElapsed = Date.now() - new Date(comment.createdAt).getTime();
  if (timeElapsed > fifteenMinutesMs) {
    const error = new Error("Comments can only be edited within 15 minutes of posting.");
    error.statusCode = 400;
    throw error;
  }

  const modResult = moderateText(text);
  const mentions = (text.match(/@(\w+)/g) || []).map((m) => m.slice(1));

  comment.text = modResult.cleanText;
  comment.isEdited = true;
  comment.editedAt = new Date();
  comment.mentions = mentions;
  comment.isModerated = modResult.flagged;
  await comment.save();

  return await comment.populate("user", "name avatar membership");
};

export const deleteComment = async (userId, userRole, commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    const error = new Error("Comment not found.");
    error.statusCode = 404;
    throw error;
  }

  if (comment.user.toString() !== userId.toString() && userRole !== "admin") {
    const error = new Error("You do not have permission to delete this comment.");
    error.statusCode = 403;
    throw error;
  }

  await Comment.deleteMany({
    $or: [{ _id: commentId }, { parentComment: commentId }],
  });

  return { success: true };
};

export const reactToComment = async (userId, commentId, reactionType) => {
  const existing = await CommentReaction.findOne({
    comment: commentId,
    user: userId,
  });

  if (existing) {
    if (existing.type === reactionType) {
      // Toggle off
      await CommentReaction.findByIdAndDelete(existing._id);
      const decField = reactionType === "like" ? "likesCount" : "dislikesCount";
      await Comment.findByIdAndUpdate(commentId, { $inc: { [decField]: -1 } });
      return { status: "removed" };
    } else {
      // Switch reaction
      existing.type = reactionType;
      await existing.save();
      const incField = reactionType === "like" ? "likesCount" : "dislikesCount";
      const decField = reactionType === "like" ? "dislikesCount" : "likesCount";
      await Comment.findByIdAndUpdate(commentId, {
        $inc: { [incField]: 1, [decField]: -1 },
      });
      return { status: "updated", type: reactionType };
    }
  }

  await CommentReaction.create({
    comment: commentId,
    user: userId,
    type: reactionType,
  });

  const incField = reactionType === "like" ? "likesCount" : "dislikesCount";
  await Comment.findByIdAndUpdate(commentId, { $inc: { [incField]: 1 } });
  return { status: "added", type: reactionType };
};

export default {
  getComments,
  addComment,
  editComment,
  deleteComment,
  reactToComment,
};
