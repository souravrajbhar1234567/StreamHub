import mongoose from "mongoose";

const commentReactionSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

commentReactionSchema.index({ comment: 1, user: 1 }, { unique: true });

export const CommentReaction =
  mongoose.models.CommentReaction ||
  mongoose.model("CommentReaction", commentReactionSchema);
export default CommentReaction;
