import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080/jpetstore';

export const options = {
  vus: Number(__ENV.VUS || 50),
  duration: __ENV.DURATION || '2m',

  thresholds: {
    checks: ['rate>=0.99'],//至少99%要成功
    http_req_failed: ['rate<0.01'],//失敗率 <1%
    http_req_duration: ['p(95)<1000'],//95%的request都要小於1000ms 
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
VUS=10 DURATION=1m k6 run k6-test/load-db.js
VUS=25 DURATION=1m k6 run k6-test/load-db.js
VUS=50 DURATION=2m k6 run k6-test/load-db.js
VUS=75 DURATION=2m k6 run k6-test/load-db.js
VUS=100 DURATION=2m k6 run k6-test/load-db.js
*/
