/*import {routes/product} from '../routes/productRoutes.js';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import test, { describe } from 'node:test';

const app = express();
app.use(bodyParser.json());
app.use('/products', products);
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

describe('Products API', () => {
test('GET /products - success', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
});

test('POST /products - success', async () => {
    const newProduct = { name: 'Test Product', price: 9.99 };
    const response = await request(app).post('/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.price).toBe(newProduct.price);
});
test('POST /products - validation error', async () => {
    const invalidProduct = { name: '', price: -5 };
    const response = await request(app).post('/products').send(invalidProduct);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
});
test('GET /products/:id - not found', async () => {
    const response = await request(app).get('/products/invalid-id');
    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
});
});*/