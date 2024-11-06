import * as cartModule from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const convertRating = (stars) => {
  let result;
  if (stars === 0) {
    result = 'rating-0.png';
  } else if (stars === 0.5) {
    result = 'rating-05.png';
  } else if (stars === 1) {
    result = 'rating-10.png';
  } else if (stars === 1.5) {
    result = 'rating-15.png';
  } else if (stars === 2) {
    result = 'rating-20.png';
  } else if (stars === 2.5) {
    result = 'rating-25.png';
  } else if (stars === 3) {
    result = 'rating-30.png';
  } else if (stars === 3.5) {
    result = 'rating-35.png';
  } else if (stars === 4) {
    result = 'rating-40.png';
  } else if (stars === 4.5) {
    result = 'rating-45.png';
  } else if (stars === 5) {
    result = 'rating-50.png';
  }
  return result;
}

let productsHtml = '';

products.forEach((product) => {
  productsHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/${convertRating(product.rating.stars)}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
  });
  document.querySelector('.js-products-grid').innerHTML = productsHtml;

  const updateTotalCartQuantity = () => {
    let total = 0;
    cartModule.cart.forEach((item) => {
      total += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = total;
  };

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click',  () => {
      const productId = button.dataset.productId;
      cartModule.addToCart(productId);
      updateTotalCartQuantity();
    });
  });

