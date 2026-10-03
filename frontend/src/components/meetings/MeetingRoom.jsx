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
    messages,
    callDuration,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    toggleHand,
    toggleScreenShare,
    sendChatMessage,
  } = useMeeting();

  const { remoteStreams } = useWebRTC(roomId, localStream);

  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const isHost = meeting?.host === user?._id || meeting?.host?._id === user?._id;

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
      />

      <MeetingControls
        isAudioMuted={isAudioMuted}
        isVideoOff={isVideoMuted}
        isScreenSharing={isScreenSharing}
        isHandRaised={isHandRaised}
        participantsCount={participants.length || 1}
        callDuration={callDuration}
        isHost={isHost}
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        onToggleScreenShare={toggleScreenShare}
        onToggleHand={toggleHand}
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
