import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { forgotPassword } from "../../services/authApi";

export default function ForgotPassword({ onCodeSent }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await forgotPassword(email);
      setMessage("Verification code sent to your email.");
      if (onCodeSent) onCodeSent(email);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-card">
      <Link to="/login" className="back-link">
        <ArrowLeft size={16} /> Back to login
      </Link>

      <div className="auth-header">
        <h2>Reset your password</h2>
        <p>Enter your email address and we'll send you a 6-digit verification code.</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <div className="input-with-icon">
            <Mail size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary full-width mt-4" disabled={loading}>
          {loading ? "Sending code..." : "Send Verification Code"}
        </button>
      </form>
    </div>
  );
}
