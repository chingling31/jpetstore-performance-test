import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/jpetstore';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '30s', target: 300 },
    { duration: '30s', target: 500 },
    { duration: '30s', target: 700 },
    { duration: '30s', target: 900 },
    { duration: '30s', target: 1100 },
    { duration: '30s', target: 1500 },
    { duration: '30s', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<8000'],
  },
};

export default function () {
  let res;

  res = http.get(`${BASE_URL}/actions/Catalog.action?viewCategory=&categoryId=FISH`);
  check(res, { 'Category 200': (r) => r.status === 200 });

  res = http.get(`${BASE_URL}/actions/Catalog.action?viewProduct=&productId=FI-SW-01`);
  check(res, { 'Product 200': (r) => r.status === 200 });

  res = http.get(`${BASE_URL}/actions/Catalog.action?viewItem=&itemId=EST-1`);
  check(res, { 'Item 200': (r) => r.status === 200 });

  sleep(1);
}

//k6 run k6-test/breakpoint-db.js