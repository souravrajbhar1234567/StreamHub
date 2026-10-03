import { X, Users } from "lucide-react";
import ParticipantCard from "./ParticipantCard";

export default function ParticipantList({
  isOpen,
  onClose,
  participants = [],
  hostName,
  currentUserIsHost = false,
  onMuteParticipant,
  onRemoveParticipant,
  onAssignCohost,
}) {
  if (!isOpen) return null;

  return (
    <div className="participant-list-panel">
      <div className="participant-list-header">
        <div className="flex items-center gap-2">
          <Users size={18} />
          <h4>People ({participants.length})</h4>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Close list">
          <X size={18} />
        </button>
      </div>

      <div className="participant-list-scroll">
        {participants.map((p) => (
          <ParticipantCard
            key={p.socketId || p._id}
            participant={p}
            isHost={p.displayName === hostName}
            currentUserIsHost={currentUserIsHost}
            onMute={onMuteParticipant}
            onRemove={onRemoveParticipant}
            onAssignCohost={onAssignCohost}
          />
        ))}
      </div>
    </div>
  );
}
