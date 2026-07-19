import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/jpetstore';

export const options = {
  vus: Number(__ENV.VUS || 200),
  duration: __ENV.DURATION || '2m',

  thresholds: {
    checks: ['rate>=0.95'],
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<3000'],
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

/*
VUS=200 DURATION=2m k6 run k6-test/stress-db.js
VUS=300 DURATION=2m k6 run k6-test/stress-db.js
VUS=400 DURATION=2m k6 run k6-test/stress-db.js
VUS=500 DURATION=2m k6 run k6-test/stress-db.js
VUS=700 DURATION=2m k6 run k6-test/stress-db.js
VUS=900 DURATION=2m k6 run k6-test/stress-db.js
VUS=1100 DURATION=2m k6 run k6-test/stress-db.js
*/