module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/auth.test.js',
    '**/tests/generateToken.test.js',
    '**/tests/authMiddleware.test.js',
    '**/tests/userModel.test.js',
    '**/tests/userAuthorization.test.js',
    '**/tests/api.test.js',
    '**/tests/task.test.js',
  ],
  clearMocks: true,
};

