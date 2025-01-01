import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  getProduct(productId) {
    return this.cartItems.find(cartItem => cartItem.productId === productId);
  }

  addToCart(productId) {
    const matchingItem = this.getProduct(productId);

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = quantitySelector ? Number(quantitySelector.value) : 1;  
    
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart (productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach(item => {
      if (item.productId === productId) {
        item.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.getProduct(productId);
    if (!matchingItem || !validDeliveryOption(deliveryOptionId)) {
      return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);