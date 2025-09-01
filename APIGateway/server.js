/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('express-http-proxy');

const app = express();
app.use(bodyParser.json());

// --------------------
// Microservice proxies
// --------------------
const userServiceProxy = httpProxy('http://userservice:3002', {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => ({
    ...proxyReqOpts,
    headers: {
      ...proxyReqOpts.headers,
      Authorization: srcReq.headers.authorization || '',
    },
  }),
});

const productServiceProxy = httpProxy('http://productservice:3001', {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => ({
    ...proxyReqOpts,
    headers: {
      ...proxyReqOpts.headers,
      Authorization: srcReq.headers.authorization || '',
    },
  }),
});

const orderServiceProxy = httpProxy('http://orderservice:3000', {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => ({
    ...proxyReqOpts,
    headers: {
      ...proxyReqOpts.headers,
      Authorization: srcReq.headers.authorization || '',
    },
  }),
});

// --------------------
// Routes
// --------------------
app.get('/getUserDetails/:userId', (req, res) => userServiceProxy(req, res));
app.post('/register', (req, res) => userServiceProxy(req, res));
app.post('/login', (req, res) => userServiceProxy(req, res));
app.get('/product/:productId', (req, res) => productServiceProxy(req, res));
app.get('/product', (req, res) => productServiceProxy(req, res));
app.post('/order', (req, res) => orderServiceProxy(req, res));
app.get('/order', (req, res) => orderServiceProxy(req, res));

// --------------------
// Start server if run directly
// --------------------
if (require.main === module) {
  const PORT = process.env.PORT || 8085;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Gateway listening on port ${PORT}`);
  });
}

// Export app for Jest / Supertest
module.exports = app;
