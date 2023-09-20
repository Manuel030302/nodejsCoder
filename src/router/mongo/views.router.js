import express from "express";
import ProductManager from "../../dao/mongo/managers/productManager.js";
import CartManager from "../../dao/mongo/managers/cartManager.js";
//import productModel from "../../dao/mongo/models/products.js";
import io from "../../app.js"

const router = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/',async(req,res)=>{

  if(!req.session.user){
    //Si ya murió la sesión, redirige al login
    return res.redirect('/login');
  }
  //res.render('Profile',{user:req.session.user})

  const {page} = req.query;
  const limit = req.query.limit;

  const paginationResult = await productManager.getProducts(limit,page);

  console.log(paginationResult)
  const products = paginationResult.docs;
  const currentPage = paginationResult.page;
  const {hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = paginationResult;

  const prevLink = hasPrevPage ? `/view?page=${currentPage - 1}` : null;
  const nextLink = hasNextPage ? `/view?page=${currentPage + 1}` : null;

  res.render('realTimeProducts', {
    //stautus,
    products,
    totalPages,
    page: currentPage,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
  });
})

router.get('/carts/:cid', async(req, res) => {
  const {cid} = req.params;
  const cartFetched = await cartManager.getCartById(cid);

  res.render('cartView', {cartFetched})
});

router.post('/products', async(req, res) => {
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
  io.emit('update products', result);
  //res.send({status:"success",payload:result._id});
});

router.delete('/products/:pid', async(req, res) => {
  const pid = req.params.pid;
  const result = await productManager.deleteProduct(pid);
  io.emit('update products', result);
  //res.send({status:"success",message:"Product Deleted"})
});

///////////////////////////////////////////////////////////////////////////////

/* router.get('/',async(req,res)=>{
  if(!req.session.user){
      //Si ya murió la sesión, redirige al login
      return res.redirect('/login');
  }
  res.render('Profile',{user:req.session.user})
}) */

router.get('/register',async(req,res)=>{
  res.render('register')
})

router.get('/login',async(req,res)=>{
  res.render('login')
})

export default router;