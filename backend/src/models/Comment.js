import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      maxlength: 1000,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikesCount: {
      type: Number,
      default: 0,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
      default: null,
    },
    userLocation: {
      type: String,
      default: "India",
    },
    mentions: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      default: "en",
    },
    isModerated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
