import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AuditLogTable from "../../components/admin/AuditLogTable";
import { getAdminAuditLogs } from "../../services/adminApi";
import Loader from "../../components/common/Loader";

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminAuditLogs()
      .then((res) => setLogs(res.data.logs || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-page-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="admin-header mb-6">
          <span className="eyebrow">SECURITY AUDIT</span>
          <h1>Security Audit Logs</h1>
          <p>System events, user access attempts, IP addresses, and administrative activities.</p>
        </div>

        {loading ? (
          <Loader message="Loading audit logs..." />
        ) : (
          <AuditLogTable logs={logs} />
        )}
      </main>
    </div>
  );
}
