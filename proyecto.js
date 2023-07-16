import fs from 'fs';
import crypto from 'crypto';

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.productId = 0;
    this.path = path;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    // Validar que no se repita el campo "code"
    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      console.log('Ya existe un producto con ese código');
      return;
    }

    const product = {
      id: ++this.productId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(product);
    console.log('Producto agregado:', product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.log('Not found');
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.log('No existen coincidencias');
      return;
    }

    const product = this.products[productIndex];
    const updatedProduct = { ...product, ...updatedFields };
    this.products[productIndex] = updatedProduct;

    console.log('Producto actualizado:', updatedProduct);
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.log('No existen coincidencias');
      return;
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    console.log('Producto eliminado:', deletedProduct);
  }
}



updateProduct() {
    
}

// Ejemplo

const productManager = new ProductManager();
console.log('Todos los productos:', productManager.getProducts());

productManager.addProduct('Producto 1', 'Descripción del producto 1', 10.99, 'thumbnail1.jpg', 'P1', 5);
productManager.addProduct('Producto 2', 'Descripción del producto 2', 19.99, 'thumbnail2.jpg', 'P2', 3);

const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

productManager.addProduct('Producto 1', 'Descripción del producto 1', 10.99, 'thumbnail1.jpg', 'P1', 5);

const productById = productManager.getProductById(1);
console.log('Producto por ID:', productById);

const nonExistingProduct = productManager.getProductById(3);
