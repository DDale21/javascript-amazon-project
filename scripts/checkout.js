import * as cartModule from "../data/cart.js";
import * as productModule from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const updateTotalCartItemsElement = () => {
  const totalCartItemsElement = document.querySelector('.js-cart-item-count');
  totalCartItemsElement.innerHTML = `${cartModule.getCartItemQuantity()} items`;
}

updateTotalCartItemsElement();

let checkoutItemsHtml = '';
cartModule.cart.forEach((item) => {
  const product = productModule.getProductById(item.productId);
  checkoutItemsHtml += `
    <div class="cart-item-container js-cart-item-container-${item.productId}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${product.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
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
    cartModule.setItemQuantity(productId, Number(input.value));

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = cartModule.getItemQuantity(productId);

    updateTotalCartItemsElement();

    container.classList.remove('is-editing-quantity');
  });
});

document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
  deleteLink.addEventListener('click', () => {
    const productId = deleteLink.dataset.productId;
    cartModule.removeFromCart(productId);

    updateTotalCartItemsElement();

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  });
});

 