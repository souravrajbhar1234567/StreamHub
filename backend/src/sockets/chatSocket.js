import { saveMeetingMessage } from "../services/meetingService.js";

export const registerChatSocket = (io, socket) => {
  socket.on("send-room-message", async ({ roomId, message, senderName, fileUrl, fileName }) => {
    const messagePayload = {
      _id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      roomId,
      sender: socket.user?._id || null,
      senderName: senderName || socket.displayName || "Participant",
      message,
      fileUrl: fileUrl || null,
      fileName: fileName || null,
      createdAt: new Date().toISOString(),
    };

    // Broadcast to everyone in room including sender
    io.to(roomId).emit("receive-room-message", messagePayload);

    // Save message in background
    try {
      await saveMeetingMessage({
        roomId,
        senderId: socket.user?._id,
        senderName: messagePayload.senderName,
        message,
        fileUrl,
        fileName,
      });
    } catch (err) {
      // Ignore background save errors
    }
  });
};

export default registerChatSocket;
