const onlineUsers = new Map(); // userId -> Set of socketIds

export const registerPresenceSocket = (io, socket) => {
  socket.on("register-presence", ({ userId, userName }) => {
    if (!userId) return;
    socket.registeredUserId = userId;

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    io.emit("user-status-change", {
      userId,
      userName,
      isOnline: true,
      onlineUsersCount: onlineUsers.size,
    });
  });

  socket.on("disconnect", () => {
    const userId = socket.registeredUserId;
    if (userId && onlineUsers.has(userId)) {
      const userSockets = onlineUsers.get(userId);
      userSockets.delete(socket.id);
      if (userSockets.size === 0) {
        onlineUsers.delete(userId);
        io.emit("user-status-change", {
          userId,
          isOnline: false,
          onlineUsersCount: onlineUsers.size,
        });
      }
    }
  });
};

export default registerPresenceSocket;
