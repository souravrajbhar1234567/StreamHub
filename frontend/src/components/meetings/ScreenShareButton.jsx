import { ScreenShare } from "lucide-react";

export default function ScreenShareButton({ isSharing, onToggle }) {
  return (
    <button
      className={`meeting-control-btn ${isSharing ? "btn-active-screen" : "btn-secondary"}`}
      onClick={onToggle}
      title={isSharing ? "Stop Sharing Screen" : "Share Screen"}
    >
      <ScreenShare size={20} />
    </button>
  );
}
