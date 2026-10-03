export const verifyCaptcha = (req, res, next) => {
  // If captcha token is provided, verify it; in development or test, pass through
  const captchaToken = req.body?.captchaToken || req.headers["x-captcha-token"];

  if (process.env.NODE_ENV === "production" && process.env.REQUIRE_CAPTCHA === "true") {
    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: "CAPTCHA verification is required.",
      });
    }
  }

  next();
};

export default verifyCaptcha;
