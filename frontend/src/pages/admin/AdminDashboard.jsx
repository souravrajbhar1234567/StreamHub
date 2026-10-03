import { useState, useEffect } from "react";
import { Users, Video, CreditCard, DollarSign, Download, Calendar } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import StatsCard from "../../components/admin/StatsCard";
import AnalyticsCharts from "../../components/admin/AnalyticsCharts";
import { getAdminStats } from "../../services/adminApi";
import Loader from "../../components/common/Loader";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.data.stats))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Loading admin metrics..." />;

  return (
    <div className="admin-page-layout">
      <AdminSidebar />

      <main className="admin-main-content">
        <div className="admin-header mb-8">
          <div>
            <span className="eyebrow">CONTROL CENTER</span>
            <h1>Platform Overview</h1>
            <p>Real-time analytics, user growth, revenue, and infrastructure metrics.</p>
          </div>
        </div>

        <div className="stats-cards-grid mb-8">
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            trend="+14% this month"
            color="purple"
          />
          <StatsCard
            title="Active Subscriptions"
            value={stats?.activeSubscriptions || 0}
            icon={CreditCard}
            trend="+8% this month"
            color="indigo"
          />
          <StatsCard
            title="Total Revenue"
            value={`₹${stats?.totalRevenue || 0}`}
            icon={DollarSign}
            trend="+22% this month"
            color="green"
          />
          <StatsCard
            title="Video Catalog"
            value={stats?.totalVideos || 0}
            icon={Video}
            trend="Active streams"
            color="pink"
          />
          <StatsCard
            title="Offline Downloads"
            value={stats?.totalDownloads || 0}
            icon={Download}
            color="blue"
          />
          <StatsCard
            title="Active Meetings"
            value={stats?.activeMeetings || 0}
            icon={Calendar}
            color="amber"
          />
        </div>

        <div className="mb-8">
          <AnalyticsCharts />
        </div>
      </main>
    </div>
  );
}
