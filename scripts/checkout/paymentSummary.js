import { cart } from "../../data/cart-class.js";
import formatCurrency from "../utils/money.js";

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

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}