import { useEffect } from "react";

export default function KeyboardShortcuts({
  onTogglePlay,
  onSeekRelative,
  onToggleMute,
  onToggleFullscreen,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          if (onTogglePlay) onTogglePlay();
          break;
        case "arrowleft":
          e.preventDefault();
          if (onSeekRelative) onSeekRelative(-5);
          break;
        case "arrowright":
          e.preventDefault();
          if (onSeekRelative) onSeekRelative(5);
          break;
        case "m":
          e.preventDefault();
          if (onToggleMute) onToggleMute();
          break;
        case "f":
          e.preventDefault();
          if (onToggleFullscreen) onToggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onTogglePlay, onSeekRelative, onToggleMute, onToggleFullscreen]);

  return null;
}
