import express from 'express';
import CartManager from '../../dao/mongo/managers/cartManager.js';
import ProductManager from '../../dao/mongo/managers/productManager.js';

const router = express.Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.get('/', async(req, res) => {
  const carts = await cartManager.getCarts();
  console.log(carts)
  res.send({status:`succes`, carts:carts});
});

router.get('/:cid', async(req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);

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

router.put('/:cid', async(req, res) => {
  const {cid} = req.params;
  let products = req.body.products
  //products = JSON.stringify(products)
  console.log(cid)
  console.log(products)
  //products = JSON.parse(products)
  
  console.log(`/////////////////////////////////////////`)

  const updatedCart = await cartManager.updateCartItem(cid, products)
  //console.log(`---------> ${result}`)

  res.send({status:`succes`, updatedCart:updatedCart});
})

router.put('/:cid/products/:pid/', async(req, res) => {
  const {cid, pid} = req.params;
  let productUnits = req.body.productUnits
  //products = JSON.stringify(products)
  console.log(cid)
  console.log(pid)
  //products = JSON.parse(products)
  
  console.log(`/////////////////////////////////////////`)

  const updatedCartUnits = await cartManager.updateItemUnits(cid, pid, productUnits)
  //console.log(`---------> ${result}`)

  res.send({status:`succes`, updatedCartUnits:updatedCartUnits});
})

router.put('/:cid/product/:pid/:units', async(req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const units = parseInt(req.params.units);

  if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
  }

  const product = await productManager.getProductById({_id: pid});

  if (product.stock < units) {
    res.status(400).json({ message: 'No hay suficiente stock' });
    return;
  }

  productManager.updateProduct(pid, { stock: product.stock - units });
  cartManager.addToCart(pid, parseInt(units), cid);
  res.send({status:`success`, message:"Producto agregado al carrito"});
});

router.delete('/:cid', async(req, res) => {
  const cid = req.params.cid;
  //let units = parseInt(req.params.units);
  const deletedProduct = await cartManager.deleteCart(cid);
  res.send({status:"success", deletedProduct:deletedProduct});
  
});

router.delete('/:cid/products/:pid', async(req, res) => {
  const {cid, pid} = req.params;
  //let units = parseInt(req.params.units);
  const deletedProduct = await cartManager.deleteCartItem(cid, pid);
  res.send({status:"success", deletedProduct:deletedProduct});
});



export default router;