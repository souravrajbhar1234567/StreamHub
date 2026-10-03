import { Tv } from "lucide-react";

export default function TheaterMode({ isTheater, onToggle }) {
  return (
    <button
      className="player-control-btn"
      onClick={onToggle}
      title={isTheater ? "Default View (t)" : "Theater Mode (t)"}
      aria-label="Toggle Theater Mode"
    >
      <Tv size={18} />
    </button>
  );
}
