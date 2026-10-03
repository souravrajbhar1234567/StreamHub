import { useState } from "react";
import { UserCircle, MapPin, Check, X } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";
import CommentActions from "./CommentActions";
import ReplyForm from "./ReplyForm";
import ReportComment from "./ReportComment";

export default function CommentItem({
  comment,
  currentUser,
  onLike,
  onDislike,
  onEdit,
  onDelete,
  onAddReply,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [displayText, setDisplayText] = useState(comment.text || comment.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text || comment.content || "");
  const [savingEdit, setSavingEdit] = useState(false);

  const author = comment.user || { name: comment.userName || "User" };
  const isAuthor = currentUser && currentUser._id === (author._id || author.id);
  const canDelete = currentUser && (isAuthor || currentUser.role === "admin");

  // 15-minute time window for editing comments
  const fifteenMinsMs = 15 * 60 * 1000;
  const canEdit = isAuthor && Date.now() - new Date(comment.createdAt).getTime() <= fifteenMinsMs;

  const handleReplySubmit = async (text) => {
    await onAddReply(comment._id, text);
    setShowReplyForm(false);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;
    try {
      setSavingEdit(true);
      if (onEdit) {
        await onEdit(comment._id, editText);
      }
      setDisplayText(editText);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update comment.");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="comment-item-card">
      <div className="comment-avatar">
        {author.avatar ? (
          <img src={author.avatar} alt={author.name} />
        ) : (
          <div className="comment-avatar-fallback">
            {(author.name || "U").charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="comment-main">
        <div className="comment-meta flex flex-wrap items-center gap-2">
          <span className="comment-author-name font-semibold text-slate-100">{author.name}</span>
          {author.membership && author.membership !== "Free" && (
            <span className="comment-tier-badge text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-medium">{author.membership}</span>
          )}
          <span className="comment-location text-[11px] text-muted flex items-center gap-0.5">
            <MapPin size={11} className="text-slate-400" />
            {comment.userLocation || "India"}
          </span>
          <span className="comment-time text-xs text-muted">
            {formatRelativeTime(comment.createdAt)}
          </span>
          {comment.isEdited && (
            <span className="text-[11px] text-muted italic" title="Edited within 15 minutes of posting">
              (edited)
            </span>
          )}
        </div>

        {isEditing ? (
          <div className="comment-edit-box mt-2">
            <textarea
              className="w-full p-2.5 rounded-lg bg-slate-800 border border-purple-500/40 text-sm text-slate-100 focus:outline-none focus:border-purple-400 resize-none"
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Edit your comment..."
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px] text-muted">Editable for up to 15 minutes</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost text-xs"
                  onClick={() => {
                    setIsEditing(false);
                    setEditText(displayText);
                  }}
                  disabled={savingEdit}
                >
                  <X size={13} /> Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary text-xs flex items-center gap-1"
                  onClick={handleSaveEdit}
                  disabled={savingEdit}
                >
                  <Check size={13} /> {savingEdit ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="comment-text-body text-slate-200 mt-1 leading-relaxed whitespace-pre-wrap">
            {displayText}
          </p>
        )}

        <CommentActions
          likesCount={comment.likesCount}
          dislikesCount={comment.dislikesCount}
          canEdit={canEdit && !isEditing}
          canDelete={canDelete}
          originalText={comment.text || comment.content}
          onLike={() => onLike(comment._id)}
          onDislike={() => onDislike(comment._id)}
          onReply={() => setShowReplyForm(!showReplyForm)}
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(comment._id)}
          onReport={() => setShowReportModal(true)}
          onTranslated={(translated) => setDisplayText(translated)}
        />

        {showReplyForm && (
          <ReplyForm
            parentAuthor={author.name}
            onSubmit={handleReplySubmit}
            onCancel={() => setShowReplyForm(false)}
          />
        )}

        {/* Nested replies list */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="comment-replies-list">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply._id || reply.id}
                comment={reply}
                currentUser={currentUser}
                onLike={onLike}
                onDislike={onDislike}
                onDelete={onDelete}
                onAddReply={onAddReply}
              />
            ))}
          </div>
        )}
      </div>

      <ReportComment
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        commentId={comment._id}
      />
    </div>
  );
}
