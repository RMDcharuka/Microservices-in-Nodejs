/*
* Building Micro Services in Nodejs
* @author Shashank Tiwari
*/

const apiHandler = require('./api-handler');
const { onConnect } = require('../config/db');

class QueryHandler {
  constructor() {
    this.projectedKeys = {
      date: true,
      delivery_date: true,
      product_details: true,
      user_details: true,
      _id: false,
      orderId: '$_id',
    };
  }

  /*
   * Name of the Method : createOrder
   * Description : Creates a new order in MongoDB by consuming User Service API and Product Service API
   * Parameter : 1) userId<string>, productId<string>
   * Return : Promise<OrderID>
   */
  createOrder(userId, productId) {
    return this.createOrderAsync(userId, productId);
  }

  async createOrderAsync(userId, productId) {
    const [userRes, productRes] = await Promise.all([
      apiHandler.getUserInformation(userId),
      apiHandler.getProductInformation(productId),
    ]);

    const userDetail = userRes.data;
    const productDetail = productRes.data;

    if (userDetail.error) throw new Error('User Service is Down or not Working');
    if (productDetail.error) throw new Error('Product Service is Down or not Working');

    const orderObject = {
      date: new Date().toISOString(),
      delivery_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      product_details: productDetail.details,
      user_details: userDetail.details,
    };

    const [DB, , DBClient] = await onConnect();

    return new Promise((resolve, reject) => {
      DB.collection('order').insertOne(orderObject, (err, result) => {
        DBClient.close();
        if (err) reject(err);
        else resolve(result.insertedId);
      });
    });
  }

  /*
   * Name of the Method : getOrders
   * Description : Fetches the list of Orders
   * Parameter : None
   * Return : Promise<OrderDetails>
   */
  async getOrders() {
    const [DB, , DBClient] = await onConnect();

    return new Promise((resolve, reject) => {
      DB.collection('order')
        .aggregate([{ $project: this.projectedKeys }])
        .toArray((err, result) => {
          DBClient.close();
          if (err) reject(err);
          else resolve(result);
        });
    });
  }
}

module.exports = new QueryHandler();
