import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Video, VideoOff, LogIn } from "lucide-react";
import { requestMediaPermissions } from "../../utils/permissions";

export default function MeetingLobby({ meetingTitle, onJoin, initialName = "" }) {
  const [displayName, setDisplayName] = useState(initialName || "");
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let localStream = null;
    requestMediaPermissions(true, true).then(({ granted, stream: s }) => {
      if (granted && s) {
        localStream = s;
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      }
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoMuted(!videoTrack.enabled);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    onJoin({ displayName, isAudioMuted, isVideoMuted });
  };

  return (
    <div className="meeting-lobby-card">
      <div className="lobby-header">
        <h2>{meetingTitle || "Ready to join?"}</h2>
        <p>Set up your camera and microphone before entering the room.</p>
      </div>

      <div className="lobby-video-preview">
        {isVideoMuted || !stream ? (
          <div className="lobby-camera-off">
            <VideoOff size={48} />
            <span>Camera is turned off</span>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="lobby-video-elem mirrored"
          />
        )}

        <div className="lobby-preview-controls">
          <button
            type="button"
            className={`lobby-ctrl-btn ${isAudioMuted ? "muted" : ""}`}
            onClick={toggleMic}
            title={isAudioMuted ? "Unmute" : "Mute"}
          >
            {isAudioMuted ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button
            type="button"
            className={`lobby-ctrl-btn ${isVideoMuted ? "muted" : ""}`}
            onClick={toggleVideo}
            title={isVideoMuted ? "Turn on camera" : "Turn off camera"}
          >
            {isVideoMuted ? <VideoOff size={18} /> : <Video size={18} />}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="lobby-join-form">
        <label>Your Display Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter your name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary btn-lg full-width mt-4"
          disabled={!displayName.trim()}
        >
          <LogIn size={18} /> Join Meeting Now
        </button>
      </form>
    </div>
  );
}
