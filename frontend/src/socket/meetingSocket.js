import { getSocket } from "./socket";

export const joinMeetingRoom = (roomId, user, displayName) => {
  const socket = getSocket();
  socket.emit("join-room", { roomId, user, displayName });
};

export const leaveMeetingRoom = (roomId) => {
  const socket = getSocket();
  socket.emit("leave-room", { roomId });
};

export const toggleAudioSocket = (roomId, isMuted) => {
  const socket = getSocket();
  socket.emit("toggle-audio", { roomId, isMuted });
};

export const toggleVideoSocket = (roomId, isMuted) => {
  const socket = getSocket();
  socket.emit("toggle-video", { roomId, isMuted });
};

export const toggleHandSocket = (roomId, handRaised) => {
  const socket = getSocket();
  socket.emit("toggle-hand", { roomId, handRaised });
};

export default {
  joinMeetingRoom,
  leaveMeetingRoom,
  toggleAudioSocket,
  toggleVideoSocket,
  toggleHandSocket,
};
