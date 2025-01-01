import { validDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    getProduct(productId) {
      return this.cartItems.find(cartItem => cartItem.productId === productId);
    },
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
    },
    removeFromCart (productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    },
    calculateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },
    updateQuantity(productId, newQuantity) {
      this.cartItems.forEach(item => {
        if (item.productId === productId) {
          item.quantity = newQuantity;
        }
      });
      this.saveToStorage();
    },  
    updateDeliveryOption(productId, deliveryOptionId) {
      const matchingItem = this.getProduct(productId);
      if (!matchingItem || !validDeliveryOption(deliveryOptionId)) {
        return;
      }
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);