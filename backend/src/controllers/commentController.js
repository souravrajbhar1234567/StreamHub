import commentService from "../services/commentService.js";
import moderationService from "../services/moderationService.js";
import translationService from "../services/translationService.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await commentService.getComments(req.params.videoId);
    res.status(200).json({ success: true, comments });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const comment = await commentService.addComment(
      req.user._id,
      req.params.videoId,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Comment posted.",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(
      req.user._id,
      req.user.role,
      req.params.commentId
    );
    res.status(200).json({ success: true, message: "Comment deleted." });
  } catch (error) {
    next(error);
  }
};

export const reactToComment = async (req, res, next) => {
  try {
    const { reactionType } = req.body; // 'like' or 'dislike'
    const result = await commentService.reactToComment(
      req.user._id,
      req.params.commentId,
      reactionType
    );
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const reportComment = async (req, res, next) => {
  try {
    const report = await moderationService.reportComment(
      req.user._id,
      req.params.commentId,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Report submitted for review. Thank you for keeping our community safe.",
      report,
    });
  } catch (error) {
    next(error);
  }
};

export const translateComment = async (req, res, next) => {
  try {
    const { text, targetLang } = req.body;
    const result = await translationService.translateText(text, targetLang);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export default {
  getComments,
  addComment,
  deleteComment,
  reactToComment,
  reportComment,
  translateComment,
};
