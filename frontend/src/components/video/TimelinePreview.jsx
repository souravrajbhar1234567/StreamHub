import { formatDuration } from "../../utils/formatDuration";

export default function TimelinePreview({ hoverTime, position, isVisible }) {
  if (!isVisible || hoverTime === null) return null;

  return (
    <div
      className="timeline-preview-tooltip"
      style={{ left: `${position}px` }}
    >
      <span className="timeline-preview-time">{formatDuration(hoverTime)}</span>
    </div>
  );
}
