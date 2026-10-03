import { useEffect } from "react";

export default function KeyboardShortcuts({
  onTogglePlay,
  onSeekRelative,
  onVolumeAdjust,
  onToggleMute,
  onCycleSpeed,
  onTogglePiP,
  onToggleTheater,
  onToggleSubtitles,
  onToggleFullscreen,
  onNextVideo,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();

      switch (key) {
        case " ":
        case "k":
          e.preventDefault();
          if (onTogglePlay) onTogglePlay();
          break;

        case "arrowleft":
          e.preventDefault();
          // Shift + arrow skips larger interval (30s), normal skips 10s
          if (onSeekRelative) onSeekRelative(e.shiftKey ? -30 : -10);
          break;

        case "arrowright":
          e.preventDefault();
          if (onSeekRelative) onSeekRelative(e.shiftKey ? 30 : 10);
          break;

        case "arrowup":
          e.preventDefault();
          if (onVolumeAdjust) onVolumeAdjust(0.05);
          break;

        case "arrowdown":
          e.preventDefault();
          if (onVolumeAdjust) onVolumeAdjust(-0.05);
          break;

        case "m":
          e.preventDefault();
          if (onToggleMute) onToggleMute();
          break;

        case "s":
          e.preventDefault();
          if (onCycleSpeed) onCycleSpeed();
          break;

        case "p":
          e.preventDefault();
          if (onTogglePiP) onTogglePiP();
          break;

        case "t":
          e.preventDefault();
          if (onToggleTheater) onToggleTheater();
          break;

        case "c":
          e.preventDefault();
          if (onToggleSubtitles) onToggleSubtitles();
          break;

        case "f":
          e.preventDefault();
          if (onToggleFullscreen) onToggleFullscreen();
          break;

        case "n":
          if (e.shiftKey) {
            e.preventDefault();
            if (onNextVideo) onNextVideo();
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    onTogglePlay,
    onSeekRelative,
    onVolumeAdjust,
    onToggleMute,
    onCycleSpeed,
    onTogglePiP,
    onToggleTheater,
    onToggleSubtitles,
    onToggleFullscreen,
    onNextVideo,
  ]);

  return null;
}
