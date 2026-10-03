import { useRef, useState } from "react";
import TimelinePreview from "./TimelinePreview";

export default function ProgressBar({ currentTime = 0, duration = 0, buffered = 0, onSeek }) {
  const barRef = useRef(null);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPos, setHoverPos] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration > 0 ? (buffered / duration) * 100 : 0;

  const getPositionInfo = (e) => {
    if (!barRef.current || duration <= 0) return { time: 0, pos: 0 };
    const rect = barRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    return {
      time: clampedPos * duration,
      pos: e.clientX - rect.left,
    };
  };

  const handleMouseMove = (e) => {
    const { time, pos } = getPositionInfo(e);
    setHoverTime(time);
    setHoverPos(pos);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverTime(null);
  };

  const handleClick = (e) => {
    const { time } = getPositionInfo(e);
    onSeek(time);
  };

  return (
    <div
      className="player-progress-bar-container"
      ref={barRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <TimelinePreview hoverTime={hoverTime} position={hoverPos} isVisible={isHovering} />

      <div className="player-progress-track">
        {bufferedPercentage > 0 && (
          <div
            className="player-progress-buffered"
            style={{ width: `${bufferedPercentage}%` }}
          />
        )}
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
