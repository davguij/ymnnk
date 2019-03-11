const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('supertest');

const code = require('.');

let service;
let mountedUrl;

test.beforeEach(async () => {
  service = micro(code);
  mountedUrl = await listen(service);
});

test.afterEach.always(async () => {
  service.close();
});

test('GET is allowed and returning a proper value', async t => {
  const expected = [
    {
      id: 1,
      name: 'cerulean',
      year: 2000,
      color: '#98B2D1',
      pantone_value: '15-4020',
    },
    {
      id: 2,
      name: 'fuchsia rose',
      year: 2001,
      color: '#C74375',
      pantone_value: '17-2031',
    },
    {
      id: 3,
      name: 'true red',
      year: 2002,
      color: '#BF1932',
      pantone_value: '19-1664',
    },
  ];
  const response = await request(mountedUrl).get('/');
  t.is(response.status, 200);
  t.deepEqual(response.body, expected);
});

test('POST is disallowed', async t => {
  try {
    await request(mountedUrl).post('/');
    t.fail();
  } catch (e) {
    t.is(e.status, 405);
  }
});
