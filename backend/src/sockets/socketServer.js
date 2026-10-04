import { Server } from "socket.io";
import { registerMeetingSocket, handleParticipantLeave } from "./meetingSocket.js";
import { registerSignalingSocket } from "./signalingSocket.js";
import { registerChatSocket } from "./chatSocket.js";
import { registerPresenceSocket } from "./presenceSocket.js";

export const initSocketServer = (httpServer, clientUrl) => {
  const io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        // Allow all frontend origins with credentials
        callback(null, true);
      },
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Register all socket modules
    registerMeetingSocket(io, socket);
    registerSignalingSocket(io, socket);
    registerChatSocket(io, socket);
    registerPresenceSocket(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`🔌 Client disconnected: ${socket.id} (${reason})`);
      handleParticipantLeave(io, socket);
    });
  });

  return io;
};

export default initSocketServer;
