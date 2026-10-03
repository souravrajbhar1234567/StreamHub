import { useState } from "react";
import { PLAYBACK_RATES } from "../../utils/constants";

export default function PlaybackSpeed({ speed = 1, onSpeedChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="player-dropdown-wrap">
      <button
        className="player-control-btn speed-badge"
        onClick={() => setOpen(!open)}
        title="Playback Speed"
      >
        {speed}x
      </button>

      {open && (
        <div className="player-menu">
          {PLAYBACK_RATES.map((rate) => (
            <button
              key={rate}
              className={`player-menu-item ${rate === speed ? "active" : ""}`}
              onClick={() => {
                onSpeedChange(rate);
                setOpen(false);
              }}
            >
              {rate}x {rate === 1 && "(Normal)"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
