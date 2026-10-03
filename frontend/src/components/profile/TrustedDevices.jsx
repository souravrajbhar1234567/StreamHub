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
                <strong>{device.deviceName || "Personal Device"}</strong>
                <p className="text-xs text-muted">
                  Last active: {formatDate(device.lastUsedAt)} • IP: {device.ipAddress}
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
