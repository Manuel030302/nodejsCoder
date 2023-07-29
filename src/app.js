import ProductManager from "./productManager.js";

import express from 'express';
const app = express();
const PORT = 8080;

const productManager = new ProductManager("./files/productos.json");

const server = app.listen(PORT, () => {
    console.log(`Server online, listening port: ${server.address().port}`);
})

server.on("error", (error) => console.log(`ERROR en el servidor: ${error}`));

app.get('/', (req, res) => {
    res.send('introduce la ruta: /products para obtener un listado de los productos o, /products:pid para seleccionar un producto por su id');
})


app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const products = {
        productList: productManager.getProducts()
    }
    const productsToSend = {};

    if(limit){
        const limitInt = parseInt(limit)

        if(!isNaN(limitInt) && limitInt > 0){
            productsToSend.productList = products.productList.slice(0, limitInt);
        }else{
            productsToSend.error = `ERROR: Ingrese un parametro valido`;
            res.status(404).json(productsToSend.error)
        }
    }

    res.json(productsToSend.productList);
})

app.get('/products/:pid', (req, res) => {
    const productID = parseInt(req.params.pid);
    const products = productManager.getProducts();

    if(!isNaN(productID) && productID > 0 && productID < products.length){
        const product = productManager.getProductById(productID);
        res.json(product)
    }
    if(productID > products.length) {
        console.log('error')
        return res.status(404).json({error: `ERROR: El producto con numero de id = ${productID} no existe. Ingrese un id valido entre 0 y ${products.length}`})
    }
})