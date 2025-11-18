const request = require('supertest');
const app = require('../src/app');

describe('App.js general tests', () => {
  test('Fallback 404 route returns correct JSON', async () => {
    const res = await request(app).get('/ruta/que/no/existe').expect(404);

    expect(res.body).toEqual({ message: 'Route not found' });
  });
});