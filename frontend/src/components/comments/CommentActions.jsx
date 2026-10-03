import { ThumbsUp, ThumbsDown, MessageSquare, Flag, Trash2 } from "lucide-react";
import TranslationButton from "./TranslationButton";

export default function CommentActions({
  likesCount = 0,
  dislikesCount = 0,
  canDelete = false,
  originalText,
  onLike,
  onDislike,
  onReply,
  onDelete,
  onReport,
  onTranslated,
}) {
  return (
    <div className="comment-actions-bar">
      <button className="comment-action-btn" onClick={onLike} title="Like">
        <ThumbsUp size={14} />
        <span>{likesCount > 0 ? likesCount : ""}</span>
      </button>

      <button className="comment-action-btn" onClick={onDislike} title="Dislike">
        <ThumbsDown size={14} />
        <span>{dislikesCount > 0 ? dislikesCount : ""}</span>
      </button>

      {onReply && (
        <button className="comment-action-btn" onClick={onReply} title="Reply">
          <MessageSquare size={14} />
          <span>Reply</span>
        </button>
      )}

      {originalText && (
        <TranslationButton
          originalText={originalText}
          onTranslated={onTranslated}
        />
      )}

      <button className="comment-action-btn" onClick={onReport} title="Report">
        <Flag size={14} />
      </button>

      {canDelete && (
        <button className="comment-action-btn text-red-400" onClick={onDelete} title="Delete">
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
