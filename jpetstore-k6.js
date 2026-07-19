/*
 *    Copyright 2010-2026 the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *       https://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 20,
  duration: '30s',
};

export default function () {
  const category = http.get(
    'http://localhost:8080/jpetstore/actions/Catalog.action?viewCategory=&categoryId=FISH'
  );

  check(category, {
    'category page 200': (r) => r.status === 200,
  });

  const product = http.get(
    'http://localhost:8080/jpetstore/actions/Catalog.action?viewProduct=&productId=FI-SW-01'
  );

  check(product, {
    'product page 200': (r) => r.status === 200,
  });

  const item = http.get(
    'http://localhost:8080/jpetstore/actions/Catalog.action?viewItem=&itemId=EST-1'
  );

  check(item, {
    'item page 200': (r) => r.status === 200,
  });

  sleep(1);
}