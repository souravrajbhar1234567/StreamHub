import { Hand } from "lucide-react";

export default function RaiseHand({ isHandRaised, onToggle }) {
  return (
    <button
      className={`meeting-control-btn ${isHandRaised ? "btn-active-hand" : "btn-secondary"}`}
      onClick={onToggle}
      title={isHandRaised ? "Lower Hand" : "Raise Hand"}
    >
      <Hand size={20} />
    </button>
  );
}
