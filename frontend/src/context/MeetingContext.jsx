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
  const [facingMode, setFacingMode] = useState("user"); // "user" or "environment"
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isRoomLocked, setIsRoomLocked] = useState(false);
  const [roomPermissions, setRoomPermissions] = useState({ allowScreenShare: true, allowChat: true });
  const [isSpeaking, setIsSpeaking] = useState(false);

  const localStreamRef = useRef(null);
  const timerRef = useRef(null);
  const recordTimerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const speakingIntervalRef = useRef(null);

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

  // Audio Analyser for Speaking Indicator
  const setupAudioAnalyser = (stream) => {
    try {
      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) return;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const buffer = new Uint8Array(analyser.frequencyBinCount);

      if (speakingIntervalRef.current) clearInterval(speakingIntervalRef.current);

      speakingIntervalRef.current = setInterval(() => {
        if (!analyserRef.current || isAudioMuted) {
          if (isSpeaking) {
            setIsSpeaking(false);
            const socket = getSocket();
            if (roomId) socket.emit("speaking-change", { roomId, isSpeaking: false });
          }
          return;
        }

        analyserRef.current.getByteFrequencyData(buffer);
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) sum += buffer[i];
        const average = sum / buffer.length;
        const speakingNow = average > 18;

        if (speakingNow !== isSpeaking) {
          setIsSpeaking(speakingNow);
          const socket = getSocket();
          if (roomId) socket.emit("speaking-change", { roomId, isSpeaking: speakingNow });
        }
      }, 250);
    } catch (err) {
      console.warn("Audio analyser setup error:", err.message);
    }
  };

  const startLocalMedia = async (targetFacing = facingMode) => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: targetFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      localStreamRef.current = stream;
      setLocalStream(stream);
      setupAudioAnalyser(stream);
      return stream;
    } catch (err) {
      console.warn("Camera/mic permission fallback:", err.message);
      const fallback = await requestMediaPermissions(true, true);
      if (fallback.granted && fallback.stream) {
        localStreamRef.current = fallback.stream;
        setLocalStream(fallback.stream);
        setupAudioAnalyser(fallback.stream);
        return fallback.stream;
      }
      return null;
    }
  };

  const switchCamera = async () => {
    const nextFacing = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextFacing);
    await startLocalMedia(nextFacing);
  };

  const stopLocalMedia = () => {
    if (speakingIntervalRef.current) clearInterval(speakingIntervalRef.current);
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
  };

  // Local Meeting Recording via MediaRecorder API
  const startRecording = () => {
    if (!localStreamRef.current) return;
    try {
      recordedChunksRef.current = [];
      const stream = localStreamRef.current;
      const options = { mimeType: "video/webm;codecs=vp9,opus" };
      const safeOptions = MediaRecorder.isTypeSupported(options.mimeType)
        ? options
        : { mimeType: "video/webm" };

      const recorder = new MediaRecorder(stream, safeOptions);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `streamhub-meeting-${roomId || "call"}-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      };

      recorder.start(1000);
      setIsRecording(true);
      setRecordingDuration(0);
      recordTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn("Call recording error:", err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    clearInterval(recordTimerRef.current);
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

    socket.on("join-error", ({ message }) => {
      alert(message || "Unable to join room.");
      leaveRoom();
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

    socket.on("user-speaking-change", ({ socketId, isSpeaking }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.socketId === socketId ? { ...p, isSpeaking } : p))
      );
    });

    socket.on("user-role-changed", ({ socketId, role }) => {
      setParticipants((prev) =>
        prev.map((p) => (p.socketId === socketId ? { ...p, role } : p))
      );
    });

    socket.on("receive-room-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("force-mute-audio", () => {
      if (localStreamRef.current) {
        const audioTrack = localStreamRef.current.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = false;
        setIsAudioMuted(true);
      }
    });

    socket.on("kicked-from-meeting", ({ reason }) => {
      alert(reason || "You were removed from this meeting by the host.");
      leaveRoom();
    });

    socket.on("room-lock-changed", ({ isLocked }) => {
      setIsRoomLocked(isLocked);
    });

    socket.on("room-permissions-updated", (perms) => {
      setRoomPermissions(perms);
    });
  }, [facingMode]);

  const leaveRoom = useCallback(() => {
    if (roomId) {
      const socket = getSocket();
      socket.emit("leave-room", { roomId });
      socket.off("join-error");
      socket.off("all-participants");
      socket.off("user-connected");
      socket.off("user-disconnected");
      socket.off("user-toggle-audio");
      socket.off("user-toggle-video");
      socket.off("user-toggle-hand");
      socket.off("user-speaking-change");
      socket.off("user-role-changed");
      socket.off("receive-room-message");
      socket.off("force-mute-audio");
      socket.off("kicked-from-meeting");
      socket.off("room-lock-changed");
      socket.off("room-permissions-updated");
    }
    stopRecording();
    stopLocalMedia();
    setRoomId(null);
    setMeeting(null);
    setParticipants([]);
    setMessages([]);
    setIsScreenSharing(false);
    setIsHandRaised(false);
    setIsSpeaking(false);
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
    if (!roomPermissions.allowScreenShare && !isHostUser()) {
      alert("Screen sharing is disabled by the host.");
      return;
    }

    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
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

  const sendChatMessage = (text, user, type = "text", fileUrl = null, fileName = null) => {
    if (!text?.trim() && !fileUrl) return;
    if (!roomPermissions.allowChat && !isHostUser()) {
      alert("In-call chat is disabled by the host.");
      return;
    }
    const socket = getSocket();
    if (roomId) {
      socket.emit("send-room-message", {
        roomId,
        message: text,
        type,
        fileUrl,
        fileName,
        senderName: user?.name || "Participant",
      });
    }
  };

  // Host Moderation Actions
  const muteParticipant = (targetSocketId) => {
    const socket = getSocket();
    if (roomId) socket.emit("host-mute-participant", { roomId, targetSocketId });
  };

  const muteAllParticipants = () => {
    const socket = getSocket();
    if (roomId) socket.emit("host-mute-all", { roomId });
  };

  const removeParticipant = (targetSocketId) => {
    const socket = getSocket();
    if (roomId) socket.emit("host-remove-participant", { roomId, targetSocketId });
  };

  const toggleRoomLock = () => {
    const socket = getSocket();
    if (roomId) socket.emit("toggle-room-lock", { roomId });
  };

  const assignCohost = (targetSocketId) => {
    const socket = getSocket();
    if (roomId) socket.emit("host-assign-cohost", { roomId, targetSocketId });
  };

  const updatePermissions = (perms) => {
    const socket = getSocket();
    if (roomId) socket.emit("host-update-permissions", { roomId, permissions: perms });
  };

  const isHostUser = () => {
    return meeting?.role === "host" || participants[0]?.socketId === getSocket()?.id;
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
        isSpeaking,
        messages,
        callDuration,
        facingMode,
        isRecording,
        recordingDuration,
        isRoomLocked,
        roomPermissions,
        joinRoom,
        leaveRoom,
        toggleAudio,
        toggleVideo,
        toggleHand,
        toggleScreenShare,
        sendChatMessage,
        startLocalMedia,
        switchCamera,
        startRecording,
        stopRecording,
        muteParticipant,
        muteAllParticipants,
        removeParticipant,
        toggleRoomLock,
        assignCohost,
        updatePermissions,
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
