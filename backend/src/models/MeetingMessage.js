import mongoose from "mongoose";

const meetingMessageSchema = new mongoose.Schema(
  {
    meeting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
      index: true,
    },
    roomId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    senderName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    fileUrl: {
      type: String,
      default: null,
    },
    fileName: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const MeetingMessage =
  mongoose.models.MeetingMessage ||
  mongoose.model("MeetingMessage", meetingMessageSchema);
export default MeetingMessage;
