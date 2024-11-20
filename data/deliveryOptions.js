import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0,
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export const getDeliveryOptionById = (deliveryOptionId) => {
  let matchingOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingOption = option;
    }
  });
  return matchingOption;
}

export const getDeliveryDate = (deliveryOption) => {
  const targetDeliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');
  let deliveryDays = deliveryOption.deliveryDays;

  if (targetDeliveryDate.day() === 6) {
    deliveryDays += 2
  } else if (targetDeliveryDate.day() === 0) {
    deliveryDays += 1
  }
  
  return dayjs().add(deliveryDays, 'days').format('dddd, MMMM D');
}