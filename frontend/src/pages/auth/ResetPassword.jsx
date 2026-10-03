import { useLocation } from "react-router-dom";
import ResetPasswordComponent from "../../components/auth/ResetPassword";

export default function ResetPassword() {
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  return (
    <div className="auth-page">
      <div className="auth-card">
        <ResetPasswordComponent initialEmail={initialEmail} />
      </div>
    </div>
  );
}
