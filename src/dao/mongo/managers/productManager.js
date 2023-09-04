import productModel from "../models/products.js";

class ProductManager {

  getProducts(params={},limit=30) {
    return productModel.find(params).limit(limit).lean();
  }

  getProductById(params) {
    return productModel.findOne(params).lean();
  }

  addProduct(product) {
    return productModel.create(product);
  }

  updateProduct(id, product) {
    return productModel.updateOne({ _id: id }, { $set: product });
  }

  deleteProduct(id) {
    return productModel.deleteOne({ _id: id });
  }
}

export default ProductManager;