const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// Define a role-based authorization middleware helper for testing role permissions
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user missing' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

describe('Member 4 - User Authorization & Role Permission Integration Tests', () => {
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
    process.env.JWT_SECRET = 'test_jwt_secret_member4';
  });

  describe('Protect Authentication Middleware', () => {
    it('should return 401 Unauthorized when no Authorization header is provided', async () => {
      req.headers = {};

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 Unauthorized when Bearer token is invalid or malformed', async () => {
      req.headers = { authorization: 'Bearer invalid.token.payload' };

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 Unauthorized when user is not found in database', async () => {
      const dummyId = '60d5ecb8b5c9c22b8c8b4567';
      const token = jwt.sign({ id: dummyId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      req.headers = { authorization: `Bearer ${token}` };

      jest.spyOn(User, 'findById').mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await protect(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, user not found' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should attach user object to req and call next() when valid token is provided', async () => {
      const dummyId = '60d5ecb8b5c9c22b8c8b4567';
      const token = jwt.sign({ id: dummyId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      req.headers = { authorization: `Bearer ${token}` };

      const mockUser = {
        _id: dummyId,
        name: 'Member 4 User',
        email: 'member4@example.com',
        role: 'member',
      };

      jest.spyOn(User, 'findById').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      await protect(req, res, next);

      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('Role-Based Authorization & Permissions (Permitted vs Forbidden)', () => {
    it('should permit access when user role is included in allowed roles', () => {
      req.user = { id: '123', name: 'Admin User', role: 'admin' };
      const middleware = authorizeRoles('admin');

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 403 Forbidden when regular "member" attempts admin-only action', () => {
      req.user = { id: '456', name: 'Regular Member', role: 'member' };
      const middleware = authorizeRoles('admin');

      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: Insufficient permissions' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should permit both "admin" and "member" when route allows both roles', () => {
      req.user = { id: '789', name: 'Regular Member', role: 'member' };
      const middleware = authorizeRoles('admin', 'member');

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
