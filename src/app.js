import productsRouter from './router/product.router.js';
import cartsRouter from './router/cart.router.js';
import express from 'express';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(PORT, () => {
    console.log(`Server online, listening port: ${server.address().port}`);
})

server.on("error", (error) => console.log(`ERROR en el servidor: ${error}`));
/*
app.get('/', (req, res) => {
    res.send('introduce la ruta: /products para obtener un listado de los productos o, /products:pid para seleccionar un producto por su id');
})
*/