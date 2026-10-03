import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import OTPVerification from "../../components/auth/OTPVerification";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComplete = async (otp) => {
    try {
      setLoading(true);
      setError("");
      // Route user to reset password with verified code
      navigate("/reset-password", { state: { email, otp } });
    } catch (err) {
      setError("Invalid OTP code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Verify Your Code</h1>
          <p>
            Enter the 6-digit code sent to{" "}
            <strong>{email || "your email"}</strong>
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="py-4">
          <OTPVerification length={6} onComplete={handleComplete} />
        </div>

        <p className="auth-footer text-center mt-6">
          Didn't get the code? <Link to="/forgot-password">Resend Code</Link>
        </p>
      </div>
    </div>
  );
}
