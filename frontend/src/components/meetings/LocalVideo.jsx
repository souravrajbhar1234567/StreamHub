import { useRef, useEffect } from "react";
import { MicOff, User } from "lucide-react";

export default function LocalVideo({ stream, displayName = "You", isAudioMuted, isVideoOff }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="meeting-video-card local-video-tile">
      {isVideoOff || !stream ? (
        <div className="video-avatar-placeholder">
          <div className="avatar-circle">
            <User size={36} />
          </div>
          <span>Camera is off</span>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="meeting-video-element mirrored"
        />
      )}

      <div className="video-tile-overlay">
        <span className="tile-name">{displayName} (You)</span>
        {isAudioMuted && (
          <span className="tile-muted-badge">
            <MicOff size={14} />
          </span>
        )}
      </div>
    </div>
  );
}
