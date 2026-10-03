import { useState } from "react";
import ParticipantGrid from "./ParticipantGrid";
import MeetingControls from "./MeetingControls";
import MeetingChat from "./MeetingChat";
import ParticipantList from "./ParticipantList";
import { useMeeting } from "../../hooks/useMeeting";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useAuth } from "../../hooks/useAuth";

export default function MeetingRoom({ roomId, onLeaveRoom }) {
  const { user } = useAuth();
  const {
    meeting,
    participants,
    localStream,
    isAudioMuted,
    isVideoMuted,
    isScreenSharing,
    isHandRaised,
    isSpeaking,
    messages,
    callDuration,
    isRecording,
    recordingDuration,
    isRoomLocked,
    roomPermissions,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    switchCamera,
    toggleHand,
    toggleScreenShare,
    sendChatMessage,
    startRecording,
    stopRecording,
    muteParticipant,
    muteAllParticipants,
    removeParticipant,
    toggleRoomLock,
    assignCohost,
    updatePermissions,
  } = useMeeting();

  const { remoteStreams } = useWebRTC(roomId, localStream);

  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const isHost =
    meeting?.host === user?._id ||
    meeting?.host?._id === user?._id ||
    participants.find((p) => p.userId === user?._id)?.role === "host" ||
    participants[0]?.userId === user?._id;

  const handleLeave = () => {
    leaveRoom();
    if (onLeaveRoom) onLeaveRoom();
  };

  const handleEndForAll = () => {
    leaveRoom();
    if (onLeaveRoom) onLeaveRoom();
  };

  return (
    <div className="meeting-room-viewport">
      <div className="meeting-stage">
        <ParticipantGrid
          localStream={localStream}
          remoteStreams={remoteStreams}
          participants={participants}
          currentUserName={user?.name || "You"}
          isAudioMuted={isAudioMuted}
          isVideoOff={isVideoMuted}
        />
      </div>

      <MeetingChat
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        messages={messages}
        onSendMessage={(text) => sendChatMessage(text, user)}
        currentUser={user}
      />

      <ParticipantList
        isOpen={showParticipants}
        onClose={() => setShowParticipants(false)}
        participants={participants}
        hostName={meeting?.hostName}
        currentUserIsHost={isHost}
        onMuteParticipant={muteParticipant}
        onRemoveParticipant={removeParticipant}
        onAssignCohost={assignCohost}
      />

      <MeetingControls
        isAudioMuted={isAudioMuted}
        isVideoOff={isVideoMuted}
        isScreenSharing={isScreenSharing}
        isHandRaised={isHandRaised}
        isSpeaking={isSpeaking}
        participantsCount={participants.length || 1}
        callDuration={callDuration}
        isHost={isHost}
        isRecording={isRecording}
        recordingDuration={recordingDuration}
        isRoomLocked={isRoomLocked}
        roomPermissions={roomPermissions}
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        onSwitchCamera={switchCamera}
        onToggleScreenShare={toggleScreenShare}
        onToggleHand={toggleHand}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onMuteAll={muteAllParticipants}
        onLockRoom={toggleRoomLock}
        onUpdatePermissions={updatePermissions}
        onToggleChat={() => {
          setShowChat(!showChat);
          if (!showChat) setShowParticipants(false);
        }}
        onToggleParticipants={() => {
          setShowParticipants(!showParticipants);
          if (!showParticipants) setShowChat(false);
        }}
        onLeave={handleLeave}
        onEndForAll={handleEndForAll}
      />
    </div>
  );
}
