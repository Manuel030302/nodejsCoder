import productModel from "../models/products.js";

class ProductManager {

  getProducts(limit=10,page=1) {
    //return productModel.find(params).limit(limit).lean();
    const products = productModel.paginate({},{page:page,limit:limit,lean:true});
    return products;
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