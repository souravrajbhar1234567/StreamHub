import { useNavigate } from "react-router-dom";
import ForgotPasswordComponent from "../../components/auth/ForgotPassword";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleCodeSent = (email) => {
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <ForgotPasswordComponent onCodeSent={handleCodeSent} />
      </div>
    </div>
  );
}
