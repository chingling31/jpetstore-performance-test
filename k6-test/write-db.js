import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'http://localhost:8080/jpetstore';

export const options = {
    vus: Number(__ENV.VUS || 10),
    duration: __ENV.DURATION || '30s',

    thresholds: {
        checks: ['rate>=0.99'],
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<1000'],
    },
};

export default function () {

    // 每次 iteration 都產生唯一帳號
    const username =
        `k6_${__VU}_${__ITER}_${Date.now()}`;

    const payload = {

        username: username,

        password: 'test123',

        repeatedPassword: 'test123',

        'account.firstName': 'K6',

        'account.lastName': 'Test',

        'account.email': `${username}@test.com`,

        'account.phone': '0912345678',

        'account.address1': 'Test Address',

        'account.address2': '',

        'account.city': 'Taipei',

        'account.state': 'Taipei',

        'account.zip': '100',

        'account.country': 'Taiwan',

        'account.languagePreference': 'english',

        'account.favouriteCategoryId': 'FISH',

        'account.listOption': 'false',

        'account.bannerOption': 'false',

        newAccount: 'Save Account Information'
    };

    const res = http.post(
        `${BASE_URL}/actions/Account.action`,
        payload,
        {
            redirects: 0
        }
    );

    check(res, {

        'Create account success': (r) =>
            r.status === 302

    });

}