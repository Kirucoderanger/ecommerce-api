const request = require('supertest');
const app = require('../server');
jest.setTimeout(20000); // 20 seconds

describe('Inventory API - Real JWT Auth', () => {
  let adminToken;
  let inventoryId;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test2@test2.com',
        password: 'test2admin'
      });
    adminToken = res.body.token;
  });

 /* it('should allow admin to add inventory', async () => {
    const res = await request(app)
      .post('/api/inventory')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        productId: '68ebcdfa81d083c12351ee6a',
        stock: 50
        // location: 'Test Warehouse'
      });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('inventory');
    inventoryId = res.body.inventory._id;
  });
*/
  it('should allow admin to view inventory list', async () => {
    const res = await request(app)
      .get('/api/inventory')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
    /*it('should allow admin to update inventory', async () => {
    const res = await request(app)
      .put(`/api/inventory/${inventoryId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        quantity: 75,
        location: 'Test Warehouse'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('inventory');
  });
    it('should allow admin to delete inventory', async () => {
    const res = await request(app)
      .delete(`/api/inventory/${inventoryId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Inventory item deleted successfully');
  });*/
});
