// backend/middleware/errorMiddleware.js

/**
 * Middleware to handle requests to routes that don't exist (404)
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Passes the error to the errorHandler below
};

/**
 * Centralized Error Handler Middleware
 * Formats all backend errors into a standard JSON response
 */
const errorHandler = (err, req, res, next) => {
  // If status code is 200 but an error was thrown, default to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Only reveal the error stack trace if we are in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };