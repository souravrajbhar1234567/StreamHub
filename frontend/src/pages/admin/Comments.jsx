import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import CommentModeration from "../../components/admin/CommentModeration";
import { getAdminReports, resolveAdminReport } from "../../services/adminApi";
import Loader from "../../components/common/Loader";

export default function AdminComments() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = () => {
    setLoading(true);
    getAdminReports()
      .then((res) => setReports(res.data.reports || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (reportId, action) => {
    await resolveAdminReport(reportId, { action });
    fetchReports();
  };

  return (
    <div className="admin-page-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="admin-header mb-6">
          <span className="eyebrow">COMMUNITY</span>
          <h1>Comments & Moderation</h1>
          <p>Review community reported comments and enforce content safety guidelines.</p>
        </div>

        {loading ? (
          <Loader message="Loading moderation queue..." />
        ) : (
          <CommentModeration reports={reports} onResolve={handleResolve} />
        )}
      </main>
    </div>
  );
}
