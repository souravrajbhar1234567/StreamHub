export const registerSignalingSocket = (io, socket) => {
  // WebRTC Offer
  socket.on("offer", ({ targetSocketId, sdp }) => {
    io.to(targetSocketId).emit("offer", {
      callerSocketId: socket.id,
      sdp,
    });
  });

  // WebRTC Answer
  socket.on("answer", ({ targetSocketId, sdp }) => {
    io.to(targetSocketId).emit("answer", {
      calleeSocketId: socket.id,
      sdp,
    });
  });

  // ICE Candidate exchange
  socket.on("ice-candidate", ({ targetSocketId, candidate }) => {
    io.to(targetSocketId).emit("ice-candidate", {
      senderSocketId: socket.id,
      candidate,
    });
  });
};

export default registerSignalingSocket;
