import { getCartItemQuantity } from "../../data/cart.js";

export const renderCheckoutHeader = () => {
  const checkoutHeaderHTML = `Checkout (<a class="return-to-home-link" 
    href="amazon.html">${getCartItemQuantity()} items</a>)`;
  document.querySelector('.js-checkout-header').innerHTML  = checkoutHeaderHTML;
}