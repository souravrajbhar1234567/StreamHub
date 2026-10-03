import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import VideoTable from "../../components/admin/VideoTable";
import Modal from "../../components/common/Modal";
import { getVideos } from "../../services/videoApi";
import {
  createAdminVideo,
  updateAdminVideo,
  deleteAdminVideo,
} from "../../services/adminApi";
import Loader from "../../components/common/Loader";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("Development");
  const [duration, setDuration] = useState("10:00");
  const [isPremium, setIsPremium] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getVideos({ limit: 50 });
      setVideos(res.data.videos || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleCreateVideo = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createAdminVideo({
        title,
        description,
        videoUrl,
        thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
        category,
        duration,
        isPremium,
      });
      setShowAddModal(false);
      setTitle("");
      setDescription("");
      setVideoUrl("");
      fetchVideos();
    } catch (err) {
      alert("Failed to create video.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video permanently?")) return;
    await deleteAdminVideo(id);
    fetchVideos();
  };

  const handleTogglePremium = async (id, currentVal) => {
    await updateAdminVideo(id, { isPremium: currentVal });
    fetchVideos();
  };

  return (
    <div className="admin-page-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="eyebrow">CATALOG</span>
            <h1>Video Management</h1>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} /> Add New Video
          </button>
        </div>

        {loading ? (
          <Loader message="Loading videos..." />
        ) : (
          <VideoTable
            videos={videos}
            onDelete={handleDelete}
            onTogglePremium={handleTogglePremium}
          />
        )}

        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Publish New Video"
        >
          <form onSubmit={handleCreateVideo} className="admin-modal-form">
            <div className="form-group">
              <label>Video Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Mastering Next.js & Server Components"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Video Stream URL (MP4 / HLS / WebM)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://commondatastorage.googleapis.com/.../video.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Thumbnail Image URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://images.unsplash.com/..."
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-input"
                >
                  <option value="Development">Development</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Design">Design</option>
                  <option value="Database">Database</option>
                </select>
              </div>

              <div className="form-group">
                <label>Duration (MM:SS)</label>
                <input
                  type="text"
                  className="form-input"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="14:20"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                />
                <span>Requires Pro / Premium Subscription</span>
              </label>
            </div>

            <div className="modal-actions mt-6">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Publishing..." : "Publish Video"}
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
