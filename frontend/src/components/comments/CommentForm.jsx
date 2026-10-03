import { useState } from "react";
import { Send, UserCircle } from "lucide-react";

export default function CommentForm({ user, onSubmit, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;
    await onSubmit(text);
    setText("");
  };

  return (
    <form className="comment-form-container" onSubmit={handleSubmit}>
      <div className="comment-form-avatar">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <UserCircle size={36} />
        )}
      </div>

      <div className="comment-form-body">
        <textarea
          rows={2}
          className="comment-textarea"
          placeholder="Add a comment to the discussion..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
        />
        <div className="comment-form-footer">
          <span className="comment-char-count">{text.length}/1000</span>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!text.trim() || loading}
          >
            <Send size={15} />
            <span>{loading ? "Posting..." : "Comment"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
