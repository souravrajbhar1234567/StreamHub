import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import MeetingTable from "../../components/admin/MeetingTable";
import { getAdminMeetings } from "../../services/adminApi";
import Loader from "../../components/common/Loader";

export default function AdminMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminMeetings()
      .then((res) => setMeetings(res.data.meetings || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-page-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="admin-header mb-6">
          <span className="eyebrow">CONFERENCING</span>
          <h1>Meeting Rooms Monitor</h1>
          <p>Active and past WebRTC video conference sessions.</p>
        </div>

        {loading ? (
          <Loader message="Loading meetings..." />
        ) : (
          <MeetingTable meetings={meetings} />
        )}
      </main>
    </div>
  );
}
