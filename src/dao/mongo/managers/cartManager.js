import cartModel from "../models/carts.js";

class CartManager {
  createEmptyCart() {
    return cartModel.create({ items: [] });
  }

  getCarts(params={}) {
    return cartModel.find(params).lean().populate('items.item');
  }

  getCartById(cartId) {
    return cartModel.findOne({ _id: cartId }).lean().populate('items.item');
  }

  addToCart(productId='', quantity='', cartId='') {
    if (!productId || !cartId) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    let cart = cartModel.findOne({ _id: cartId });
    
    if (!cart) {
      cart = cartModel.create({ items: [] });
    }

    const existingItem = cart.items.find(item => item._id === productId);

    if(existingItem) {
      existingItem.quantity += quantity;
    } else {
      const item = { productId, quantity };
      cart.items.push(item);
    }

    cart.save();
    console.log('Producto agregado al carrito:', { productId, quantity, cartId });
  }

  updateCartItem(cartId, products = []) {
    return cartModel.updateOne({ _id: cartId }, { $set: {items: products} })
  }

  updateItemUnits(cartId = '', productId = '', productUnits = 1) {
    return cartModel.updateOne({ _id: cartId, 'items.item': productId }, { $set: { 'items.$.units': productUnits } })
  }

  deleteCart(cartId) {
    return cartModel.updateOne({ _id: cartId },{ $set: { items: [] } })
  }

  deleteCartItem(cartId, productId) {
    return cartModel.updateOne({ _id: cartId },{ $pull: { items: { item: productId } } })
  }
}

export default CartManager;