import express from 'express';
import CartManager from '../managers/cartManager.js';
import ProductManager from "../managers/productManager.js";
import { getDirname } from '../utils.js';

const router = express.Router();
const cartManager = new CartManager(`${getDirname()}/files/cart.json`);
const productManager = new ProductManager(`${getDirname()}/files/products.json`);

router.get('/', (req, res) => {
  const carts = cartManager.getCarts();
  res.json(carts);
});

router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = cartManager.getCartById(cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

router.post('/', (req, res) => {
  const cartId = cartManager.createCart();
  res.json({ message: 'Carrito creado', cartId });
});

router.put('/:cid/product/:pid/:units', (req, res) => {
  const { cid, pid, units } = req.params;
  const product = productManager.getProductById(pid);
  if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  if (product.stock < units) {
    res.status(400).json({ message: 'No hay suficiente stock' });
    return;
  }

  productManager.updateProduct(pid, { stock: product.stock - units });
  cartManager.addToCart(pid, parseInt(units), cid);
  res.json({ message: 'Producto agregado al carrito' });
});

router.delete('/:cid/product/:pid/:units', (req, res) => {
  const { cid, pid, units } = req.params;
  const product = productManager.getProductById(pid);
  if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  const deletedUnits = cartManager.deleteFromCart(pid, parseInt(units), cid);
  productManager.updateProduct(pid, { stock: product.stock + deletedUnits });
  res.json({ message: `Se eliminaron ${deletedUnits} unidades del producto del carrito` });
});

export default router;
