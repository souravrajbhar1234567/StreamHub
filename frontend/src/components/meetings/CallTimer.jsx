import { formatDuration } from "../../utils/formatDuration";

export default function CallTimer({ seconds = 0 }) {
  return (
    <div className="meeting-call-timer">
      <span className="recording-dot"></span>
      <span>{formatDuration(seconds)}</span>
    </div>
  );
}
