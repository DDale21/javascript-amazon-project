import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch } from '../data/products.js'
import { cart } from '../data/cart-class.js'

async function loadPage() {
  await Promise.all([
    loadProductsFetch(),
    cart.loadCartFetch()
  ]);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
async function loadPage() {
  try {
    await loadProductsFetch();
    await cart.loadCartFetch();
  } catch(error) {
    console.log(error);
  }
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
*/

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    cart.loadCart(() => {
      resolve();
    });
  })
  
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });

}).then(() => {
  return new Promise((resolve) => {
    cart.loadCart(() => {
      resolve();
    });
  })

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

// async and await tutorial
/*
async function loadPage() {
  console.log('load page');
  await loadProductsFetch();
  return 'a value';
}
loadPage().then((value) => {
  console.log('next step')
  console.log(value);
});
*/