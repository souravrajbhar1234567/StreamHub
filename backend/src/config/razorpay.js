import Razorpay from "razorpay";
import { ENV } from "./env.js";

let razorpayInstance = null;

if (ENV.RAZORPAY_KEY_ID && ENV.RAZORPAY_KEY_SECRET) {
  try {
    razorpayInstance = new Razorpay({
      key_id: ENV.RAZORPAY_KEY_ID,
      key_secret: ENV.RAZORPAY_KEY_SECRET,
    });
  } catch (err) {
    console.warn("⚠️ Razorpay init warning:", err.message);
  }
}

export const getRazorpayInstance = () => razorpayInstance;
export default razorpayInstance;
