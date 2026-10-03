import commentService from "../services/commentService.js";
import moderationService from "../services/moderationService.js";
import translationService from "../services/translationService.js";

import { getClientIp } from "../utils/ipUtils.js";
import { lookupIpLocation } from "../services/geoLocationService.js";

export const getComments = async (req, res, next) => {
  try {
    const { sort } = req.query;
    const comments = await commentService.getComments(req.params.videoId, sort || "newest");
    res.status(200).json({ success: true, comments });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const ip = getClientIp(req);
    const loc = await lookupIpLocation(ip);
    const userLocation = loc ? `${loc.city}, ${loc.country}` : "India";

    const comment = await commentService.addComment(
      req.user._id,
      req.params.videoId,
      { ...req.body, userLocation }
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

export const editComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const comment = await commentService.editComment(
      req.user._id,
      req.params.commentId,
      text
    );
    res.status(200).json({
      success: true,
      message: "Comment updated.",
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
  editComment,
  deleteComment,
  reactToComment,
  reportComment,
  translateComment,
};
