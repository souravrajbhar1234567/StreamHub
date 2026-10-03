import { useState } from "react";
import { MessageSquare, Users, Settings, PhoneOff } from "lucide-react";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import ScreenShareButton from "./ScreenShareButton";
import RaiseHand from "./RaiseHand";
import CallTimer from "./CallTimer";
import ConnectionQuality from "./ConnectionQuality";
import MeetingSettings from "./MeetingSettings";
import EndMeetingDialog from "./EndMeetingDialog";

export default function MeetingControls({
  isAudioMuted,
  isVideoOff,
  isScreenSharing,
  isHandRaised,
  participantsCount = 1,
  callDuration = 0,
  isHost = false,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onToggleHand,
  onToggleChat,
  onToggleParticipants,
  onLeave,
  onEndForAll,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);

  return (
    <div className="meeting-bottom-dock">
      <div className="dock-left">
        <CallTimer seconds={callDuration} />
        <ConnectionQuality quality="good" />
      </div>

      <div className="dock-center">
        <MicButton isMuted={isAudioMuted} onToggle={onToggleAudio} />
        <CameraButton isVideoOff={isVideoOff} onToggle={onToggleVideo} />
        <ScreenShareButton isSharing={isScreenSharing} onToggle={onToggleScreenShare} />
        <RaiseHand isHandRaised={isHandRaised} onToggle={onToggleHand} />

        <button
          className="meeting-control-btn btn-danger"
          onClick={() => setShowEndDialog(true)}
          title="Leave Call"
        >
          <PhoneOff size={20} />
        </button>
      </div>

      <div className="dock-right">
        <button
          className="meeting-control-btn btn-secondary"
          onClick={onToggleParticipants}
          title="Participants"
        >
          <Users size={18} />
          <span className="dock-badge">{participantsCount}</span>
        </button>

        <button
          className="meeting-control-btn btn-secondary"
          onClick={onToggleChat}
          title="In-call chat"
        >
          <MessageSquare size={18} />
        </button>

        <button
          className="meeting-control-btn btn-secondary"
          onClick={() => setShowSettings(true)}
          title="Meeting Settings"
        >
          <Settings size={18} />
        </button>
      </div>

      <MeetingSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <EndMeetingDialog
        isOpen={showEndDialog}
        onClose={() => setShowEndDialog(false)}
        isHost={isHost}
        onLeave={onLeave}
        onEndForAll={onEndForAll}
      />
    </div>
  );
}
