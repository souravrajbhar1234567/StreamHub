import MeetingParticipant from "../models/MeetingParticipant.js";

// Store active room participants: { [roomId]: { [socketId]: { user, displayName, audioMuted, videoMuted, handRaised } } }
export const activeRooms = new Map();

export const registerMeetingSocket = (io, socket) => {
  // Join Room
  socket.on("join-room", async ({ roomId, user, displayName }) => {
    socket.join(roomId);
    socket.roomId = roomId;
    socket.user = user;
    socket.displayName = displayName || user?.name || "Participant";

    if (!activeRooms.has(roomId)) {
      activeRooms.set(roomId, new Map());
    }

    const roomParticipants = activeRooms.get(roomId);
    const participantData = {
      socketId: socket.id,
      userId: user?._id || user?.id || null,
      displayName: socket.displayName,
      audioMuted: false,
      videoMuted: false,
      handRaised: false,
      joinedAt: new Date(),
    };

    roomParticipants.set(socket.id, participantData);

    // Notify room of new participant
    socket.to(roomId).emit("user-connected", {
      socketId: socket.id,
      user: participantData,
    });

    // Send existing participants list to new participant
    const allParticipants = Array.from(roomParticipants.values());
    socket.emit("all-participants", allParticipants);

    // Optionally record in MongoDB
    try {
      await MeetingParticipant.create({
        roomId,
        meeting: null,
        user: user?._id || null,
        displayName: socket.displayName,
        socketId: socket.id,
        role: "participant",
      });
    } catch (err) {
      // Ignore participant logging failure
    }
  });

  // Toggle Audio
  socket.on("toggle-audio", ({ roomId, isMuted }) => {
    const room = activeRooms.get(roomId);
    if (room && room.has(socket.id)) {
      const p = room.get(socket.id);
      p.audioMuted = isMuted;
      socket.to(roomId).emit("user-toggle-audio", {
        socketId: socket.id,
        audioMuted: isMuted,
      });
    }
  });

  // Toggle Video
  socket.on("toggle-video", ({ roomId, isMuted }) => {
    const room = activeRooms.get(roomId);
    if (room && room.has(socket.id)) {
      const p = room.get(socket.id);
      p.videoMuted = isMuted;
      socket.to(roomId).emit("user-toggle-video", {
        socketId: socket.id,
        videoMuted: isMuted,
      });
    }
  });

  // Raise / Lower Hand
  socket.on("toggle-hand", ({ roomId, handRaised }) => {
    const room = activeRooms.get(roomId);
    if (room && room.has(socket.id)) {
      const p = room.get(socket.id);
      p.handRaised = handRaised;
      io.to(roomId).emit("user-toggle-hand", {
        socketId: socket.id,
        handRaised,
        displayName: p.displayName,
      });
    }
  });

  // Leave Room
  socket.on("leave-room", ({ roomId }) => {
    handleParticipantLeave(io, socket, roomId);
  });
};

export const handleParticipantLeave = (io, socket, roomId) => {
  const targetRoomId = roomId || socket.roomId;
  if (!targetRoomId) return;

  const room = activeRooms.get(targetRoomId);
  if (room) {
    room.delete(socket.id);
    if (room.size === 0) {
      activeRooms.delete(targetRoomId);
    }
  }

  socket.leave(targetRoomId);
  socket.to(targetRoomId).emit("user-disconnected", {
    socketId: socket.id,
    displayName: socket.displayName || "Participant",
  });
};

export default registerMeetingSocket;
