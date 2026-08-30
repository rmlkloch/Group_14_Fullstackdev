// backend/middleware/validationMiddleware.js
import { z } from 'zod';
import { ValidationError } from '../utils/AppError.js';

/**
 * Zod Schemas for Authentication and Tasks
 */
const authSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required').trim(),
  description: z.string().optional(),
  status: z.enum(['To do', 'Doing', 'Done']).optional(),
});

// PATCH requests only require the fields being updated
const updateTaskSchema = z.object({
  title: z.string().min(1, 'Task title cannot be empty').trim().optional(),
  description: z.string().optional(),
  status: z.enum(['To do', 'Doing', 'Done']).optional(),
});

/**
 * Reusable validation middleware
 * Validates req.body against a provided Zod schema and extracts per-field details
 */
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // Map Zod errors into an array of per-field validation details
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return next(new ValidationError('Invalid input data', formattedErrors));
  }

  // Replace req.body with the sanitized/parsed data from Zod
  req.body = result.data;
  next();
};

export { validate, authSchema, createTaskSchema, updateTaskSchema };