import { Maximize, Minimize } from "lucide-react";

export default function FullscreenButton({ isFullscreen, onToggle }) {
  return (
    <button
      className="player-control-btn"
      onClick={onToggle}
      title={isFullscreen ? "Exit Fullscreen (f)" : "Fullscreen (f)"}
      aria-label="Toggle Fullscreen"
    >
      {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
    </button>
  );
}
