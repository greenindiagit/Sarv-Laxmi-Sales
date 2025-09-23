// server/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Log error details - could be replaced with a logger like Winston or Sentry
  console.error('Error:', err.message);

  // Set the status code, defaulting to 500
  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    // Optional: include stack trace in development only
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export default errorHandler;
