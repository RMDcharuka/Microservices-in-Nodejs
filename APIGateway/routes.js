/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('express-http-proxy');

const router = express.Router();
router.use(bodyParser.json());

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
router.get(
  '/getUserDetails/:userId',
  (req, res) => userServiceProxy(req, res),
);

router.post(
  '/register',
  (req, res) => userServiceProxy(req, res),
);

router.post(
  '/login',
  (req, res) => userServiceProxy(req, res),
);

router.get(
  '/product/:productId',
  (req, res) => productServiceProxy(req, res),
);

router.get(
  '/product',
  (req, res) => productServiceProxy(req, res),
);

router.post(
  '/order',
  (req, res) => orderServiceProxy(req, res),
);

router.get(
  '/order',
  (req, res) => orderServiceProxy(req, res),
);

module.exports = router;
