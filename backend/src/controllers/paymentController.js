import paymentService from "../services/paymentService.js";

export const createOrder = async (req, res, next) => {
  try {
    const { planCode } = req.body;
    const result = await paymentService.createOrder(req.user._id, planCode);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const result = await paymentService.verifyPayment(
      req.user._id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Payment verified and subscription activated!",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentHistory = async (req, res, next) => {
  try {
    const payments = await paymentService.getPaymentHistory(req.user._id);
    res.status(200).json({ success: true, payments });
  } catch (error) {
    next(error);
  }
};

export const getInvoice = async (req, res, next) => {
  try {
    const invoice = await paymentService.getInvoice(
      req.params.paymentId,
      req.user._id
    );
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    next(error);
  }
};

export default {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getInvoice,
};
