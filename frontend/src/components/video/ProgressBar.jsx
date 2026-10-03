import { useRef } from "react";

export default function ProgressBar({ currentTime = 0, duration = 0, onSeek }) {
  const barRef = useRef(null);

  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e) => {
    if (!barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    onSeek(clampedPos * duration);
  };

  return (
    <div className="player-progress-bar-container" ref={barRef} onClick={handleClick}>
      <div className="player-progress-track">
        <div
          className="player-progress-filled"
          style={{ width: `${percentage}%` }}
        >
          <div className="player-progress-handle"></div>
        </div>
      </div>
    </div>
  );
}
