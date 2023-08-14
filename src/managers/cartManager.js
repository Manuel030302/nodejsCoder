import fs from 'fs';

export default class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.loadCarts();
  }

  loadCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.carts = JSON.parse(data);
      } else {
        //this.carts = [];
        fs.writeFileSync(this.path, JSON.stringify(this.carts));
      }
    } catch (error) {
      console.log('Error al cargar los carritos:', error);
    }
  }

  saveCarts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
      console.log('Carritos guardados en el archivo:', this.path);
    } catch (error) {
      console.log('Error al guardar los carritos:', error);
    }
  }

  addToCart(productId, quantity, cartId) {
    this.loadCarts();

    // Validar que todos los campos sean obligatorios
    if (!productId || !quantity || !cartId) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    let cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      cart = { id: cartId, items: [] };
      this.carts.push(cart);
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const item = { productId, quantity };
      cart.items.push(item);
    }

    this.saveCarts();
    console.log('Producto agregado al carrito:', { productId, quantity, cartId });
  }

  getCartById(cartId) {
    this.loadCarts();
    const cart = this.carts.find(cart => cart.id === cartId);
    if (cart) {
      return cart.items;
    } else {
      console.log('No se encontró el carrito');
    }
  }

  updateCartItem(productId, quantity, cartId) {
    this.loadCarts();
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      console.log('No se encontró el carrito');
      return;
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      console.log('No existen coincidencias');
      return;
    }

    const item = cart.items[itemIndex];
    item.quantity = quantity;
    this.saveCarts();
    console.log('Producto actualizado en el carrito:', item);
  }

  deleteCartItem(productId, quantity, cartId) {
    this.loadCarts();
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      console.log('No se encontró el carrito');
      return;
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      console.log('No existen coincidencias');
      return;
    }

    const item = cart.items[itemIndex];
    if (item.quantity > quantity) {
      item.quantity -= quantity;
      console.log(`Se eliminaron ${quantity} unidades del producto del carrito`);
    } else {
      const deletedItem = cart.items.splice(itemIndex, 1)[0];
      console.log('Producto eliminado del carrito:', deletedItem);
    }
    
    this.saveCarts();
  }
}
