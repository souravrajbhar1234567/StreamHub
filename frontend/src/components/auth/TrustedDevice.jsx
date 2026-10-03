import { ShieldCheck } from "lucide-react";

export default function TrustedDevice({ rememberDevice, onToggle }) {
  return (
    <label className="trusted-device-checkbox">
      <input
        type="checkbox"
        checked={rememberDevice}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <div className="trusted-device-label">
        <ShieldCheck size={16} />
        <span>Trust this device for 30 days</span>
      </div>
    </label>
  );
}
