const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = err.keyValue && Object.keys(err.keyValue)[0];
    message = field ? `${field} already exists` : "Duplicate key error";
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    message = "File size exceeds the maximum limit of 10MB";
    statusCode = 400;
  }

  // JWT invalid token
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token";
    statusCode = 401;
  }

  // JWT token expire
  if (err.name === "TokenExpiredError") {
    message = "JWT token expired";
    statusCode = 401;
  }

  console.error("Error:", {
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
