import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import { getSocket } from "../socket/socket";
import { requestMediaPermissions } from "../utils/permissions";

const MeetingContext = createContext(null);

export function MeetingProvider({ children }) {
  const [roomId, setRoomId] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [messages, setMessages] = useState([]);
  const [callDuration, setCallDuration] = useState(0);

  const localStreamRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize or cleanup timer
  useEffect(() => {
    if (roomId) {
      setCallDuration(0);
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [roomId]);

  const startLocalMedia = async () => {
    if (localStreamRef.current) return localStreamRef.current;
    const { granted, stream } = await requestMediaPermissions(true, true);
    if (granted && stream) {
      localStreamRef.current = stream;
      setLocalStream(stream);
      return stream;
    }
    return null;
  };

  const stopLocalMedia = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  };

  const joinRoom = useCallback(async (newRoomId, user, displayName) => {
    setRoomId(newRoomId);
    const socket = getSocket();

    await startLocalMedia();

    socket.emit("join-room", {
      roomId: newRoomId,
      user,
      displayName: displayName || user?.name || "Participant",
    });

    socket.on("all-participants", (list) => {
      setParticipants(list);
    });

    socket.on("user-connected", ({ user }) => {
      setParticipants((prev) => [...prev.filter((p) => p.socketId !== user.socketId), user]);
    });

    socket.on("user-disconnected", ({ socketId }) => {
      setParticipants((prev) => prev.filter((p) => p.socketId !== socketId));
    });

    socket.on("user-toggle-audio", ({ socketId, audioMuted }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.socketId === socketId ? { ...p, audioMuted } : p))
      );
    });

    socket.on("user-toggle-video", ({ socketId, videoMuted }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.socketId === socketId ? { ...p, videoMuted } : p))
      );
    });

    socket.on("user-toggle-hand", ({ socketId, handRaised }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.socketId === socketId ? { ...p, handRaised } : p))
      );
    });

    socket.on("receive-room-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const leaveRoom = useCallback(() => {
    if (roomId) {
      const socket = getSocket();
      socket.emit("leave-room", { roomId });
      socket.off("all-participants");
      socket.off("user-connected");
      socket.off("user-disconnected");
      socket.off("user-toggle-audio");
      socket.off("user-toggle-video");
      socket.off("user-toggle-hand");
      socket.off("receive-room-message");
    }
    stopLocalMedia();
    setRoomId(null);
    setMeeting(null);
    setParticipants([]);
    setMessages([]);
    setIsScreenSharing(false);
    setIsHandRaised(false);
  }, [roomId]);

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        const newMuted = !audioTrack.enabled;
        setIsAudioMuted(newMuted);
        const socket = getSocket();
        if (roomId) {
          socket.emit("toggle-audio", { roomId, isMuted: newMuted });
        }
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        const newMuted = !videoTrack.enabled;
        setIsVideoMuted(newMuted);
        const socket = getSocket();
        if (roomId) {
          socket.emit("toggle-video", { roomId, isMuted: newMuted });
        }
      }
    }
  };

  const toggleHand = () => {
    const nextState = !isHandRaised;
    setIsHandRaised(nextState);
    const socket = getSocket();
    if (roomId) {
      socket.emit("toggle-hand", { roomId, handRaised: nextState });
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setLocalStream(stream);
        setIsScreenSharing(true);
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          startLocalMedia();
        };
      } catch (err) {
        console.warn("Screen share cancelled:", err.message);
      }
    } else {
      setIsScreenSharing(false);
      startLocalMedia();
    }
  };

  const sendChatMessage = (text, user) => {
    if (!text.trim() || !roomId) return;
    const socket = getSocket();
    socket.emit("send-room-message", {
      roomId,
      message: text,
      senderName: user?.name || "Participant",
    });
  };

  return (
    <MeetingContext.Provider
      value={{
        roomId,
        meeting,
        setMeeting,
        participants,
        localStream,
        isAudioMuted,
        isVideoMuted,
        isScreenSharing,
        isHandRaised,
        messages,
        callDuration,
        joinRoom,
        leaveRoom,
        toggleAudio,
        toggleVideo,
        toggleHand,
        toggleScreenShare,
        sendChatMessage,
        startLocalMedia,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
}

export const useMeetingContext = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    return {
      participants: [],
      messages: [],
      joinRoom: () => {},
      leaveRoom: () => {},
      toggleAudio: () => {},
      toggleVideo: () => {},
    };
  }
  return context;
};

export default MeetingContext;
