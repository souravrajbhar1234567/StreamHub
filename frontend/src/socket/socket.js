import { io } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";

let socketInstance = null;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      autoConnect: true,
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socketInstance.on("connect", () => {
      console.log(`🔌 Connected to StreamHub Socket server: ${socketInstance.id}`);
    });

    socketInstance.on("connect_error", (error) => {
      console.warn("⚠️ Socket connection error:", error.message);
    });
  }

  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

export default getSocket;
