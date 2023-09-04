import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
/* import productsRouter from './router/fileSystem/product.router.js';
import cartsRouter from './router/fileSystem/cart.router.js';
import viewsRouter from './router/fileSystem/views.router.js' */
import productsRouter from './router/mongo/product.router.js'
import cartsRouter from './router/mongo/cart.router.js'
import viewsRouter from './router/mongo/views.router.js'
import getDirname from './utils.js';


const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Server online, listening port: ${server.address().port}`);
})
server.on("error", (error) => console.log(`ERROR en el servidor: ${error}`));
const connection = mongoose.connect('mongodb+srv://koko:Leftover11@cluster0.j1gnl7h.mongodb.net/ecommerce?retryWrites=true&w=majority')

app.use(express.static(`${getDirname()}/public`))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${getDirname()}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/view', viewsRouter);

const io = new Server(server);

//////////////////////////////////////////////////////////////////////////////
//const messages = [];

io.on ('connection', socket =>{
    console.log('Nuevo usuario conectado');

    /* socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages)
    }) */
})

//module.exports = io;

export default io;

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