import * as cartModule from "../../data/cart.js";
import * as productModule from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOptionById, getDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

function deliveryOptionsHTML(productId, item) {
  let result = '';
  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = getDeliveryDate(deliveryOption);

    const deliveryPrice = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`

    const isChecked = deliveryOption.id === item.deliveryOptionId;

    result += `
      <div class="delivery-option js-delivery-option" 
      data-product-id="${item.productId}" 
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${deliveryPrice} Shipping
          </div>
        </div>
      </div>
    `;
  });
  return result;
}

export function renderOrderSummary () {

  let checkoutItemsHtml = '';
  cartModule.cart.forEach((item) => {
    const product = productModule.getProductById(item.productId);

    const deliveryOption = getDeliveryOptionById(item.deliveryOptionId);
    const deliveryDate = getDeliveryDate(deliveryOption);

    checkoutItemsHtml += `
      <div class="cart-item-container js-cart-item-container-${item.productId}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-price">
              $${formatCurrency(product.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${product.id}">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" 
              data-product-id="${product.id}">
                Update
              </span>
              <input class="quantity-input js-new-quantity-input-${product.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" 
              data-product-id="${product.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" 
              data-product-id="${product.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(product.id, item)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = checkoutItemsHtml;

  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const productId = updateLink.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const productId = saveLink.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      const input = document.querySelector(`.js-new-quantity-input-${productId}`);
      if (input.value <= 0) {
        alert("Cannot set quantity to 0, Delete item instead");
      } else {
        cartModule.setItemQuantity(productId, Number(input.value));
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = cartModule.getItemQuantity(productId);

        renderCheckoutHeader();

        renderPaymentSummary();

        container.classList.remove('is-editing-quantity');
      }
    });
  });

  document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.productId;
      cartModule.removeFromCart(productId);

      renderCheckoutHeader();

      renderOrderSummary();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      cartModule.updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();

      renderPaymentSummary();
    });
  });
}