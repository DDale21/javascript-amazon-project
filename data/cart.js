export const cart = [];

export const addToCart = (productId) => {
  let existingItem;
  
  cart.forEach((item) => {
    if (productId === item.productId) {
      existingItem = item;
    }
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
};
