export let orders = JSON.parse(localStorage.getItem('orders'))
  ? JSON.parse(localStorage.getItem('orders'))
  : [];

export function getOrderById(id) {
  if (!orders || orders.length === 0) {
    return;
  }
  let matchingOrder;
  orders.forEach((order) => {
    if (order.getId() === id) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
}

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export class Order {
  id;
  orderTime;
  totalCostCents;
  products;

  constructor(orderDetails) {
    this.id = orderDetails.id;
    this.orderTime = orderDetails.orderTime;
    this.totalCostCents = orderDetails.totalCostCents;
    this.products = orderDetails.products;
  }

  getId() {
    return this.id;
  }
}