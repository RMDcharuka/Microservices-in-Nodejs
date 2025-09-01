const expressJwt = require('express-jwt');
const publicRoutes = require('./jwt-route');

class JWT {
  constructor(app) {
    this.app = app;
  }

  setJWTConfig() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.warn(
        'Warning: JWT_SECRET is not set! Using default secret for development.'
      );
    }

    this.app.use(
      expressJwt({
        secret: secret || 'default_dev_secret', // default for dev/testing
        algorithms: ['HS256'], // specify algorithm explicitly
      }).unless({
        path: publicRoutes,
      })
    );
  }
}

module.exports = JWT;
