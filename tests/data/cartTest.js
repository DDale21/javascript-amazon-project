import { cart } from "../../data/cart-class.js"

describe('test suite: addToCart', () => {
  const dummyCart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionId: '1'
  }];

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  });

  it('adds an existing product to the cart', () => {
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{...dummyCart[0], quantity: 2}]));
  });

  it('adds a new product to the cart', () => {
    cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(cart.cartItems.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[1].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(cart.cartItems[1].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([...dummyCart, {
      productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });
});

describe('test suite: removeFromCart', () => {
  let dummyCart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '1'
  }];
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  });

  it('removes a specified product from the cart', () => {
    expect(cart.cartItems.length).toEqual(2);
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([dummyCart[1]]));
  });

  it('does nothing when removing non-existing product', () => {
    expect(cart.cartItems.length).toEqual(2);
    cart.removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.cartItems[1].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify(dummyCart));
  });
});

describe('test suite: updateDeliveryOption', () => {
  let dummyCart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionId: '1'
  }];
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];
  });

  it('updates the delivery option of a product', () => {
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{...dummyCart[0], deliveryOptionId: '3'}]));
  });

  it('does nothing when updating delivery option of non-existing product', () => {
    cart.updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', '2');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('does nothing when updating delivery option to non-existing option', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '5');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});