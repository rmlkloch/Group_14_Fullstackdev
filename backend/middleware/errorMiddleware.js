// backend/middleware/errorMiddleware.js
import { NotFoundError } from '../utils/AppError.js';

/**
 * Centralized 404 handler for unknown routes
 */
const notFound = (req, res, next) => {
  const error = new NotFoundError(`Route Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * Centralized Error Handler Middleware
 * Standard error structure (error) without exposing 500 internals
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message || 'Something went wrong';

  // Proper 500 error handling without exposing database/internals in production
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal Server Error';
  }

  // Standard error structure
  res.status(statusCode).json({
    error: {
      message: message,
      // Include per-field validation details if they exist
      ...(err.errors && { details: err.errors }), 
      // Hide stack trace in production
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    }
  });
};

export { notFound, errorHandler };