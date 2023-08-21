import express from 'express';
import CartManager from '../managers/cartManager.js';
import ProductManager from "../managers/productManager.js";
import getDirname from '../utils.js';
import io from '../app.js';
// const io = require('../app.js');


const router = express.Router();
const cartManager = new CartManager(`${getDirname()}/files/cart.json`);
const productManager = new ProductManager(`${getDirname()}/files/productos.json`);

/* router.get('/', (req, res)=>{
    res.render ('index');
}); */

router.get('/', (req, res) => {

    const limit = req.query.limit;
    const products = productManager.getProducts()
    //console.log(products)
    const productsToSend = [];

    if(limit){
        const limitInt = parseInt(limit)

        if(!isNaN(limitInt) && limitInt > 0){
        productsToSend = products.slice(0, limitInt);
        }else{
        const productsToSendError = `ERROR: Ingrese un parametro valido`;
        res.status(404).render(productsToSendError)
        }
        res.render('home', { productsToSend });
        //res.json(productsToSend.productList);
    } else{
        //return res.json(products);
        res.render('home', { products });
    }

    //res.render('home', { products });
});
  
router.get('/realtimeproducts', (req, res) => {
    
    const limit = req.query.limit;
    const products = productManager.getProducts()
    //console.log(products)
    const productsToSend = [];

    if(limit){
        const limitInt = parseInt(limit)

        if(!isNaN(limitInt) && limitInt > 0){
        productsToSend = products.slice(0, limitInt);
        }else{
        const productsToSendError = `ERROR: Ingrese un parametro valido`;
        res.status(404).render(productsToSendError)
        }
        res.render('realTimeProducts', { productsToSend });
        //res.json(productsToSend.productList);
    } else{
        //return res.json(products);
        res.render('realTimeProducts', { products });
    }

    //res.render('realTimeProducts', { products });
});


//////////////////////////////

/* router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updatedFields = req.body;
    productManager.updateProduct(pid, updatedFields);
    res.json({ message: 'Producto actualizado' });
}); */
  
//////////////////////////////////////////////////////////////////////////

router.post('/products', (req, res) => {
  // Agregar lógica para crear un nuevo producto aquí
    const { title, description, price, thumbnail, code, stock } = req.body;
    const products = productManager.addProduct(title, description, price, thumbnail, code, stock);
    res.json({ message: 'Producto agregado' });
  
  // Actualiza la lista de productos y emite un evento a través de Socket.io
    //products.push(newProduct);
    io.emit('update products', products);
  
    //res.send('Producto creado');
});

router.delete('/products/:id', (req, res) => {
  // Agregar lógica para eliminar un producto aquí
    const id = parseInt(req.params.id);
    const products = productManager.deleteProduct(id);
    res.json({ message: 'Producto eliminado' });
  
  // Actualiza la lista de productos y emite un evento a través de Socket.io
    //products = products.filter(product => product.id !== req.params.id);
    io.emit('update products', products);
  
    //res.send('Producto eliminado');
});


export default router;