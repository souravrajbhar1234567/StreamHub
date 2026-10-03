import { Play, Pause, SkipForward } from "lucide-react";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import PlaybackSpeed from "./PlaybackSpeed";
import QualitySelector from "./QualitySelector";
import SubtitleSelector from "./SubtitleSelector";
import TheaterMode from "./TheaterMode";
import FullscreenButton from "./FullscreenButton";
import PictureInPicture from "./PictureInPicture";
import { formatDuration } from "../../utils/formatDuration";

export default function PlayerControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackSpeed,
  quality,
  isTheater,
  isFullscreen,
  videoRef,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onSpeedChange,
  onQualityChange,
  onToggleTheater,
  onToggleFullscreen,
  onNextVideo,
}) {
  return (
    <div className="player-controls-overlay">
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={onSeek}
      />

      <div className="player-controls-row">
        <div className="player-controls-left">
          <button
            className="player-control-btn play-pause-btn"
            onClick={onTogglePlay}
            title={isPlaying ? "Pause (k)" : "Play (k)"}
            aria-label="Play/Pause"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
          </button>

          {onNextVideo && (
            <button
              className="player-control-btn"
              onClick={onNextVideo}
              title="Next video (Shift+N)"
            >
              <SkipForward size={18} />
            </button>
          )}

          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />

          <div className="player-time-display">
            <span>{formatDuration(currentTime)}</span>
            <span className="time-separator">/</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div>

        <div className="player-controls-right">
          <PlaybackSpeed speed={playbackSpeed} onSpeedChange={onSpeedChange} />
          <QualitySelector currentQuality={quality} onQualityChange={onQualityChange} />
          <PictureInPicture videoRef={videoRef} />
          <TheaterMode isTheater={isTheater} onToggle={onToggleTheater} />
          <FullscreenButton isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
        </div>
      </div>
    </div>
  );
}
