/* eslint-disable no-console */
const express = require('express');
const http = require('http');

const AppConfig = require('./config/app-config');
const Routes = require('./routes');

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
  }

  appConfig() {
    new AppConfig(this.app).includeConfig();
  }

  includeRoutes() {
    new Routes(this.app).routesConfig();
  }

  startTheServer() {
    this.appConfig();
    this.includeRoutes();

    const port = process.env.PORT || 3002; // matches Docker Compose
    this.http.listen(port, '0.0.0.0', () => {
      console.log(`Userservice listening on port ${port}`);
    });
  }
}

// ✅ Only start server when this file is run directly
if (require.main === module) {
  const server = new Server();
  server.startTheServer();
}

module.exports = Server;
