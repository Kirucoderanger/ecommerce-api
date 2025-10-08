const request = require('supertest');
const app = require('../server'); // your main app file

describe('Product API Tests', () => {
  test('GET /api/products - should return all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true); // adjust depending on your response format
  });


  test('GET /api/products/:id - should return 404 if not found', async () => {
    const res = await request(app).get('/api/products/invalid-id');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBeDefined();
  });
});

// Add cleanup to avoid Jest “open handle” warning
afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
});
