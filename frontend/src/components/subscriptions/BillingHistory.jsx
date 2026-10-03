import { useState, useEffect } from "react";
import { Receipt, Download } from "lucide-react";
import { getPaymentHistory } from "../../services/paymentApi";
import { formatDate } from "../../utils/formatDate";

export default function BillingHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaymentHistory()
      .then((res) => setPayments(res.data.payments || []))
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-muted text-sm py-4">Loading invoice history...</div>;
  }

  if (payments.length === 0) {
    return (
      <div className="empty-billing-card">
        <Receipt size={32} />
        <p>No billing or payment history available yet.</p>
      </div>
    );
  }

  return (
    <div className="billing-history-wrap">
      <h3>Billing History & Receipts</h3>
      <table className="billing-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Invoice</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id || p.id}>
              <td>{formatDate(p.createdAt)}</td>
              <td className="font-mono">{p.invoiceNumber || p._id.slice(0, 10)}</td>
              <td>{p.planName}</td>
              <td>₹{p.amount}</td>
              <td>
                <span className={`status-badge status-${p.status}`}>{p.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
