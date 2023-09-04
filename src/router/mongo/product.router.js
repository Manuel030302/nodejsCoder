import express from 'express';
import ProductManager from '../dao/mongo/managers/productManager.js';
import uploader from '../../services/uploadService.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async(req, res) => {
  const limit = req.query.limit;

  if(limit){
    const limitInt = parseInt(limit);

    if(!isNaN(limitInt) && limitInt > 0){
      const products = await productManager.getProducts({},limitInt);
      res.send({status:"success",payload:products});
    }else{
      res.status(400).send({ error: `ERROR: Ingrese un parametro valido` });
    }

  } else{
    const products = await productManager.getProducts({},limitInt);
    res.send({status:"success",payload:products});
  }
});

router.get('/:pid', async(req, res) => {
  const pid = req.params.pid;
  const product = await productManager.getProductById({_id: pid});

  if (product) {
    res.send({status:"success",payload:product});
  } else {
    res.status(404).send({ error: `Producto no encontrado` });
  }
});

router.post('/',uploader.array('images'),async(req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  } = req.body;

  if(!title||!description||!price||!code||!stock) return res.status(400).send({status:"error", error:"Incomplete values"});

  const newProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  }

  const images = req.files.map(file=>`${req.protocol}://${req.hostname}:${process.env.PORT||8080}/img/${file.filename}`);
  newProduct.images = images

  const result = await productManager.addProduct(newProduct);
  res.send({status:"success",payload:result._id});
});

router.put('/:pid', async(req, res) => {
  const pid = req.params.pid;

  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  } = req.body;

  const updatedProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  }

  const product = await productManager.getProductById({_id:pid});
  if(!product) return res.status(400).send({status:"error",error:"Product doesn't exist"});
  await productManager.updateProduct(pid,updatedProduct);
  res.send({status:"success",message:"Product updated"});
});

router.delete('/:pid', async(req, res) => {
  const pid = req.params.pid;
  const result = await productManager.deleteProduct(pid);
  res.send({status:"success",message:"Product Deleted"})
});

export default router;