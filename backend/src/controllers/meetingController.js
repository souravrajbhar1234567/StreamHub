import meetingService from "../services/meetingService.js";

export const createMeeting = async (req, res, next) => {
  try {
    const meeting = await meetingService.createMeeting(
      req.user._id,
      req.user.name,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Meeting room created successfully.",
      meeting,
    });
  } catch (error) {
    next(error);
  }
};

export const getMeeting = async (req, res, next) => {
  try {
    const meeting = await meetingService.getMeetingByRoomId(req.params.roomId);
    res.status(200).json({ success: true, meeting });
  } catch (error) {
    next(error);
  }
};

export const endMeeting = async (req, res, next) => {
  try {
    const meeting = await meetingService.endMeeting(
      req.params.roomId,
      req.user._id
    );
    res.status(200).json({
      success: true,
      message: "Meeting ended.",
      meeting,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await meetingService.getMeetingMessages(
      req.params.roomId
    );
    res.status(200).json({ success: true, messages });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const message = await meetingService.saveMeetingMessage({
      roomId: req.params.roomId,
      senderId: req.user?._id,
      senderName: req.user?.name || req.body.senderName || "Guest",
      message: req.body.message,
      fileUrl: req.body.fileUrl,
      fileName: req.body.fileName,
    });
    res.status(201).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

export default {
  createMeeting,
  getMeeting,
  endMeeting,
  getMessages,
  sendMessage,
};
