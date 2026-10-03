import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import CommentSort from "./CommentSort";
import { getComments, addComment } from "../../services/videoApi";
import { deleteComment, reactToComment, updateComment } from "../../services/commentApi";

export default function CommentSection({ videoId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!videoId) return;
    try {
      setLoading(true);
      const res = await getComments(videoId, { sort });
      setComments(res.data.comments || res.data.data || []);
    } catch (err) {
      console.warn("Failed to load comments:", err.message);
    } finally {
      setLoading(false);
    }
  }, [videoId, sort]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async (text) => {
    try {
      setSubmitting(true);
      const res = await addComment(videoId, { text });
      const newComment = res.data.comment || res.data.data || res.data;
      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddReply = async (parentCommentId, text) => {
    try {
      const res = await addComment(videoId, { text, parentCommentId });
      const reply = res.data.comment || res.data.data;
      setComments((prev) =>
        prev.map((c) => {
          if (c._id === parentCommentId) {
            return {
              ...c,
              replies: [...(c.replies || []), reply],
            };
          }
          return c;
        })
      );
    } catch (err) {
      alert("Failed to submit reply.");
    }
  };

  const handleLike = async (commentId) => {
    if (!currentUser) return alert("Please login to like comments.");
    try {
      await reactToComment(commentId, "like");
      fetchComments();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDislike = async (commentId) => {
    if (!currentUser) return alert("Please login to dislike comments.");
    try {
      await reactToComment(commentId, "dislike");
      fetchComments();
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("Failed to delete comment.");
    }
  };

  const handleEditComment = async (commentId, text) => {
    await updateComment(commentId, text);
    fetchComments();
  };

  return (
    <section className="comments-section-container">
      <div className="comments-header">
        <div className="comments-title-wrap">
          <MessageSquare size={20} />
          <h3>{comments.length} Comments</h3>
        </div>
        <CommentSort sort={sort} onSortChange={setSort} />
      </div>

      {currentUser ? (
        <CommentForm
          user={currentUser}
          onSubmit={handleAddComment}
          loading={submitting}
        />
      ) : (
        <div className="login-to-comment-banner">
          <p>
            Join the conversation. <Link to="/login">Sign in</Link> to post a comment.
          </p>
        </div>
      )}

      {loading ? (
        <div className="comments-loading">
          <div className="spinner"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="empty-comments">
          <p>No comments yet. Be the first to start the discussion!</p>
        </div>
      ) : (
        <div className="comments-list-wrap">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id || comment.id}
              comment={comment}
              currentUser={currentUser}
              onLike={handleLike}
              onDislike={handleDislike}
              onEdit={handleEditComment}
              onDelete={handleDelete}
              onAddReply={handleAddReply}
            />
          ))}
        </div>
      )}
    </section>
  );
}
