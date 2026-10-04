import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ShieldAlert } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import OTPVerification from "../../components/auth/OTPVerification";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpRequired, setOtpRequired] = useState(false);
  const [otpInfo, setOtpInfo] = useState(null);

  const from =
    location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await login(form);
      if (res?.requiresOtp) {
        setOtpRequired(true);
        setOtpInfo(res);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpComplete = async (otpCode) => {
    setError("");
    setLoading(true);

    try {
      await login({
        email: form.email,
        password: form.password,
        otp: otpCode,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {otpRequired ? (
          <div>
            <div className="auth-header text-center mb-6">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldAlert size={28} />
              </div>
              <h1 className="text-xl font-bold">New Device Verification</h1>
              <p className="text-sm text-muted mt-1">
                We noticed a login from an unrecognized device or location. Enter the 6-digit verification code sent to{" "}
                <strong className="text-white">{form.email}</strong>.
              </p>
            </div>

            {error && <div className="error-message mb-4">{error}</div>}

            <div className="py-2">
              <OTPVerification length={6} onComplete={handleOtpComplete} />
            </div>

            <div
              style={{
                marginTop: "12px",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                textAlign: "center",
                fontSize: "12px",
                color: "var(--text-secondary)",
              }}
            >
              <span>Demo / Test OTP Code: </span>
              <strong style={{ color: "var(--primary)", letterSpacing: "2px" }}>
                {otpInfo?.demoOtp || "123456"}
              </strong>
            </div>

            {loading && (
              <p className="text-center text-sm text-purple-400 mt-4">Verifying security code...</p>
            )}

            <div className="text-center mt-6">
              <button
                type="button"
                className="btn btn-ghost text-sm text-muted hover:text-white"
                onClick={() => {
                  setOtpRequired(false);
                  setError("");
                }}
              >
                ← Back to Login
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <h1>Welcome back</h1>
              <p>Login to continue to StreamHub</p>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div
              style={{
                padding: "12px 14px",
                marginBottom: "18px",
                borderRadius: "12px",
                background: "rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.25)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: "var(--primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>⚡ Quick Demo Credentials</span>
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>1-Click Auto Fill</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      email: "admin@streamhub.com",
                      password: "AdminPassword123!",
                    });
                    setError("");
                  }}
                  style={{
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "7px 10px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                    boxShadow: "0 2px 8px rgba(79, 70, 229, 0.25)",
                  }}
                >
                  <span>👑 Admin Demo</span>
                  <span style={{ fontSize: "10px", opacity: 0.85, fontWeight: 400 }}>admin@streamhub.com</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      email: "user@streamhub.com",
                      password: "UserPassword123!",
                    });
                    setError("");
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    color: "var(--text-primary)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    padding: "7px 10px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <span>👤 User Demo</span>
                  <span style={{ fontSize: "10px", opacity: 0.85, fontWeight: 400 }}>user@streamhub.com</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Email</label>

              <div className="input-with-icon">
                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <label>Password</label>

              <div className="input-with-icon">
                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <div className="auth-options">
                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary full-width"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="auth-footer">
              Don't have an account?{" "}
              <Link to="/register">Create account</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}