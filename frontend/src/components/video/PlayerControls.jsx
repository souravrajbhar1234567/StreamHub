import { Play, Pause, SkipForward, RotateCcw, RotateCw } from "lucide-react";
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
  buffered,
  volume,
  isMuted,
  playbackSpeed,
  quality,
  isTheater,
  isFullscreen,
  subtitlesEnabled,
  videoRef,
  onTogglePlay,
  onSeek,
  onSeekRelative,
  onVolumeChange,
  onToggleMute,
  onSpeedChange,
  onQualityChange,
  onToggleTheater,
  onToggleFullscreen,
  onToggleSubtitles,
  onNextVideo,
}) {
  const remainingTime = Math.max(0, duration - currentTime);

  return (
    <div className="player-controls-overlay">
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        buffered={buffered}
        onSeek={onSeek}
      />

      <div className="player-controls-row">
        <div className="player-controls-left">
          <button
            className="player-control-btn play-pause-btn"
            onClick={onTogglePlay}
            title={isPlaying ? "Pause (k/Space)" : "Play (k/Space)"}
            aria-label="Play/Pause"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
          </button>

          <button
            className="player-control-btn"
            onClick={() => onSeekRelative && onSeekRelative(-10)}
            title="Rewind 10 seconds (←)"
            aria-label="Rewind 10s"
          >
            <RotateCcw size={17} />
          </button>

          <button
            className="player-control-btn"
            onClick={() => onSeekRelative && onSeekRelative(10)}
            title="Forward 10 seconds (→)"
            aria-label="Forward 10s"
          >
            <RotateCw size={17} />
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

          <div className="player-time-display flex items-center gap-1.5 text-xs text-slate-200">
            <span>{formatDuration(currentTime)}</span>
            <span className="text-muted">/</span>
            <span>{formatDuration(duration)}</span>
            <span className="text-muted ml-1" title="Remaining time">
              (-{formatDuration(remainingTime)})
            </span>
          </div>
        </div>

        <div className="player-controls-right">
          <SubtitleSelector enabled={subtitlesEnabled} onToggle={onToggleSubtitles} />
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
