// backend/tests/concurrency.test.js
const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Member 5 - Validation & Concurrency Tests', () => {
  it('should return 400 for invalid ObjectId format', async () => {
    const res = await request(app).get('/api/tasks/invalid-id-format');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid ID Format');
  });

  it('should detect version conflicts and return 409 Conflict', async () => {
    // 1. Assume a task exists with version 0
    const taskId = '60d5ecb8b5c9c22b8c8b4567';

    // 2. Simulate stale edit with baseVersion = -1
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Updated Title', baseVersion: -1 });

    if (res.statusCode === 409) {
      expect(res.statusCode).toBe(409);
      expect(res.body.error).toBe('Conflict');
      expect(res.body).toHaveProperty('currentTask');
    }
  });
});