import mongoose from "mongoose";

const meetingParticipantSchema = new mongoose.Schema(
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    displayName: {
      type: String,
      required: true,
    },
    socketId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["host", "co-host", "participant"],
      default: "participant",
    },
    audioMuted: {
      type: Boolean,
      default: false,
    },
    videoMuted: {
      type: Boolean,
      default: false,
    },
    handRaised: {
      type: Boolean,
      default: false,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    leftAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const MeetingParticipant =
  mongoose.models.MeetingParticipant ||
  mongoose.model("MeetingParticipant", meetingParticipantSchema);
export default MeetingParticipant;
