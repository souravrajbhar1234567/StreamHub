import { Volume2, VolumeX, Volume1 } from "lucide-react";

export default function VolumeControl({ volume = 1, isMuted = false, onVolumeChange, onToggleMute }) {
  const currentVol = isMuted ? 0 : volume;

  const getIcon = () => {
    if (isMuted || currentVol === 0) return <VolumeX size={18} />;
    if (currentVol < 0.5) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className="player-volume-control">
      <button
        className="player-control-btn"
        onClick={onToggleMute}
        title={isMuted ? "Unmute (m)" : "Mute (m)"}
        aria-label="Toggle Mute"
      >
        {getIcon()}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        className="volume-slider"
        value={currentVol}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        aria-label="Volume slider"
      />
    </div>
  );
}
