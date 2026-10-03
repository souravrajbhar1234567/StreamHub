import { Shield, VolumeX, Lock } from "lucide-react";

export default function HostControls({ onMuteAll, onLockRoom, isRoomLocked }) {
  return (
    <div className="host-controls-dropdown">
      <div className="host-controls-title flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-purple-400 mb-2">
        <Shield size={14} /> Host Controls
      </div>
      <button className="dropdown-action-btn" onClick={onMuteAll}>
        <VolumeX size={15} /> Mute All Participants
      </button>
      <button className="dropdown-action-btn" onClick={onLockRoom}>
        <Lock size={15} /> {isRoomLocked ? "Unlock Meeting Room" : "Lock Meeting Room"}
      </button>
    </div>
  );
}
