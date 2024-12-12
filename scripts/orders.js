import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { getProductById, loadProductsFetch } from "../data/products.js";
import { getOrderDate } from "./utils/date.js";
import { cart } from '../data/cart-class.js';

renderOrder();

async function renderOrder() {
  renderCartQuantity();

  try {
    await loadProductsFetch();
  } catch(error) {
    console.log(error);
  }

  renderOrderContainer();
  
  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      let productId = button.dataset.productId;
      cart.addToCart(productId);
      renderCartQuantity();
    });
  });
}

function renderOrderContainer() {
  document.querySelector('.js-cart-quantity').innerHTML = cart.getCartItemQuantity()

  let html = '';
  if (orders.length === 0) {
    html = '<h2>You have no orders</h2>';
  } else {
    orders.forEach((order) => {
      html += `
      <div class="order-container">
              
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${getOrderDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
    
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details">
          ${renderOrderProducts(order)}
        </div>

      </div>
      `;
    });
  }
  document.querySelector('.js-orders-grid').innerHTML = html;
}

function renderOrderProducts(order) {
  let orderItemsHtml = '';

  order.products.forEach((product) => {
    const matchingProduct = getProductById(product.productId)
    orderItemsHtml += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${getOrderDate(product.estimatedDeliveryTime)}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
          <button class="track-package-button button-secondary js-track-package-button">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return orderItemsHtml;
}

function renderCartQuantity() {
  document.querySelector('.js-cart-quantity').innerHTML = cart.getCartItemQuantity();
}