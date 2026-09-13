const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

describe('Member 4 - User Model & Role Unit Tests', () => {
  describe('Schema Validations', () => {
    it('should fail validation if required fields (name, email, password) are missing', async () => {
      const user = new User({});
      let err;
      try {
        await user.validate();
      } catch (e) {
        err = e;
      }
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.email).toBeDefined();
      expect(err.errors.password).toBeDefined();
    });

    it('should reject invalid email formats', async () => {
      const user = new User({
        name: 'Member 4 Test',
        email: 'invalid-email-string',
        password: 'password123',
      });
      let err;
      try {
        await user.validate();
      } catch (e) {
        err = e;
      }
      expect(err).toBeDefined();
      expect(err.errors.email).toBeDefined();
    });

    it('should enforce password minimum length of 6 characters', async () => {
      const user = new User({
        name: 'Member 4 Test',
        email: 'member4@example.com',
        password: '123',
      });
      let err;
      try {
        await user.validate();
      } catch (e) {
        err = e;
      }
      expect(err).toBeDefined();
      expect(err.errors.password).toBeDefined();
    });
  });

  describe('Role & Permission Rules', () => {
    it('should default user role to "member"', () => {
      const user = new User({
        name: 'Member 4 Test',
        email: 'member4@example.com',
        password: 'password123',
      });
      expect(user.role).toBe('member');
    });

    it('should accept "admin" as a valid role', async () => {
      const user = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
      });
      const err = await user.validateSync();
      expect(err).toBeUndefined();
      expect(user.role).toBe('admin');
    });

    it('should reject invalid roles not included in role enums', async () => {
      const user = new User({
        name: 'Invalid Role User',
        email: 'invalidrole@example.com',
        password: 'password123',
        role: 'super_god_mode',
      });
      let err;
      try {
        await user.validate();
      } catch (e) {
        err = e;
      }
      expect(err).toBeDefined();
      expect(err.errors.role).toBeDefined();
    });
  });

  describe('Password Hashing & Password Match', () => {
    it('should correctly compare password using matchPassword method', async () => {
      const plainPassword = 'securePassword123';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(plainPassword, salt);

      const user = new User({
        name: 'Password Compare Test',
        email: 'compare@example.com',
        password: hashedPassword,
      });

      const isMatch = await user.matchPassword('securePassword123');
      const isWrongMatch = await user.matchPassword('wrongPassword');

      expect(isMatch).toBe(true);
      expect(isWrongMatch).toBe(false);
    });
  });

  describe('toJSON Transformation Security', () => {
    it('should transform _id to id and exclude password and __v from output JSON', () => {
      const dummyId = new mongoose.Types.ObjectId();
      const user = new User({
        _id: dummyId,
        name: 'JSON Security Test',
        email: 'json@example.com',
        password: 'secretPassword123',
        role: 'member',
      });

      const jsonOutput = user.toJSON();

      expect(jsonOutput.id).toBeDefined();
      expect(jsonOutput._id).toBeUndefined();
      expect(jsonOutput.password).toBeUndefined();
      expect(jsonOutput.__v).toBeUndefined();
      expect(jsonOutput.name).toBe('JSON Security Test');
      expect(jsonOutput.role).toBe('member');
    });
  });
});
