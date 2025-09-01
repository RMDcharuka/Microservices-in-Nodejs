const Mongodb = require('../config/db');

class QueryHandler {
  constructor() {
    this.Mongodb = Mongodb;
  }

  async login(data) {
    const [DB, , DBClient] = await this.Mongodb.onConnect();
    const result = await DB.collection('user').findOneAndUpdate(
      data,
      { $set: { online: 'Y' } },
      { returnDocument: 'after' },
    );
    DBClient.close();
    return result.value ? result.value.id : null;
  }

  async getUserDetails(userId) {
    const [DB, ObjectID, DBClient] = await this.Mongodb.onConnect();
    const result = await DB.collection('user')
      .aggregate([
        { $match: { _id: ObjectID(userId) } },
        {
          $project: {
            name: true,
            email: true,
            lastname: true,
            online: true,
            id: '$_id', // renamed _id to id
            _id: false,
          },
        },
      ])
      .toArray();
    DBClient.close();
    return result.length > 0 ? result[0] : null;
  }

  async registerUser(data) {
    const [DB, , DBClient] = await this.Mongodb.onConnect();
    const result = await DB.collection('user').insertOne(data);
    DBClient.close();
    return result;
  }
}

module.exports = new QueryHandler();
