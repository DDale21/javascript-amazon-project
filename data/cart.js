const cart = [];

const getTotalCartQuantity = () => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
}