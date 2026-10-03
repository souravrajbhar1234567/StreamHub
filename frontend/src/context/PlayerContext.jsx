import { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1);
  const [quality, setQuality] = useState("Auto");
  const [isTheater, setIsTheater] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (val) => {
    if (!videoRef.current) return;
    videoRef.current.volume = val;
    videoRef.current.muted = val === 0;
    setVolumeState(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const setPlaybackSpeed = (speed) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeedState(speed);
  };

  const toggleTheater = () => {
    setIsTheater((prev) => !prev);
  };

  return (
    <PlayerContext.Provider
      value={{
        videoRef,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        playbackSpeed,
        setPlaybackSpeed,
        quality,
        setQuality,
        isTheater,
        toggleTheater,
        isBuffering,
        setIsBuffering,
        togglePlay,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      togglePlay: () => {},
      seek: () => {},
    };
  }
  return context;
};

export default PlayerContext;
