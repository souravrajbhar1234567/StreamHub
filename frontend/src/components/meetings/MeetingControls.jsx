import { useState } from "react";
import { MessageSquare, Users, Settings, PhoneOff, Circle, Square, Shield } from "lucide-react";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import CameraSwitchButton from "./CameraSwitchButton";
import ScreenShareButton from "./ScreenShareButton";
import RaiseHand from "./RaiseHand";
import CallTimer from "./CallTimer";
import ConnectionQuality from "./ConnectionQuality";
import MeetingSettings from "./MeetingSettings";
import EndMeetingDialog from "./EndMeetingDialog";
import HostControls from "./HostControls";
import { formatDuration } from "../../utils/formatDuration";

export default function MeetingControls({
  isAudioMuted,
  isVideoOff,
  isScreenSharing,
  isHandRaised,
  isSpeaking,
  participantsCount = 1,
  callDuration = 0,
  isHost = false,
  isRecording = false,
  recordingDuration = 0,
  isRoomLocked = false,
  roomPermissions,
  onToggleAudio,
  onToggleVideo,
  onSwitchCamera,
  onToggleScreenShare,
  onToggleHand,
  onToggleChat,
  onToggleParticipants,
  onStartRecording,
  onStopRecording,
  onMuteAll,
  onLockRoom,
  onUpdatePermissions,
  onLeave,
  onEndForAll,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showHostControls, setShowHostControls] = useState(false);

  return (
    <div className="meeting-bottom-dock relative">
      <div className="dock-left flex items-center gap-3">
        <CallTimer seconds={callDuration} />
        <ConnectionQuality quality="good" />

        {isRecording && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-semibold animate-pulse">
            <Circle size={10} fill="currentColor" />
            <span>REC {formatDuration(recordingDuration)}</span>
          </div>
        )}
      </div>

      <div className="dock-center flex items-center gap-2">
        <div className={`relative ${isSpeaking ? "ring-2 ring-emerald-400 rounded-full" : ""}`}>
          <MicButton isMuted={isAudioMuted} onToggle={onToggleAudio} />
        </div>

        <CameraButton isVideoOff={isVideoOff} onToggle={onToggleVideo} />

        <CameraSwitchButton onSwitch={onSwitchCamera} />

        <ScreenShareButton isSharing={isScreenSharing} onToggle={onToggleScreenShare} />

        {/* Local Call Recording Toggle */}
        <button
          className={`meeting-control-btn ${isRecording ? "bg-red-500 text-white hover:bg-red-600" : "btn-secondary"}`}
          onClick={isRecording ? onStopRecording : onStartRecording}
          title={isRecording ? "Stop Recording (Save .webm)" : "Record Call (Local)"}
          aria-label="Toggle Call Recording"
        >
          {isRecording ? <Square size={18} fill="currentColor" /> : <Circle size={18} className="text-red-400" />}
        </button>

        <RaiseHand isHandRaised={isHandRaised} onToggle={onToggleHand} />

        <button
          className="meeting-control-btn btn-danger"
          onClick={() => setShowEndDialog(true)}
          title="Leave Call"
        >
          <PhoneOff size={20} />
        </button>
      </div>

      <div className="dock-right flex items-center gap-2">
        {isHost && (
          <div className="relative">
            <button
              className={`meeting-control-btn ${showHostControls ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setShowHostControls(!showHostControls)}
              title="Host Moderation Controls"
            >
              <Shield size={18} className="text-purple-400" />
            </button>

            {showHostControls && (
              <div className="absolute bottom-14 right-0 z-50">
                <HostControls
                  onMuteAll={onMuteAll}
                  onLockRoom={onLockRoom}
                  isRoomLocked={isRoomLocked}
                  roomPermissions={roomPermissions}
                  onUpdatePermissions={onUpdatePermissions}
                />
              </div>
            )}
          </div>
        )}

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
