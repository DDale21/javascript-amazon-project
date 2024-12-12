import { getOrderById } from "../data/orders.js";
import { getProductById } from "../data/products.js";
import { getOrderDate } from "./utils/date.js";

renderOrderTracking();

function renderOrderTracking () {
  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const matchingOrder = getOrderById(orderId);

  const productId = url.searchParams.get('productId');
  const matchingOrderProduct = matchingOrder.getOrderProductById(productId);

  let html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${getOrderDate(matchingOrder.orderTime)}
    </div>

    <div class="product-info">
      ${getProductById(productId).getName()}
    </div>

    <div class="product-info">
      Quantity: ${matchingOrderProduct.quantity}
    </div>

    <img class="product-image" src="${getProductById(productId).getImage()}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `

  document.querySelector('.js-order-tracking').innerHTML = html;
}