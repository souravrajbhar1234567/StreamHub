import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import SecurityPanel from "../../components/profile/SecurityPanel";
import LoginHistory from "../../components/profile/LoginHistory";
import TrustedDevices from "../../components/profile/TrustedDevices";
import { updateProfile, getDevices, removeDevice } from "../../services/authApi";
import api from "../../services/api";

export default function Security() {
  const { user, loadUser } = useAuth();
  const [devices, setDevices] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getDevices()
      .then((res) => setDevices(res.data.devices || []))
      .catch(() => {});

    api.get("/security/overview")
      .then((res) => setLogs(res.data.recentLogs || []))
      .catch(() => {});
  }, []);

  const handleToggle2FA = async () => {
    const next = !user?.twoFactorEnabled;
    await updateProfile({ twoFactorEnabled: next });
    if (loadUser) loadUser();
  };

  const handleRemoveDevice = async (id) => {
    await removeDevice(id);
    setDevices((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <div className="page-container">
      <div className="section-heading mb-6">
        <span className="eyebrow">PROTECTION</span>
        <h1>Security & Privacy</h1>
        <p>Review active devices, multi-factor authentication, and security audit trails.</p>
      </div>

      <div className="flex flex-col gap-6">
        <SecurityPanel user={user} onToggle2FA={handleToggle2FA} />
        <TrustedDevices devices={devices} onRemove={handleRemoveDevice} />
        <LoginHistory logs={logs} />
      </div>
    </div>
  );
}
