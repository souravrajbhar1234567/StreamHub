import LocalVideo from "./LocalVideo";
import RemoteVideo from "./RemoteVideo";

export default function ParticipantGrid({
  localStream,
  remoteStreams = new Map(),
  participants = [],
  currentUserName,
  isAudioMuted,
  isVideoOff,
}) {
  const remoteParticipants = participants.filter((p) => p.displayName !== currentUserName);

  return (
    <div className={`participant-grid count-${remoteParticipants.length + 1}`}>
      <LocalVideo
        stream={localStream}
        displayName={currentUserName || "You"}
        isAudioMuted={isAudioMuted}
        isVideoOff={isVideoOff}
      />

      {remoteParticipants.map((p) => (
        <RemoteVideo
          key={p.socketId}
          stream={remoteStreams.get(p.socketId)}
          participant={p}
        />
      ))}
    </div>
  );
}
