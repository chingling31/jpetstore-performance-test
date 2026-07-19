import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/jpetstore';

export const options = {
  vus: 1,
  duration: '30s',
};

export default function () {

  let res = http.get(
    `${BASE_URL}/actions/Catalog.action?viewCategory=&categoryId=FISH`
  );

  check(res, {
    'Category 200': (r) => r.status === 200,
  });

  res = http.get(
    `${BASE_URL}/actions/Catalog.action?viewProduct=&productId=FI-SW-01`
  );

  check(res, {
    'Product 200': (r) => r.status === 200,
  });

  res = http.get(
    `${BASE_URL}/actions/Catalog.action?viewItem=&itemId=EST-1`
  );

  check(res, {
    'Item 200': (r) => r.status === 200,
  });

  sleep(1);
}