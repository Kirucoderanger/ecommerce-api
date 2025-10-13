const request = require('supertest');
const app = require('../server');

describe('Order API - Real JWT Auth', () => {
  let userToken;
  let userId;
  let orderId;
  let adminToken;

  beforeAll(async () => {
    // Login and capture user token and user ID
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test3@tes3.com',
        password: 'test3customer'
      });
    expect(res.statusCode).toBe(200);
    userToken = res.body.token;
    userId = res.body.user.id; // save the user ID for order creation
    // Login admin
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test2@test2.com',
        password: 'test2admin'
      });
    expect(adminRes.statusCode).toBe(200);
    adminToken = adminRes.body.token;
  });

  it('should allow customer to create order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        customerId: userId, // pass user ID from login
        items: [
          { productId: '68e0443a11558ef51c2dde7c', quantity: 2 }
        ]
      });

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('customerId');
    expect(res.body.customerId).toBe(userId); // verify order saved with correct user
    orderId = res.body._id;
  });
  // 3️⃣ Prevent unauthenticated access
  /*it('should not allow unauthenticated access', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toBe(401);
  });*/

  // 4️⃣ Get all orders of the logged-in customer
  it('should allow customer to get their orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 5️⃣ Get order by ID
  it('should allow customer to get order by ID', async () => {
    const res = await request(app)
      .get(`/api/orders/my`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ customerId: userId });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Additional check to ensure the order is in the list
    const order = res.body.find(o => o._id === orderId);
    expect(order).toBeDefined();
  });
/*
  // 6️⃣ Update order
  it('should allow customer to update their order', async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        items: [
          { productId: 'REAL001', quantity: 1 }
        ]
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('order');
  });*/
/*
  // 7️⃣ Delete order
  it('should allow customer to delete their order', async () => {
    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Order deleted successfully');
  });

  // 8️⃣ Prevent deleting the same order again
  it('should prevent customer from deleting a non-existent order', async () => {
    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Order not found');
  });*/
});

