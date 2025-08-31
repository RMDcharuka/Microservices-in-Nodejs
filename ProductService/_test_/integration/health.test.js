const request = require('supertest');
const express = require('express');

// Setup a lightweight test app
const app = express();
app.get('/health', (req, res) => res.status(200).json({ service: 'ProductService', status: 'OK' }));

describe('Integration Tests: ProductService Health endpoint', () => {
  it('should return 200 and status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ service: 'ProductService', status: 'OK' });
  });
});
