import { Video, VideoOff } from "lucide-react";

export default function CameraButton({ isVideoOff, onToggle }) {
  return (
    <button
      className={`meeting-control-btn ${isVideoOff ? "btn-muted" : "btn-active"}`}
      onClick={onToggle}
      title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
    >
      {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
    </button>
  );
}
