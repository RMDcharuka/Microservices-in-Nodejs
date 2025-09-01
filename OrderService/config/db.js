const mongodb = require('mongodb');
const redis = require('redis');

class MongoDB {
  constructor() {
    this.mongoClient = mongodb.MongoClient;
    this.ObjectID = mongodb.ObjectId;
  }

  onConnect() {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(
        process.env.MONGODB_DB_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err, client) => {
          if (err) {
            reject(err);
          } else {
            // Use DB name from env or default to 'users'
            const dbName = process.env.MONGODB_DB_NAME || 'users';
            resolve([client.db(dbName), this.ObjectID, client]);
          }
        },
      );
    });
  }
}

// Redis client using Docker Compose host
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports.MongoDB = new MongoDB();
module.exports.redisClient = redisClient;
