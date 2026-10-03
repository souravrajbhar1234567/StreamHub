import { Shield, Trash2, Smartphone, Monitor } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

export default function TrustedDevices({ devices = [], onRemove }) {
  return (
    <div className="trusted-devices-card">
      <h3>Trusted Devices</h3>
      <div className="devices-list">
        {devices.length === 0 ? (
          <p className="text-muted text-sm">No trusted devices registered.</p>
        ) : (
          devices.map((device) => (
            <div key={device._id} className="device-item">
              <div className="device-icon">
                {device.os?.includes("iOS") || device.os?.includes("Android") ? (
                  <Smartphone size={22} />
                ) : (
                  <Monitor size={22} />
                )}
              </div>
              <div className="device-details">
                <div className="flex items-center gap-2">
                  <strong>{device.deviceName || "Personal Device"}</strong>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                    Trusted Device
                  </span>
                </div>
                <p className="text-xs text-muted">
                  {device.city ? `${device.city}, ${device.country || "India"}` : device.ipAddress} • Last active: {formatDate(device.lastUsedAt)}
                </p>
              </div>
              <button
                className="icon-btn text-red-400"
                onClick={() => onRemove(device._id)}
                title="Remove device"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
