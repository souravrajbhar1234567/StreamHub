import { useState } from "react";
import Modal from "../common/Modal";
import { reportComment } from "../../services/commentApi";

export default function ReportComment({ isOpen, onClose, commentId, onReportSubmitted }) {
  const [reason, setReason] = useState("inappropriate");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await reportComment(commentId, { reason, details });
      if (onReportSubmitted) onReportSubmitted();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Report Comment">
      <form onSubmit={handleSubmit} className="report-comment-form">
        {error && <div className="error-message">{error}</div>}

        <label>Reason for reporting</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="form-input"
        >
          <option value="spam">Spam or scam</option>
          <option value="harassment">Harassment or bullying</option>
          <option value="hate_speech">Hate speech</option>
          <option value="misinformation">Misinformation</option>
          <option value="copyright_violation">Copyright violation</option>
          <option value="inappropriate">Inappropriate content</option>
          <option value="other">Other issue</option>
        </select>

        <label>Additional details (optional)</label>
        <textarea
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Describe what's wrong with this comment..."
          className="form-input"
        />

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
