const request = require('supertest');
const nock = require('nock');
const server = require('../../server'); // adjust path

jest.setTimeout(20000);

describe('API Gateway Integration Tests', () => {
  beforeAll(() => {
    // Mock User Service
    nock('http://userservice:3002')
      .persist() // keep mocks alive for multiple tests
      .get('/getUserDetails/1')
      .reply(200, { id: 1, username: 'testuser' })
      .post('/register')
      .reply(201, { id: 1, username: 'testuser' })
      .post('/login')
      .reply(200, { token: 'abc123' });

    // Mock Product Service
    nock('http://productservice:3001')
      .persist()
      .get('/product')
      .reply(200, [{ id: 1, name: 'product1' }])
      .get('/product/1')
      .reply(200, { id: 1, name: 'product1' });

    // Mock Order Service
    nock('http://orderservice:3000')
      .persist()
      .post('/order')
      .reply(201, { id: 1 })
      .get('/order')
      .reply(200, [{ id: 1 }]);
  });

  afterAll(() => {
    nock.cleanAll();
    nock.enableNetConnect(); // allow real network connections after tests
  });

  test('GET /getUserDetails/:userId should return 200 and user object', async () => {
    const res = await request(server).get('/getUserDetails/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, username: 'testuser' });
  });

  test('POST /register should create a new user', async () => {
    const res = await request(server)
      .post('/register')
      .send({ username: 'testuser', password: '123456' });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('testuser');
  });

  test('POST /login should return a token', async () => {
    const res = await request(server)
      .post('/login')
      .send({ username: 'testuser', password: '123456' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('GET /product should return 200 and an array', async () => {
    const res = await request(server).get('/product');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /product/:productId should return 200 and product object', async () => {
    const res = await request(server).get('/product/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('POST /order should create a new order', async () => {
    const res = await request(server)
      .post('/order')
      .send({ userId: 1, products: [1, 2] });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test('GET /order should return 200 and an array', async () => {
    const res = await request(server).get('/order');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /invalid should return 404', async () => {
    const res = await request(server).get('/invalid');
    expect(res.status).toBe(404);
  });
});
