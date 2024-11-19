import { getProductById } from "./products.js";
import formatCurrency from "../scripts/utils/money.js";
import { getDeliveryOptionById } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

export const saveToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export const getItem = (productId) => {
  let existingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      existingItem = item;
    }
  });
  return existingItem;
}

export const getCartItemQuantity = () => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
}

export const addToCart = (productId) => {
  let existingItem = getItem(productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
};

export const removeFromCart = (productId) => {
  const newCart = [];

  cart.forEach((item) => {
    if (item.productId != productId) {
      newCart.push(item);
    }
  });

  cart = newCart;

  saveToStorage();
}

export const setItemQuantity = (productId, newQuantity) => {
  const item = getItem(productId);
  item.quantity = newQuantity;
  saveToStorage();
}

export const getItemQuantity = (productId) => {
  const item = getItem(productId);
  return item.quantity;
}

export const updateDeliveryOption = (productId, deliveryOptionId) => {
  let existingItem = getItem(productId);
  existingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export const calculateProductTotalPrice = () => {
  let total = 0;
  cart.forEach((cartItem) => {
    const matchingProduct = getProductById(cartItem.productId);
    const itemPrice = matchingProduct.priceCents * cartItem.quantity;
    total += itemPrice;
  });
  return total;
}

export const calculateShippingTotal = () => {
  let total = 0;
  cart.forEach((cartItem) => {
    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
    total += deliveryOption.priceCents;
  })
  return total;
}

export const calculateOrderTotalPrice = () => {
  const totalBeforeTax = calculateProductTotalPrice() + calculateShippingTotal();
  const tax = totalBeforeTax * 0.1;
  const total = totalBeforeTax + tax;
  return formatCurrency(total);
}