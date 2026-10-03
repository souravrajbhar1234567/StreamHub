import { Wifi } from "lucide-react";

export default function ConnectionQuality({ quality = "good" }) {
  const colors = {
    good: "text-green-400",
    fair: "text-yellow-400",
    poor: "text-red-400",
  };

  return (
    <div className={`connection-quality-badge ${colors[quality] || colors.good}`} title={`Connection: ${quality}`}>
      <Wifi size={15} />
      <span className="text-xs uppercase">{quality}</span>
    </div>
  );
}
