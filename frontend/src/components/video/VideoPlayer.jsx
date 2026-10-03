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

  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [bufferedTime, setBufferedTime] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimeoutRef = useRef(null);

  // Sync watch progress automatically
  useWatchProgress(videoId, currentTime, duration, user);

  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
      videoRef.current.currentTime = initialTime;
    }
  }, [initialTime]);

  // Ensure only one video plays at a time
  useEffect(() => {
    const handleOtherPlay = (e) => {
      if (e.detail?.videoId !== videoId && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("streamhub-play-video", handleOtherPlay);
    return () => window.removeEventListener("streamhub-play-video", handleOtherPlay);
  }, [videoId]);

  const resetHideTimer = () => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (isPlaying) {
      hideTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setControlsVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    } else {
      resetHideTimer();
    }
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      window.dispatchEvent(new CustomEvent("streamhub-play-video", { detail: { videoId } }));
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
    resetHideTimer();
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
    resetHideTimer();
  };

  const handleVolumeAdjust = (delta) => {
    const nextVol = Math.max(0, Math.min(1, Math.round((volume + delta) * 100) / 100));
    handleVolumeChange(nextVol);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    resetHideTimer();
  };

  const handleSpeedChange = (speed) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    resetHideTimer();
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [0.5, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    handleSpeedChange(nextSpeed);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn("PiP not supported or failed:", err.message);
    }
  };

  const toggleSubtitles = () => {
    setSubtitlesEnabled((prev) => !prev);
    resetHideTimer();
  };

  const handleProgress = () => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      const buffEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferedTime(buffEnd);
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
      } ${!controlsVisible && isPlaying ? "controls-hidden" : ""}`}
      onMouseMove={resetHideTimer}
      onMouseEnter={() => setControlsVisible(true)}
    >
      <KeyboardShortcuts
        onTogglePlay={togglePlay}
        onSeekRelative={handleSeekRelative}
        onVolumeAdjust={handleVolumeAdjust}
        onToggleMute={toggleMute}
        onCycleSpeed={cyclePlaybackSpeed}
        onTogglePiP={togglePiP}
        onToggleTheater={() => setIsTheater((prev) => !prev)}
        onToggleSubtitles={toggleSubtitles}
        onToggleFullscreen={toggleFullscreen}
        onNextVideo={onPlayNext}
      />

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="custom-video-element"
        onClick={togglePlay}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onProgress={handleProgress}
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

      <div className={`transition-opacity duration-300 ${controlsVisible || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <PlayerControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          buffered={bufferedTime}
          volume={volume}
          isMuted={isMuted}
          playbackSpeed={playbackSpeed}
          quality={quality}
          isTheater={isTheater}
          isFullscreen={isFullscreen}
          subtitlesEnabled={subtitlesEnabled}
          videoRef={videoRef}
          onTogglePlay={togglePlay}
          onSeek={handleSeek}
          onSeekRelative={handleSeekRelative}
          onVolumeChange={handleVolumeChange}
          onToggleMute={toggleMute}
          onSpeedChange={handleSpeedChange}
          onQualityChange={setQuality}
          onToggleTheater={() => setIsTheater(!isTheater)}
          onToggleFullscreen={toggleFullscreen}
          onToggleSubtitles={toggleSubtitles}
          onNextVideo={onPlayNext}
        />
      </div>
    </div>
  );
}
