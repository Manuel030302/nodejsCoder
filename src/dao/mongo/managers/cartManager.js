import cartModel from "../models/carts.js";

class CartManager {
  createEmptyCart() {
    return cartModel.create({ items: [] });
  }

  getCarts(params={}) {
    return cartModel.find(params).lean();
  }

  getCartById(params) {
    return cartModel.findOne(params).lean();
  }

  addToCart(productId='', quantity='', cartId='') {
    if (!productId || !quantity || !cartId) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    let cart = cartModel.findOne({ _id: cartId });
    if (!cart) {
      cart = cartModel.create({ items: [] });
    }

    const existingItem = cart.items.find(item => item._id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const item = { productId, quantity };
      cart.items.push(item);
    }

    cart.save();
    console.log('Producto agregado al carrito:', { productId, quantity, cartId });
  }

  updateCartItem(productId, quantity, cartId) {
    const cart = cartModel.findOne({ _id: cartId });
    if (!cart) {
      console.log('No se encontró el carrito');
      return;
    }

    const item = cart.items.find(item => item._id === productId);
    if (item) {
      console.log('No existen coincidencias');
      return;
    }

    item.quantity = quantity;
    cart.save()
    console.log('Producto actualizado en el carrito:', item);
  }

  deleteCartItem(productId, quantity, cartId) {
    const cart = cartModel.findOne({ _id: cartId });
    if (!cart) {
      console.log('No se encontró el carrito');
      return;
    }

    const item = cart.items.find(item => item._id === productId);
    if (item) {
      console.log('No existen coincidencias');
      return;
    }

    if (item.quantity > quantity) {
      item.quantity -= quantity;
      console.log(`Se eliminaron ${quantity} unidades del producto del carrito`);
    } else {
      const deletedItem = cart.items.splice(itemIndex, 1)[0];
      console.log('Producto eliminado del carrito:', deletedItem);
    }
    
    cart.save();
  }
}

export default CartManager;