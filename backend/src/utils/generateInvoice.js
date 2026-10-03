import crypto from "crypto";

export const generateInvoiceNumber = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `SH-INV-${dateStr}-${rand}`;
};

export const formatInvoiceData = ({ payment, user, plan }) => {
  return {
    invoiceNumber: payment.invoiceNumber || generateInvoiceNumber(),
    date: new Date().toISOString(),
    customer: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    plan: {
      name: plan.name,
      price: payment.amount,
      currency: payment.currency || "INR",
    },
    payment: {
      method: "Razorpay",
      transactionId: payment.razorpayPaymentId || payment.transactionId || "MANUAL_DEV",
      status: "COMPLETED",
    },
    total: payment.amount,
  };
};

export default { generateInvoiceNumber, formatInvoiceData };
