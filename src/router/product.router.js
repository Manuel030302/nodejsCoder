import express from 'express';
import ProductManager from '../managers/productManager.js';
import getDirname from '../utils.js';

const router = express.Router();
const productManager = new ProductManager(`${getDirname()}/files/productos.json`);

router.get('/', (req, res) => {
  const limit = req.query.limit;
  const products = {
    productList: productManager.getProducts()
  }
  console.log(products)
  const productsToSend = {};

  if(limit){
    const limitInt = parseInt(limit)

    if(!isNaN(limitInt) && limitInt > 0){
      productsToSend.productList = products.productList.slice(0, limitInt);
    }else{
      productsToSend.error = `ERROR: Ingrese un parametro valido`;
      res.status(404).json(productsToSend.error)
    }

    res.json(productsToSend.productList);
  } else{
    return res.json(products);
  }
});

router.get('/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = productManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  productManager.addProduct(title, description, price, thumbnail, code, stock);
  res.json({ message: 'Producto agregado' });
});

router.put('/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);
  const updatedFields = req.body;
  productManager.updateProduct(pid, updatedFields);
  res.json({ message: 'Producto actualizado' });
});

router.delete('/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);
  productManager.deleteProduct(pid);
  res.json({ message: 'Producto eliminado' });
});

export default router;

