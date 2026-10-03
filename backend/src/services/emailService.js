import { getTransporter } from "../config/mail.js";
import { ENV } from "../config/env.js";

export const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = getTransporter();

  if (!ENV.SMTP_USER || !transporter) {
    console.log("📨 [SIMULATED EMAIL DISPATCH]");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${text || "[HTML Content]"}`);
    return { simulated: true, success: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"StreamHub" <${ENV.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const sendOTPEmail = async (email, otp) => {
  return sendEmail({
    to: email,
    subject: "StreamHub - Verification Code",
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    html: `<h2>StreamHub Verification</h2><p>Your OTP is: <strong>${otp}</strong></p><p>Valid for 10 minutes.</p>`,
  });
};

export default { sendEmail, sendOTPEmail };
