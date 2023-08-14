import express from 'express';
import ProductManager from '../managers/productManager.js';
import { getDirname } from '../utils.js';

const router = express.Router();
const productManager = new ProductManager(`${getDirname()}/files/productos.json`);

router.get('/api/products', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

router.get('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.post('/api/products', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  productManager.addProduct(title, description, price, thumbnail, code, stock);
  res.json({ message: 'Producto agregado' });
});

router.update('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedFields = req.body;
  productManager.updateProduct(pid, updatedFields);
  res.json({ message: 'Producto actualizado' });
});

router.delete('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  productManager.deleteProduct(pid);
  res.json({ message: 'Producto eliminado' });
});

export default router;
