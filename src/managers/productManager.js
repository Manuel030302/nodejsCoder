import fs from 'fs';

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.loadProducts();
  }

  loadProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.log('Error al cargar los productos:', error);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log('Productos guardados en el archivo:', this.path);
    } catch (error) {
      console.log('Error al guardar los productos:', error);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    this.loadProducts();

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
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(product);
    this.saveProducts();
    console.log('Producto agregado:', product);

    return this.products
  }

  getProducts() {
    this.loadProducts();
    return this.products;
  }

  getProductById(id) {
    this.loadProducts();
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.log('No se encontró el producto');
    }
  }

  updateProduct(id, updatedFields) {
    this.loadProducts();
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.log('No existen coincidencias');
      return;
    }

    const product = this.products[productIndex];
    const updatedProduct = { ...product, ...updatedFields };
    this.products[productIndex] = updatedProduct;
    this.saveProducts();
    console.log('Producto actualizado:', updatedProduct);
  }

  deleteProduct(id) {
    this.loadProducts();
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      console.log('No existen coincidencias');
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    this.saveProducts();
    console.log('Producto eliminado:', deletedProduct);
    
    return this.products;
  }
}
