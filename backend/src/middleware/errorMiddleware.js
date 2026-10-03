export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  console.error("❌ Global Error Handler:", {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    path: req.originalUrl,
  });

  res.status(statusCode).json({
    success: false,
    message: err.message || "An unexpected internal server error occurred.",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default { notFoundHandler, errorHandler };
