import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getOrderDate(date) {
  return dayjs(date).format('MMMM D');
}