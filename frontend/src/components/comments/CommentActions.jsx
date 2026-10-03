import { ThumbsUp, ThumbsDown, MessageSquare, Flag, Trash2, Edit2 } from "lucide-react";
import TranslationButton from "./TranslationButton";

export default function CommentActions({
  likesCount = 0,
  dislikesCount = 0,
  canEdit = false,
  canDelete = false,
  originalText,
  onLike,
  onDislike,
  onReply,
  onEdit,
  onDelete,
  onReport,
  onTranslated,
}) {
  return (
    <div className="comment-actions-bar flex items-center gap-3 mt-2">
      <button className="comment-action-btn flex items-center gap-1 text-xs text-muted hover:text-white" onClick={onLike} title="Like">
        <ThumbsUp size={14} />
        <span>{likesCount > 0 ? likesCount : ""}</span>
      </button>

      <button className="comment-action-btn flex items-center gap-1 text-xs text-muted hover:text-white" onClick={onDislike} title="Dislike">
        <ThumbsDown size={14} />
        <span>{dislikesCount > 0 ? dislikesCount : ""}</span>
      </button>

      {onReply && (
        <button className="comment-action-btn flex items-center gap-1 text-xs text-muted hover:text-white" onClick={onReply} title="Reply">
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

      {canEdit && (
        <button className="comment-action-btn flex items-center gap-1 text-xs text-muted hover:text-purple-300" onClick={onEdit} title="Edit comment (within 15 min)">
          <Edit2 size={13} />
          <span>Edit</span>
        </button>
      )}

      <button className="comment-action-btn text-muted hover:text-amber-400" onClick={onReport} title="Report">
        <Flag size={14} />
      </button>

      {canDelete && (
        <button className="comment-action-btn text-red-400 hover:text-red-300" onClick={onDelete} title="Delete">
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
