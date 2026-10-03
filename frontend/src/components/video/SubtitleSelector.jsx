import { Subtitles } from "lucide-react";
import { useState } from "react";

export default function SubtitleSelector({ enabled = false, onToggle }) {
  return (
    <button
      className={`player-control-btn ${enabled ? "active" : ""}`}
      onClick={onToggle}
      title={enabled ? "Subtitles On" : "Subtitles Off (c)"}
      aria-label="Toggle subtitles"
    >
      <Subtitles size={18} />
    </button>
  );
}
