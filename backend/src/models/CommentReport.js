import mongoose from "mongoose";

const commentReportSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
      index: true,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
      enum: ["spam", "harassment", "hate_speech", "misinformation", "copyright_violation", "inappropriate", "other"],
      default: "inappropriate",
    },
    details: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "resolved", "dismissed"],
      default: "pending",
      index: true,
    },
    moderatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    moderationNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const CommentReport =
  mongoose.models.CommentReport ||
  mongoose.model("CommentReport", commentReportSchema);
export default CommentReport;
