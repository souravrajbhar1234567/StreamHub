import MeetingParticipant from "../models/MeetingParticipant.js";

// Store active room participants: { [roomId]: Map<socketId, participantData> }
export const activeRooms = new Map();
// Store locked rooms
export const lockedRooms = new Set();
// Store room moderation permissions: { [roomId]: { allowScreenShare: boolean, allowChat: boolean } }
export const roomPermissions = new Map();

export const registerMeetingSocket = (io, socket) => {
  // Join Room
  socket.on("join-room", async ({ roomId, user, displayName }) => {
    if (lockedRooms.has(roomId)) {
      socket.emit("join-error", { message: "This meeting is locked by the host." });
      return;
    }

    socket.join(roomId);
    socket.roomId = roomId;
    socket.user = user;
    socket.displayName = displayName || user?.name || "Participant";

    if (!activeRooms.has(roomId)) {
      activeRooms.set(roomId, new Map());
      roomPermissions.set(roomId, { allowScreenShare: true, allowChat: true });
    }

    const roomParticipants = activeRooms.get(roomId);
    const participantData = {
      socketId: socket.id,
      userId: user?._id || user?.id || null,
      displayName: socket.displayName,
      role: roomParticipants.size === 0 ? "host" : "participant",
      audioMuted: false,
      videoMuted: false,
      handRaised: false,
      isSpeaking: false,
      joinedAt: new Date(),
    };

    roomParticipants.set(socket.id, participantData);

    // Notify room of new participant
    socket.to(roomId).emit("user-connected", {
      socketId: socket.id,
      user: participantData,
    });

    // Send existing participants list and room lock status to new participant
    const allParticipants = Array.from(roomParticipants.values());
    socket.emit("all-participants", allParticipants);
    socket.emit("room-lock-changed", { isLocked: lockedRooms.has(roomId) });
    socket.emit("room-permissions-updated", roomPermissions.get(roomId));

    // Record participant in database
    try {
      await MeetingParticipant.create({
        roomId,
        meeting: null,
        user: user?._id || null,
        displayName: socket.displayName,
        socketId: socket.id,
        role: participantData.role,
      });
    } catch (err) {
      // Ignore participant logging failure
    }
  });

  // Active speaking indicator
  socket.on("speaking-change", ({ roomId, isSpeaking }) => {
    const room = activeRooms.get(roomId);
    if (room && room.has(socket.id)) {
      const p = room.get(socket.id);
      p.isSpeaking = isSpeaking;
      socket.to(roomId).emit("user-speaking-change", {
        socketId: socket.id,
        isSpeaking,
      });
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

  // In-call Chat Message (Text, Emoji, or File attachment)
  socket.on("send-room-message", ({ roomId, message, type = "text", fileUrl, fileName, senderName }) => {
    const msgData = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      socketId: socket.id,
      senderName: senderName || socket.displayName || "Participant",
      senderId: socket.user?._id || null,
      message,
      type, // 'text' | 'file' | 'emoji'
      fileUrl,
      fileName,
      timestamp: new Date().toISOString(),
    };
    io.to(roomId).emit("receive-room-message", msgData);
  });

  // Host Moderation: Mute a specific participant
  socket.on("host-mute-participant", ({ roomId, targetSocketId }) => {
    io.to(targetSocketId).emit("force-mute-audio");
    const room = activeRooms.get(roomId);
    if (room && room.has(targetSocketId)) {
      const p = room.get(targetSocketId);
      p.audioMuted = true;
      io.to(roomId).emit("user-toggle-audio", { socketId: targetSocketId, audioMuted: true });
    }
  });

  // Host Moderation: Mute all participants
  socket.on("host-mute-all", ({ roomId }) => {
    socket.to(roomId).emit("force-mute-audio");
    const room = activeRooms.get(roomId);
    if (room) {
      room.forEach((p, sId) => {
        if (sId !== socket.id) {
          p.audioMuted = true;
          io.to(roomId).emit("user-toggle-audio", { socketId: sId, audioMuted: true });
        }
      });
    }
  });

  // Host Moderation: Remove a participant
  socket.on("host-remove-participant", ({ roomId, targetSocketId }) => {
    io.to(targetSocketId).emit("kicked-from-meeting", {
      reason: "You were removed by the meeting host.",
    });
    const targetSocket = io.sockets.sockets.get(targetSocketId);
    if (targetSocket) {
      handleParticipantLeave(io, targetSocket, roomId);
    }
  });

  // Host Moderation: Toggle room lock
  socket.on("toggle-room-lock", ({ roomId }) => {
    const isLocked = lockedRooms.has(roomId);
    if (isLocked) {
      lockedRooms.delete(roomId);
    } else {
      lockedRooms.add(roomId);
    }
    io.to(roomId).emit("room-lock-changed", { isLocked: !isLocked });
  });

  // Host Moderation: Assign co-host
  socket.on("host-assign-cohost", ({ roomId, targetSocketId }) => {
    const room = activeRooms.get(roomId);
    if (room && room.has(targetSocketId)) {
      const p = room.get(targetSocketId);
      p.role = "co-host";
      io.to(roomId).emit("user-role-changed", { socketId: targetSocketId, role: "co-host" });
    }
  });

  // Host Moderation: Update permissions (screen share, chat)
  socket.on("host-update-permissions", ({ roomId, permissions }) => {
    const current = roomPermissions.get(roomId) || {};
    const updated = { ...current, ...permissions };
    roomPermissions.set(roomId, updated);
    io.to(roomId).emit("room-permissions-updated", updated);
  });

  // Connection latency ping
  socket.on("ping-latency", (data, callback) => {
    if (typeof callback === "function") callback();
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
      lockedRooms.delete(targetRoomId);
      roomPermissions.delete(targetRoomId);
    }
  }

  socket.leave(targetRoomId);
  socket.to(targetRoomId).emit("user-disconnected", {
    socketId: socket.id,
    displayName: socket.displayName || "Participant",
  });
};

export default registerMeetingSocket;
