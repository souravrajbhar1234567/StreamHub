import { getSocket } from "./socket";

export const sendRoomChatMessage = ({ roomId, message, senderName, fileUrl, fileName }) => {
  const socket = getSocket();
  socket.emit("send-room-message", {
    roomId,
    message,
    senderName,
    fileUrl,
    fileName,
  });
};

export const subscribeToRoomMessages = (callback) => {
  const socket = getSocket();
  socket.on("receive-room-message", callback);
  return () => {
    socket.off("receive-room-message", callback);
  };
};

export default { sendRoomChatMessage, subscribeToRoomMessages };
