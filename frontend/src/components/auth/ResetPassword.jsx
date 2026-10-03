import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { resetPassword } from "../../services/authApi";

export default function ResetPassword({ initialEmail }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(initialEmail || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await resetPassword({ email, otp, newPassword });
      alert("Password reset successfully! Please login with your new password.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-card">
      <Link to="/login" className="back-link">
        <ArrowLeft size={16} /> Back to login
      </Link>

      <div className="auth-header">
        <h2>Enter Verification Code</h2>
        <p>Enter the 6-digit code sent to your email and your new password.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>6-Digit OTP Code</label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            className="form-input text-center text-lg tracking-widest font-mono"
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <div className="input-with-icon">
            <Lock size={18} />
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary full-width mt-4" disabled={loading}>
          {loading ? "Resetting password..." : "Set New Password"}
        </button>
      </form>
    </div>
  );
}
