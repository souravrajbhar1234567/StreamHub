import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Meeting title is required"],
      trim: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hostName: {
      type: String,
      default: "Host",
    },
    passcode: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["scheduled", "active", "ended"],
      default: "active",
      index: true,
    },
    scheduledFor: {
      type: Date,
      default: null,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
      default: null,
    },
    maxParticipants: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

export const Meeting =
  mongoose.models.Meeting || mongoose.model("Meeting", meetingSchema);
export default Meeting;
