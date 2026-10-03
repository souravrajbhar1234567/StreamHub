import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, ArrowLeft, Video, Plus } from "lucide-react";

export default function JoinMeeting() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    if (!roomId.trim()) return;
    navigate(`/meetings/${roomId.trim()}`);
  };

  return (
    <div className="page-container max-w-lg mx-auto py-12">
      <Link to="/" className="back-link mb-6">
        <ArrowLeft size={16} /> Home
      </Link>

      <div className="create-meeting-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
            <LogIn size={28} />
          </div>
          <div>
            <span className="text-xs uppercase text-indigo-400 font-semibold tracking-wider">
              VIDEO CALL
            </span>
            <h2>Join a Meeting</h2>
          </div>
        </div>

        <form onSubmit={handleJoin}>
          <div className="form-group">
            <label>Meeting Room ID or Link</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 1a2b-3c4d-5e6f"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg full-width mt-4"
            disabled={!roomId.trim()}
          >
            <LogIn size={18} /> Join Meeting Room
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-[var(--border)]">
          <p className="text-sm text-muted mb-3">Want to host your own conference call?</p>
          <Link to="/meetings/create" className="btn btn-secondary btn-sm">
            <Plus size={16} /> Create New Meeting
          </Link>
        </div>
      </div>
    </div>
  );
}
