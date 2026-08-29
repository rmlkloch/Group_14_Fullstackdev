// backend/middleware/validationMiddleware.js

/**
 * Middleware to validate task creation and updates
 */
const validateTask = (req, res, next) => {
  const { title } = req.body;

  // Check if title is missing or empty
  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400); // 400 Bad Request
    throw new Error('Validation Error: Task title is required');
  }

  // If everything is valid, proceed to the controller
  next();
};

/**
 * Middleware to validate user registration
 */
const validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Validation Error: Email and password are required');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Validation Error: Password must be at least 6 characters long');
  }

  next();
};

export { validateTask, validateRegister };