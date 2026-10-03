import { useRef, useEffect } from "react";
import { MicOff, User } from "lucide-react";

export default function RemoteVideo({ stream, participant }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const name = participant?.displayName || "Participant";
  const isAudioMuted = participant?.audioMuted;
  const isVideoMuted = participant?.videoMuted;

  return (
    <div className="meeting-video-card remote-video-tile">
      {isVideoMuted || !stream ? (
        <div className="video-avatar-placeholder">
          <div className="avatar-circle">
            <User size={36} />
          </div>
          <span>{name}</span>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="meeting-video-element"
        />
      )}

      <div className="video-tile-overlay">
        <span className="tile-name">{name}</span>
        {isAudioMuted && (
          <span className="tile-muted-badge">
            <MicOff size={14} />
          </span>
        )}
      </div>
    </div>
  );
}
