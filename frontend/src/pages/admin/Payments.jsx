import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import PaymentTable from "../../components/admin/PaymentTable";
import { getAdminPayments } from "../../services/adminApi";
import Loader from "../../components/common/Loader";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminPayments()
      .then((res) => setPayments(res.data.payments || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-page-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="admin-header mb-6">
          <span className="eyebrow">FINANCES</span>
          <h1>Transaction History</h1>
          <p>Every Razorpay transaction, invoice, and payment event.</p>
        </div>

        {loading ? (
          <Loader message="Loading payments..." />
        ) : (
          <PaymentTable payments={payments} />
        )}
      </main>
    </div>
  );
}
