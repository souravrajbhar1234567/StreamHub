import { ShieldCheck, Smartphone, Key } from "lucide-react";

export default function SecurityPanel({ user, onToggle2FA }) {
  return (
    <div className="security-panel-card">
      <h3>Two-Factor Authentication (2FA)</h3>
      <div className="two-factor-row">
        <div className="two-factor-info">
          <ShieldCheck size={28} className="text-purple-400" />
          <div>
            <h4>Email OTP Verification</h4>
            <p className="text-sm text-muted">
              Add an extra layer of protection to your account with 6-digit email OTPs.
            </p>
          </div>
        </div>

        <button
          className={`btn ${user?.twoFactorEnabled ? "btn-outline" : "btn-primary"}`}
          onClick={onToggle2FA}
        >
          {user?.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>
      </div>
    </div>
  );
}
