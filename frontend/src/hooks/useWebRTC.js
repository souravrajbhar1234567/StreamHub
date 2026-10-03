import { useEffect, useRef, useState } from "react";
import { getSocket } from "../socket/socket";

const RTC_CONFIG = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:global.stun.twilio.com:3478" },
  ],
};

export const useWebRTC = (roomId, localStream) => {
  const peersRef = useRef(new Map()); // socketId -> RTCPeerConnection
  const [remoteStreams, setRemoteStreams] = useState(new Map()); // socketId -> MediaStream

  useEffect(() => {
    if (!roomId) return;
    const socket = getSocket();

    // Listen for incoming offer
    socket.on("offer", async ({ callerSocketId, sdp }) => {
      let pc = peersRef.current.get(callerSocketId);
      if (!pc) {
        pc = createPeerConnection(callerSocketId, socket);
      }
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("answer", { targetSocketId: callerSocketId, sdp: answer });
    });

    // Listen for incoming answer
    socket.on("answer", async ({ calleeSocketId, sdp }) => {
      const pc = peersRef.current.get(calleeSocketId);
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      }
    });

    // Listen for incoming ICE candidates
    socket.on("ice-candidate", async ({ senderSocketId, candidate }) => {
      const pc = peersRef.current.get(senderSocketId);
      if (pc && candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.warn("Error adding ICE candidate:", err.message);
        }
      }
    });

    socket.on("user-disconnected", ({ socketId }) => {
      const pc = peersRef.current.get(socketId);
      if (pc) {
        pc.close();
        peersRef.current.delete(socketId);
      }
      setRemoteStreams((prev) => {
        const next = new Map(prev);
        next.delete(socketId);
        return next;
      });
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-disconnected");
      peersRef.current.forEach((pc) => pc.close());
      peersRef.current.clear();
    };
  }, [roomId, localStream]);

  const createPeerConnection = (targetSocketId, socket) => {
    const pc = new RTCPeerConnection(RTC_CONFIG);

    if (localStream) {
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          targetSocketId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStreams((prev) => {
        const next = new Map(prev);
        next.set(targetSocketId, event.streams[0]);
        return next;
      });
    };

    peersRef.current.set(targetSocketId, pc);
    return pc;
  };

  const callUser = async (targetSocketId) => {
    const socket = getSocket();
    const pc = createPeerConnection(targetSocketId, socket);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("offer", { targetSocketId, sdp: offer });
  };

  return { remoteStreams, callUser };
};

export default useWebRTC;
