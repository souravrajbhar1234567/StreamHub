import Comment from "../models/Comment.js";
import CommentReaction from "../models/CommentReaction.js";
import { moderateText } from "./moderationService.js";

export const getComments = async (videoId) => {
  const comments = await Comment.find({
    video: videoId,
    parentComment: null,
    isModerated: false,
  })
    .populate("user", "name avatar membership")
    .sort({ createdAt: -1 });

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

export const addComment = async (userId, videoId, { text, content, parentCommentId }) => {
  const commentText = text || content;
  if (!commentText || !commentText.trim()) {
    const error = new Error("Comment text is required.");
    error.statusCode = 400;
    throw error;
  }

  // Automatic moderation check
  const modResult = moderateText(commentText);

  const comment = await Comment.create({
    video: videoId,
    user: userId,
    parentComment: parentCommentId || null,
    text: modResult.cleanText,
    isModerated: modResult.flagged,
  });

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
  deleteComment,
  reactToComment,
};
