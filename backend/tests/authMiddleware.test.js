// backend/tests/authMiddleware.test.js
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import User model to mock its database call

// Safely handle whether the middleware is exported directly or inside an object
const importedMiddleware = require('../middleware/authMiddleware');
const authMiddleware = typeof importedMiddleware === 'function' 
  ? importedMiddleware 
  : (importedMiddleware.protect || importedMiddleware.auth || Object.values(importedMiddleware)[0]);

describe('Member 1 - Authentication Middleware Unit Test', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.JWT_SECRET = 'test_secret_key_123';
  });

  it('should return 401 if no authorization header is present', async () => {
    req.headers = {};

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if the token is invalid or expired', async () => {
    req.headers = { authorization: 'Bearer invalidtokenstring' };

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() and attach user to req if token is valid', async () => {
    const dummyUserId = '64a7c9f8e1234567890abcdef';
    const token = jwt.sign({ id: dummyUserId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    req.headers = { authorization: `Bearer ${token}` };

    // Mock User.findById so it resolves successfully without needing a real database connection
    jest.spyOn(User, 'findById').mockReturnValue({
      select: jest.fn().mockResolvedValue({ _id: dummyUserId, name: 'Test User', email: 'test@example.com' })
    });

    await authMiddleware(req, res, next);

    expect(req.user).toBeDefined();
    expect(next).toHaveBeenCalled();
  });
});