// __tests__/integration/health.test.js
const request = require('supertest');
const express = require('express');

// Setup a small test server
const app = express();
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

describe('Integration Tests: Health endpoint', () => {
  it('should return 200 and status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});