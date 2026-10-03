import { Mic, MicOff } from "lucide-react";

export default function MicButton({ isMuted, onToggle }) {
  return (
    <button
      className={`meeting-control-btn ${isMuted ? "btn-muted" : "btn-active"}`}
      onClick={onToggle}
      title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
    >
      {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
}
