import { useState } from "react";
import { Send, X } from "lucide-react";

export default function ReplyForm({ parentAuthor, onSubmit, onCancel }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      setLoading(true);
      await onSubmit(text);
      setText("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <div className="reply-input-wrap">
        <input
          type="text"
          className="reply-input"
          placeholder={`Replying to @${parentAuthor || "user"}...`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <div className="reply-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onCancel}
            title="Cancel reply"
          >
            <X size={16} />
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!text.trim() || loading}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </form>
  );
}
