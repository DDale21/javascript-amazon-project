import { cart } from "../../data/cart-class.js";

export const renderCheckoutHeader = () => {
  const checkoutHeaderHTML = `Checkout (<a class="return-to-home-link" 
    href="amazon.html">${cart.getCartItemQuantity()} items</a>)`;
  document.querySelector('.js-checkout-header').innerHTML  = checkoutHeaderHTML;
}