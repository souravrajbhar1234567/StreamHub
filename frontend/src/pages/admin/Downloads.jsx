import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DownloadTable from "../../components/admin/DownloadTable";
import { getAdminDownloads } from "../../services/adminApi";
import Loader from "../../components/common/Loader";

export default function AdminDownloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDownloads()
      .then((res) => setDownloads(res.data.downloads || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-page-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="admin-header mb-6">
          <span className="eyebrow">STORAGE & OFFLINE</span>
          <h1>Offline Downloads</h1>
          <p>User download sessions, bandwidth consumption, and security tokens.</p>
        </div>

        {loading ? (
          <Loader message="Loading downloads..." />
        ) : (
          <DownloadTable downloads={downloads} />
        )}
      </main>
    </div>
  );
}