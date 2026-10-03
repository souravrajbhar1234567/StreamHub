import Meeting from "../models/Meeting.js";
import MeetingParticipant from "../models/MeetingParticipant.js";
import MeetingMessage from "../models/MeetingMessage.js";
import { generateRoomId } from "../utils/generateRoomId.js";

export const createMeeting = async (userId, userName, { title, passcode, scheduledFor }) => {
  const roomId = generateRoomId();

  const meeting = await Meeting.create({
    roomId,
    title: title || "StreamHub Video Meeting",
    host: userId,
    hostName: userName || "Host",
    passcode: passcode || "",
    scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
    status: "active",
  });

  return meeting;
};

export const getMeetingByRoomId = async (roomId) => {
  const meeting = await Meeting.findOne({ roomId }).populate("host", "name email avatar");
  if (!meeting) {
    const error = new Error("Meeting room not found.");
    error.statusCode = 404;
    throw error;
  }
  return meeting;
};

export const endMeeting = async (roomId, userId) => {
  const meeting = await Meeting.findOne({ roomId });
  if (!meeting) {
    const error = new Error("Meeting not found.");
    error.statusCode = 404;
    throw error;
  }

  meeting.status = "ended";
  meeting.endedAt = new Date();
  await meeting.save();

  return meeting;
};

export const getMeetingMessages = async (roomId) => {
  return await MeetingMessage.find({ roomId })
    .populate("sender", "name avatar")
    .sort({ createdAt: 1 })
    .limit(100);
};

export const saveMeetingMessage = async ({ roomId, senderId, senderName, message, fileUrl, fileName }) => {
  const meeting = await Meeting.findOne({ roomId });
  const msg = await MeetingMessage.create({
    meeting: meeting?._id,
    roomId,
    sender: senderId || null,
    senderName: senderName || "Guest",
    message,
    fileUrl: fileUrl || null,
    fileName: fileName || null,
  });
  return msg;
};

export default {
  createMeeting,
  getMeetingByRoomId,
  endMeeting,
  getMeetingMessages,
  saveMeetingMessage,
};
