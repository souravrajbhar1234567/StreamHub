import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";

export default function NextVideoCountdown({ nextVideo, onPlayNext, onCancel }) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (!nextVideo) return;
    if (seconds <= 0) {
      onPlayNext();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, nextVideo, onPlayNext]);

  if (!nextVideo) return null;

  return (
    <div className="next-video-overlay">
      <div className="next-video-card">
        <button className="next-close" onClick={onCancel}>
          <X size={16} />
        </button>
        <span className="next-label">Up Next in {seconds}s</span>
        <h4>{nextVideo.title}</h4>
        <button className="btn btn-primary btn-sm" onClick={onPlayNext}>
          <Play size={14} /> Play Now
        </button>
      </div>
    </div>
  );
}
