import productsRouter from './router/product.router.js';
import cartsRouter from './router/cart.router.js';
import viewsRouter from './router/views.router.js'
import getDirname from './utils.js';
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${getDirname()}/views`);
app.set('view engine', 'handlebars');

//app.use('/', viewsRouter)

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const server = app.listen(PORT, () => {
    console.log(`Server online, listening port: ${server.address().port}`);
})

const io = new Server(server);

server.on("error", (error) => console.log(`ERROR en el servidor: ${error}`));

//const messages = [];

io.on ('connection', socket =>{
    console.log('Nuevo usuario conectado');

    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages)
    })
})

module.exports = io;

/*
socket.on ('authenticated', data =>{
    socket.emit ('messageLogs', messages);
    socket.broadcast.emit('newUserConnected', data);
});
}) */

  


/*
app.get('/', (req, res) => {
    res.send('introduce la ruta: /products para obtener un listado de los productos o, /products:pid para seleccionar un producto por su id');
})
*/