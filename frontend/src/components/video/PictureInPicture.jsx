import { PictureInPicture2 } from "lucide-react";

export default function PictureInPicture({ videoRef }) {
  const togglePiP = async () => {
    if (!videoRef?.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (err) {
      console.warn("PiP not supported or failed:", err.message);
    }
  };

  return (
    <button
      className="player-control-btn"
      onClick={togglePiP}
      title="Picture-in-Picture"
      aria-label="Picture in picture"
    >
      <PictureInPicture2 size={18} />
    </button>
  );
}
