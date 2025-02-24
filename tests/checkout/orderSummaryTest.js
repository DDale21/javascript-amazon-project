import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js"
import { getProductById } from "../../data/products.js";
import formatCurrency from "../../scripts/utils/money.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";
import { loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeAll(async () => {
    await loadProductsFetch()
  });

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }]

    renderOrderSummary();

    renderPaymentSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText)
      .toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText)
      .toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText)
      .toContain('Quantity: 1');
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText)
      .toEqual('Intermediate Size Basketball');
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  })

  it('displays the correct prices', () => {
    const product1Price = getProductById(productId1).priceCents;
    const product2Price = getProductById(productId2).priceCents;
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toContain('$');
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toContain('$');
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText)
      .toEqual(`$${formatCurrency(product1Price)}`);
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText)
      .toEqual(`$${formatCurrency(product2Price)}`);
  });

  it('updates the delivery option', () => {
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(document.querySelector(`.js-delivery-option-input-${productId1}-1`).checked).toEqual(true);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');

    expect(cart.cartItems[1].productId).toEqual(productId2);
    expect(document.querySelector(`.js-delivery-option-input-${productId2}-2`).checked).toEqual(true);
    expect(cart.cartItems[1].deliveryOptionId).toEqual('2');

    document.querySelectorAll(`.js-delivery-option-product-id-${productId1}`).forEach((element) => {
      if(element.dataset.deliveryOptionId === '3') {
        element.click();
      }
    });
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(document.querySelector(`.js-delivery-option-input-${productId1}-1`).checked).not.toEqual(true);
    expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    expect(cart.cartItems[1].productId).toEqual(productId2);
    expect(document.querySelector(`.js-delivery-option-input-${productId2}-3`).checked).not.toEqual(true);
    expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
  });

  it('updates the payment summary after updating delivery option', () => {
    expect(document.querySelector('.js-total-shipping').innerText).toEqual('$4.99');
    expect(document.querySelector('.js-total-price').innerText).toEqual('$52.51');

    document.querySelectorAll(`.js-delivery-option-product-id-${productId1}`).forEach((element) => {
      if(element.dataset.deliveryOptionId === '3') {
        element.click();
      }
    });

    expect(document.querySelector('.js-total-shipping').innerText).toEqual('$14.98');
    expect(document.querySelector('.js-total-price').innerText).toEqual('$63.50');
  });
});