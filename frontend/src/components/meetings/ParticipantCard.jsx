import { Mic, MicOff, Hand, Crown } from "lucide-react";

export default function ParticipantCard({ participant, isHost = false }) {
  const name = participant?.displayName || "Participant";

  return (
    <div className="participant-card-item">
      <div className="participant-info">
        <div className="participant-avatar">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="participant-details">
          <div className="participant-name-row">
            <span className="participant-name">{name}</span>
            {isHost && (
              <span className="host-badge" title="Meeting Host">
                <Crown size={12} /> Host
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="participant-icons">
        {participant?.handRaised && (
          <span className="hand-badge" title="Hand Raised">
            <Hand size={14} className="text-yellow-400" />
          </span>
        )}
        {participant?.audioMuted ? (
          <MicOff size={15} className="text-red-400" />
        ) : (
          <Mic size={15} className="text-green-400" />
        )}
      </div>
    </div>
  );
}
