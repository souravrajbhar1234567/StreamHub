import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { getPasswordStrength } from "../../utils/validators";

export default function RegisterForm({ onSubmit, loading, error }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    onSubmit({ name, email, password });
  };

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {(error || localError) && (
        <div className="error-message">{localError || error}</div>
      )}

      <div className="form-group">
        <label>Full Name</label>
        <div className="input-with-icon">
          <User size={18} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
      </div>

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

      <div className="form-group">
        <label>Password</label>
        <div className="input-with-icon">
          <Lock size={18} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {password && (
          <div className="password-strength-indicator">
            <div className="strength-bar-track">
              <div
                className={`strength-bar-fill ${strengthColors[strength] || "bg-gray-500"}`}
                style={{ width: `${(strength / 4) * 100}%` }}
              ></div>
            </div>
            <span className="strength-text">{strengthLabels[strength]}</span>
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <div className="input-with-icon">
          <Lock size={18} />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary full-width mt-4"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
