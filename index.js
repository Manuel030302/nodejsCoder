import ProductManager from "./proyecto.js";

// Ejemplo

const productManager = new ProductManager("./files/productos.json");
console.log('Todos los productos:', productManager.getProducts());

productManager.addProduct('Producto 1', 'Descripción del producto 1', 10.99, 'thumbnail1.jpg', 'P1', 5);
productManager.addProduct('Producto 2', 'Descripción del producto 2', 19.99, 'thumbnail2.jpg', 'P2', 3);

let allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

productManager.addProduct('Producto 1', 'Descripción del producto 1', 10.99, 'thumbnail1.jpg', 'P1', 5);

const productById = productManager.getProductById(1);
console.log('Producto por ID:', productById);

const nonExistingProduct = productManager.getProductById(3);

productManager.updateProduct(1, {price: 5.99, stock: 40});

allProducts = productManager.getProducts();
console.log('Todos los productos (actualizados):', allProducts);

productManager.deleteProduct(2);

allProducts = productManager.getProducts();
console.log('Todos los productos (borrados):', allProducts);