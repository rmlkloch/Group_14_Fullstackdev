const rateLimit = require('express-rate-limit');

// Rate limiter for login requests: max 10 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
  },
});

module.exports = {
  loginLimiter,
};
