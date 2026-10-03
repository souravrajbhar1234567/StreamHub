import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Video, Lock, ArrowLeft, Copy, Check } from "lucide-react";
import { createMeeting } from "../../services/meetingApi";
import { useAuth } from "../../context/AuthContext";

export default function CreateMeeting() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await createMeeting({
        title: title || `${user?.name || "User"}'s Meeting`,
        passcode,
      });
      const meeting = res.data.meeting;
      navigate(`/meetings/${meeting.roomId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create meeting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container max-w-lg mx-auto py-12">
      <Link to="/meetings" className="back-link mb-6">
        <ArrowLeft size={16} /> Back to meetings
      </Link>

      <div className="create-meeting-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <Video size={28} />
          </div>
          <div>
            <span className="text-xs uppercase text-purple-400 font-semibold tracking-wider">
              NEW CALL
            </span>
            <h2>Create Video Meeting</h2>
          </div>
        </div>

        {error && <div className="error-message mb-4">{error}</div>}

        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label>Meeting Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Weekly Tech Standup"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Passcode (Optional)</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                type="text"
                className="form-input"
                placeholder="Leave blank for open room"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg full-width mt-4"
            disabled={loading}
          >
            <Video size={18} />
            <span>{loading ? "Creating Room..." : "Start Instant Meeting"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
