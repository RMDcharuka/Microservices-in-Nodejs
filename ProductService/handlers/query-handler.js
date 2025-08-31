/*
 * Building Micro Services in Nodejs
 * @author Shashank Tiwari
 */

const { onConnect } = require('../config/db'); // require at top level

class QueryHandler {
  constructor() {
    this.projectedKeys = {
      name: true,
      price: true,
      description: true,
      image: true,
      sku: true,
      _id: false,
      id: '$_id',
    };
  }

  /*
   * Name of the Method : getProductDetail
   * Description : Fetches the product details using product id
   * Parameter :
   *   1) productId <string>
   * Return : Promise<ProductDetail>
   */
  async getProductDetail(productId) {
    const [DB, ObjectID, DBClient] = await onConnect();
    const result = await DB.collection('product')
      .aggregate([
        { $match: { _id: ObjectID(productId) } },
        { $project: this.projectedKeys },
      ])
      .toArray();

    DBClient.close();
    return result.length > 0 ? result[0] : null;
  }

  /*
   * Name of the Method : getProducts
   * Description : Fetches the list of products
   * Parameter : None
   * Return : Promise<ProductDetail[]>
   */
  async getProducts() {
    const [DB, , DBClient] = await onConnect();
    const result = await DB.collection('product')
      .aggregate([{ $project: this.projectedKeys }])
      .toArray();

    DBClient.close();
    return result;
  }
}

module.exports = new QueryHandler();
