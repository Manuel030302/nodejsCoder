Aquí tienes el documento en formato Markdown para un archivo `README.md`:

# PRUEBA DE SERVIDOR EN EXPRESS

Para poner en línea el servidor con nodemon, se introduce el comando `npm start`, lo cual inicia `app.js` mediante nodemon. Esto no desde el directorio raíz, sino que posicionado en `src`.

El servidor ocupa el puerto `8080` del `localhost`.

Las 2 rutas raíces son `/api/products` y `/api/carts`, por lo que la URI sería `http://localhost:8080/api/products` o `http://localhost:8080/api/carts`.

---

## Para la ruta `/api/products` existen los siguientes métodos:

- `GET /api/products`: Muestra todos los productos o, en caso de incluir un límite como `/api/products?limit=5`, solo se mostrarán los primeros elementos hasta alcanzar el límite.
- `GET /api/products/:pid`: Muestra un único elemento seleccionado mediante su ID, el cual únicamente puede ser un número entero.
- `POST /api/products`: Crea un producto mediante el body. Ingresar el nuevo producto llenando todos los campos en formato JSON.
- `PUT /api/products/:pid`: Modifica un producto seleccionado mediante su ID. De igual forma, ingresar los campos con su nueva información respectiva que se desean modificar.
- `DELETE /api/products/:pid`: Elimina un producto seleccionado mediante su ID.

## Para la ruta `/api/carts` existen los siguientes métodos:

- `GET /api/carts`: Muestra todos los elementos.
- `GET /api/carts/:cid`: Muestra un único elemento seleccionado mediante su ID, el cual únicamente puede ser un número entero.
- `POST /api/carts`: Crea un carrito vacío.
- `PUT /api/carts/:cid/product/:pid/:units`: Agrega determinada cantidad (`units`) de un producto (`pid`) a un carrito (`cid`). Estos 3 parámetros deben ser específicamente números enteros.
- `DELETE /api/carts/:cid/product/:pid/:units`: Quita determinada cantidad (`units`) de un producto (`pid`) a un carrito (`cid`). Estos 3 parámetros deben ser específicamente números enteros.

> NOTA: Todo esto mediante "Postman".

Se cambió el método UPDATE a PUT a conveniencia para mejor manejabilidad en Postman.

---
