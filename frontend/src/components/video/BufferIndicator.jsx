export default function BufferIndicator({ isBuffering }) {
  if (!isBuffering) return null;

  return (
    <div className="player-buffering-overlay">
      <div className="spinner"></div>
    </div>
  );
}
