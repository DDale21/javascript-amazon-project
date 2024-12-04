import { getProductById } from "./products.js";
import formatCurrency from "../scripts/utils/money.js";
import { getDeliveryOptionById } from "./deliveryOptions.js";

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  getItem(productId) {
    let existingItem;
    this.cartItems.forEach((item) => {
      if (item.productId === productId) {
        existingItem = item;
      }
    });
    return existingItem;
  }

  getCartItemQuantity() {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }

  addToCart(productId) {
    let existingItem = this.getItem(productId);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((item) => {
      if (item.productId != productId) {
        newCart.push(item);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  setItemQuantity(productId, newQuantity) {
    const item = this.getItem(productId);
    item.quantity = newQuantity;
    this.saveToStorage();
  }

  getItemQuantity(productId) {
    const item = this.getItem(productId);
    return item.quantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const existingDeliveryOption = getDeliveryOptionById(deliveryOptionId);
    if (!existingDeliveryOption) {
      return;
    }
  
    const existingItem = this.getItem(productId);
    if (!existingItem) {
      return;
    }
    existingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

  calculateProductTotalPrice() {
    let total = 0;
    this.cartItems.forEach((item) => {
      const matchingProduct = getProductById(item.productId);
      const itemPrice = matchingProduct.priceCents * item.quantity;
      total += itemPrice;
    });
    return total;
  }

  calculateShippingTotal() {
    let total = 0;
    this.cartItems.forEach((item) => {
      const deliveryOption = getDeliveryOptionById(item.deliveryOptionId);
      total += deliveryOption.priceCents;
    })
    return total;
  }

  calculateOrderTotalPrice() {
    const totalBeforeTax = this.calculateProductTotalPrice() + this.calculateShippingTotal();
    const tax = totalBeforeTax * 0.1;
    const total = totalBeforeTax + tax;
    return formatCurrency(total);
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);