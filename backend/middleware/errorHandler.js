const handleDatabaseErrors = (err, req, res, next) => {
  console.error(err);

  // Mongoose Duplicate Key Error (e.g., duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      error: 'Duplicate Record',
      message: `A record with that ${field} already exists.`
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      error: 'Mongoose Validation Error',
      details: errors
    });
  }

  // CastError (Invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID',
      message: `Resource not found or invalid format for field: ${err.path}`
    });
  }

  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
};

module.exports = handleDatabaseErrors;