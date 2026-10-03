import { useState, useRef, useEffect } from "react";
import PlayerControls from "./PlayerControls";
import BufferIndicator from "./BufferIndicator";
import KeyboardShortcuts from "./KeyboardShortcuts";
import NextVideoCountdown from "./NextVideoCountdown";
import { useWatchProgress } from "../../hooks/useWatchProgress";
import { useAuth } from "../../hooks/useAuth";

export default function VideoPlayer({
  src,
  poster,
  title,
  videoId,
  nextVideo,
  onPlayNext,
  initialTime = 0,
}) {
  const { user } = useAuth();
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState("Auto");
  const [isTheater, setIsTheater] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showNextCountdown, setShowNextCountdown] = useState(false);

  // Sync watch progress automatically
  useWatchProgress(videoId, currentTime, duration, user);

  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
      videoRef.current.currentTime = initialTime;
    }
  }, [initialTime]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (time) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleSeekRelative = (seconds) => {
    if (!videoRef.current) return;
    const nextTime = Math.max(0, Math.min(duration, currentTime + seconds));
    handleSeek(nextTime);
  };

  const handleVolumeChange = (val) => {
    if (!videoRef.current) return;
    videoRef.current.volume = val;
    videoRef.current.muted = val === 0;
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSpeedChange = (speed) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const handleEnded = () => {
    setIsPlaying(false);
    if (nextVideo && onPlayNext) {
      setShowNextCountdown(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`custom-video-player-container ${isTheater ? "theater-mode" : ""} ${
        isFullscreen ? "fullscreen" : ""
      }`}
    >
      <KeyboardShortcuts
        onTogglePlay={togglePlay}
        onSeekRelative={handleSeekRelative}
        onToggleMute={toggleMute}
        onToggleFullscreen={toggleFullscreen}
      />

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="custom-video-element"
        onClick={togglePlay}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        playsInline
      />

      <BufferIndicator isBuffering={isBuffering} />

      {showNextCountdown && (
        <NextVideoCountdown
          nextVideo={nextVideo}
          onPlayNext={() => {
            setShowNextCountdown(false);
            onPlayNext();
          }}
          onCancel={() => setShowNextCountdown(false)}
        />
      )}

      <PlayerControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        playbackSpeed={playbackSpeed}
        quality={quality}
        isTheater={isTheater}
        isFullscreen={isFullscreen}
        videoRef={videoRef}
        onTogglePlay={togglePlay}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
        onSpeedChange={handleSpeedChange}
        onQualityChange={setQuality}
        onToggleTheater={() => setIsTheater(!isTheater)}
        onToggleFullscreen={toggleFullscreen}
        onNextVideo={onPlayNext}
      />
    </div>
  );
}
