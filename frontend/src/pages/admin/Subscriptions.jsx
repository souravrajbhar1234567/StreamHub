import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import SubscriptionTable from "../../components/admin/SubscriptionTable";
import { getAdminSubscriptions } from "../../services/adminApi";
import Loader from "../../components/common/Loader";

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminSubscriptions()
      .then((res) => setSubscriptions(res.data.subscriptions || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-page-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="admin-header mb-6">
          <span className="eyebrow">RECURRING REVENUE</span>
          <h1>Subscriptions Management</h1>
          <p>Active and past customer subscription records across all tiers.</p>
        </div>

        {loading ? (
          <Loader message="Loading subscriptions..." />
        ) : (
          <SubscriptionTable subscriptions={subscriptions} />
        )}
      </main>
    </div>
  );
}
