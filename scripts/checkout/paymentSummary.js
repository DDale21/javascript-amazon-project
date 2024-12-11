import { cart } from "../../data/cart-class.js";
import formatCurrency from "../utils/money.js";
import { Order, addOrder } from "../../data/orders.js";

export function renderPaymentSummary () {
  const totalBeforeTax = cart.calculateProductTotalPrice() + cart.calculateShippingTotal();
  const tax = totalBeforeTax * 0.1;
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.getCartItemQuantity()}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(cart.calculateProductTotalPrice())}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-total-shipping">
        $${formatCurrency(cart.calculateShippingTotal())}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTax)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(tax)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-total-price">$${cart.calculateOrderTotalPrice()}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  document.querySelector('.js-place-order').addEventListener(('click'), async () => {
    let orderDetails;
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cartItems
        })
      });
  
      orderDetails = await response.json();
      const newOrder = new Order(orderDetails);
      addOrder(newOrder);

    } catch(error) {
      console.log(error);
    }

    window.location.href = `orders.html`;
  });
}