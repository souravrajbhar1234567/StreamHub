import { useState } from "react";
import { UserCircle } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";
import CommentActions from "./CommentActions";
import ReplyForm from "./ReplyForm";
import ReportComment from "./ReportComment";

export default function CommentItem({
  comment,
  currentUser,
  onLike,
  onDislike,
  onDelete,
  onAddReply,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [displayText, setDisplayText] = useState(comment.text || comment.content || "");

  const author = comment.user || { name: comment.userName || "User" };
  const canDelete =
    currentUser &&
    (currentUser._id === (author._id || author.id) ||
      currentUser.role === "admin");

  const handleReplySubmit = async (text) => {
    await onAddReply(comment._id, text);
    setShowReplyForm(false);
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
        <div className="comment-meta">
          <span className="comment-author-name">{author.name}</span>
          {author.membership && author.membership !== "Free" && (
            <span className="comment-tier-badge">{author.membership}</span>
          )}
          <span className="comment-time">
            {formatRelativeTime(comment.createdAt)}
          </span>
        </div>

        <p className="comment-text-body">{displayText}</p>

        <CommentActions
          likesCount={comment.likesCount}
          dislikesCount={comment.dislikesCount}
          canDelete={canDelete}
          originalText={comment.text || comment.content}
          onLike={() => onLike(comment._id)}
          onDislike={() => onDislike(comment._id)}
          onReply={() => setShowReplyForm(!showReplyForm)}
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
