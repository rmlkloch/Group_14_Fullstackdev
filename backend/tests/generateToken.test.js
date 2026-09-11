// backend/tests/generateToken.test.js
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken'); // Adjust path if your util is named differently

describe('Member 1 - JWT Generation Unit Test', () => {
  it('should generate a valid JWT containing the correct user ID', () => {
    // 1. Mock the environment variables required for signing
    process.env.JWT_SECRET = 'test_secret_key_123';
    process.env.JWT_EXPIRE = '30d';

    const dummyUserId = '64a7c9f8e1234567890abcdef';

    // 2. Generate the token using your utility
    const token = generateToken(dummyUserId);

    // 3. Assert the token exists
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    // 4. Verify the token manually to ensure the ID matches
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(dummyUserId);
  });
});