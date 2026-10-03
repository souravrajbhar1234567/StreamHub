import api from "./api";

export const createPaymentOrder = async (planCode) => {
  return api.post("/payments/order", { planCode });
};

export const verifyPayment = async (data) => {
  return api.post("/payments/verify", data);
};

export const getPaymentHistory = async () => {
  return api.get("/payments/history");
};

export const getInvoice = async (paymentId) => {
  return api.get(`/payments/invoice/${paymentId}`);
};

export const getRazorpayKey = async () => {
  return api.get("/payments/key");
};

export default {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  getInvoice,
  getRazorpayKey,
};
