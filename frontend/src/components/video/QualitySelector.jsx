import { useState } from "react";
import { Settings } from "lucide-react";
import { VIDEO_QUALITIES } from "../../utils/constants";

export default function QualitySelector({ currentQuality = "Auto", onQualityChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="player-dropdown-wrap">
      <button
        className="player-control-btn"
        onClick={() => setOpen(!open)}
        title="Quality Settings"
        aria-label="Video Quality"
      >
        <Settings size={18} />
      </button>

      {open && (
        <div className="player-menu">
          <div className="player-menu-title">Quality</div>
          {VIDEO_QUALITIES.map((q) => (
            <button
              key={q}
              className={`player-menu-item ${q === currentQuality ? "active" : ""}`}
              onClick={() => {
                onQualityChange(q);
                setOpen(false);
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
