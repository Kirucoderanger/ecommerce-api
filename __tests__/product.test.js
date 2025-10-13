const request = require('supertest');
const app = require('../server');
const { it } = require('node:test');

describe('Product API - Real JWT Auth', () => {
  let adminToken;
  let productId;

  beforeAll(async () => {
    // Log in admin
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123'
      });
    adminToken = res.body.token;
  });

  it('should allow admin to create a product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Real Product',
        description: 'Created in test with real JWT',
        price: 99.99,
        category: 'Testing',
        sku: 'REAL001'
      });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('product');
    productId = res.body.product._id;
  });

  it('should retrieve all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it('should retrieve product by ID', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('product');
  });
});
  it('should allow admin to update a product', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Product',
        description: 'Updated description',
        price: 89.99,
        category: 'Testing',
        sku: 'REAL001'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('product');
  });
  it('should allow admin to delete a product', async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Product deleted successfully');
  });

  it('should prevent non-admin from creating a product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Unauthorized Product',
        description: 'This product should not be created',
        price: 49.99,
        category: 'Testing',
        sku: 'UNAUTH001'
      });
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('message', 'Forbidden');
  });

  