import { useState } from "react";
import { Save, User } from "lucide-react";
import { updateProfile } from "../../services/authApi";

export default function ProfileForm({ user, onProfileUpdated }) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      const res = await updateProfile({ name, bio, avatar });
      setSuccess("Profile updated successfully!");
      if (onProfileUpdated) onProfileUpdated(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form-card">
      <h3>Personal Information</h3>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-input"
            value={user?.email || ""}
            disabled
          />
          <span className="text-xs text-muted">Email address cannot be changed.</span>
        </div>

        <div className="form-group">
          <label>Avatar Image URL</label>
          <input
            type="url"
            className="form-input"
            placeholder="https://example.com/avatar.jpg"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            rows={3}
            className="form-input"
            placeholder="Tell us a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={300}
          />
          <span className="text-xs text-muted">{bio.length}/300 characters</span>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
