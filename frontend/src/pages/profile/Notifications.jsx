import { useState, useEffect } from "react";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import api from "../../services/api";
import { formatDate } from "../../utils/formatDate";
import Loader from "../../components/common/Loader";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    setLoading(true);
    api.get("/notifications")
      .then((res) => setNotifications(res.data.notifications || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    await api.put("/notifications/read-all");
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotif = async (id) => {
    await api.delete(`/notifications/${id}`);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  if (loading) return <Loader message="Loading notifications..." />;

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="eyebrow">INBOX</span>
          <h1>Notifications</h1>
        </div>

        {notifications.length > 0 && (
          <button className="btn btn-outline btn-sm" onClick={markAllRead}>
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state py-12">
          <Bell size={48} className="text-muted mx-auto mb-3" />
          <h3>All Caught Up</h3>
          <p className="text-muted">You have no new notifications.</p>
        </div>
      ) : (
        <div className="notifications-stack">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`notification-item-card ${n.isRead ? "read" : "unread"}`}
            >
              <div className="flex-1">
                <h4 className="font-semibold">{n.title}</h4>
                <p className="text-sm mt-1">{n.message}</p>
                <span className="text-xs text-muted mt-2 block">
                  {formatDate(n.createdAt)}
                </span>
              </div>
              <button
                className="icon-btn text-muted hover:text-red-400"
                onClick={() => deleteNotif(n._id)}
                title="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
