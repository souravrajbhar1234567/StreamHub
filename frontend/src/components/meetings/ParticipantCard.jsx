import { Mic, MicOff, Hand, Crown, ShieldCheck, UserX, VolumeX } from "lucide-react";

export default function ParticipantCard({
  participant,
  isHost = false,
  currentUserIsHost = false,
  onMute,
  onRemove,
  onAssignCohost,
}) {
  const name = participant?.displayName || "Participant";
  const isSpeaking = !!participant?.isSpeaking;
  const isTargetHost = participant?.role === "host" || isHost;
  const isCohost = participant?.role === "co-host";

  return (
    <div
      className={`participant-card-item flex items-center justify-between p-2 rounded-xl transition-all ${
        isSpeaking ? "bg-emerald-500/10 border border-emerald-500/30" : "hover:bg-white/5"
      }`}
    >
      <div className="participant-info flex items-center gap-2.5">
        <div
          className={`participant-avatar w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
            isSpeaking ? "ring-2 ring-emerald-400 bg-emerald-600 text-white" : "bg-purple-600 text-white"
          }`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="participant-details">
          <div className="participant-name-row flex items-center gap-1.5">
            <span className="participant-name font-medium text-xs text-slate-200">{name}</span>
            {isTargetHost && (
              <span className="host-badge flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400" title="Meeting Host">
                <Crown size={10} /> Host
              </span>
            )}
            {isCohost && (
              <span className="cohost-badge flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400" title="Co-Host">
                <ShieldCheck size={10} /> Co-Host
              </span>
            )}
          </div>
          {isSpeaking && (
            <span className="text-[10px] text-emerald-400 font-semibold animate-pulse">Speaking...</span>
          )}
        </div>
      </div>

      <div className="participant-icons flex items-center gap-1.5">
        {currentUserIsHost && !isTargetHost && (
          <div className="host-actions flex items-center gap-1 mr-1">
            <button
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-red-400"
              onClick={() => onMute && onMute(participant.socketId)}
              title="Mute participant"
            >
              <VolumeX size={13} />
            </button>
            <button
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-blue-400"
              onClick={() => onAssignCohost && onAssignCohost(participant.socketId)}
              title="Assign co-host"
            >
              <ShieldCheck size={13} />
            </button>
            <button
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-red-500"
              onClick={() => onRemove && onRemove(participant.socketId)}
              title="Remove from meeting"
            >
              <UserX size={13} />
            </button>
          </div>
        )}

        {participant?.handRaised && (
          <span className="hand-badge" title="Hand Raised">
            <Hand size={14} className="text-yellow-400" />
          </span>
        )}

        {participant?.audioMuted ? (
          <MicOff size={15} className="text-red-400" />
        ) : (
          <Mic size={15} className="text-emerald-400" />
        )}
      </div>
    </div>
  );
}
