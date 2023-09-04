import express from 'express';
import CartManager from '../../dao/mongo/managers/cartManager.js';
import ProductManager from '../../dao/mongo/managers/productManager.js';

const router = express.Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.get('/', async(req, res) => {
  const carts = await cartManager.getCarts();
  res.send({status:`succes`, carts:carts});
});

router.get('/:cid', async(req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById({ _id: cid });

  if (cart) {
    res.send({status:"success",payload:cart});
  } else {
    res.status(404).send({ error: `Carrito no encontrado` });
  }
});

router.post('/', async(req, res) => {
  const result = await cartManager.createEmptyCart();
  res.send({status:"success",payload:result});
});

router.put('/:cid/product/:pid/:units', async(req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const units = parseInt(req.params.units);

  const product = await productManager.getProductById(pid);

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
  res.send({status:"success",message:"Producto agregado al carrito"});
});

router.delete('/:cid/product/:pid/:units', async(req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const units = parseInt(req.params.units);
  const product = await productManager.getProductById(pid);

  if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  const deletedUnits = await cartManager.deleteCartItem(pid, units, cid);
  productManager.updateProduct(pid, { stock: product.stock + deletedUnits });
  res.send({status:"success",message:`Se eliminaron ${deletedUnits} unidades del producto del carrito`})
});

export default router;