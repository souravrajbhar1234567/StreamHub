import { formatDate } from "../../utils/formatDate";

export default function PaymentTable({ payments = [] }) {
  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Order ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{formatDate(p.createdAt)}</td>
              <td className="font-mono text-xs">{p.invoiceNumber || p._id.slice(0, 8)}</td>
              <td>{p.user?.name || "Customer"}</td>
              <td>{p.planName}</td>
              <td>₹{p.amount}</td>
              <td>
                <span className={`status-badge status-${p.status}`}>
                  {p.status}
                </span>
              </td>
              <td className="font-mono text-xs">{p.razorpayOrderId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
