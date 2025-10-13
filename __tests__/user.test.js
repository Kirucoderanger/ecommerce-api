const request = require('supertest');
const app = require('../server');
jest.setTimeout(20000); // 20 seconds

describe('User API - Registration → Login → Authenticated Flow', () => {
  let customerId, adminId;
  let userToken, adminToken;

  const timestamp = Date.now(); // to ensure unique emails per test run

  const customer = {
    name: 'Test Customer',
    email: `customer${timestamp}@example.com`,
    passwordHash: '123456', // as per your current registration flow
    role: 'customer',
  };

  const admin = {
    name: 'Test Admin',
    email: `admin${timestamp}@example.com`,
    passwordHash: 'admin123', // as per your current registration flow
    role: 'admin',
  };

  const passwords = { customer: '123456', admin: 'admin123' };

  // Register and login both users before tests
  beforeAll(async () => {
    // 1️⃣ Register customer
    const regCustomer = await request(app)
      .post('/api/auth/register')
      .send(customer);
    expect([200, 201]).toContain(regCustomer.statusCode);
    customerId = regCustomer.body.user.id;

    // 2️⃣ Login customer
    const loginCustomer = await request(app)
      .post('/api/auth/login')
      .send({ email: customer.email, password: passwords.customer });
    expect(loginCustomer.statusCode).toBe(200);
    userToken = loginCustomer.body.token;

    // 3️⃣ Register admin
    const regAdmin = await request(app)
      .post('/api/auth/register')
      .send(admin);
    expect([200, 201]).toContain(regAdmin.statusCode);
    adminId = regAdmin.body.user.id;

    // 4️⃣ Login admin
    const loginAdmin = await request(app)
      .post('/api/auth/login')
      .send({ email: admin.email, password: passwords.admin });
    expect(loginAdmin.statusCode).toBe(200);
    adminToken = loginAdmin.body.token;
  });

  // ✅ Profile access tests
  it('should allow authenticated customer to access their profile', async () => {
    const res = await request(app)
      .get(`/api/auth/profile/${customerId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user.email', customer.email);
  });

  it('should allow authenticated admin to access their profile', async () => {
    const res = await request(app)
      .get(`/api/auth/profile/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user.email', admin.email);
  });

  // ✅ Admin-only access
  it('should allow admin to get all users', async () => {
    const res = await request(app)
      .get('/api/auth/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Export tokens for other tests
  afterAll(() => {
    global.userToken = userToken;
    global.adminToken = adminToken;
  });
});






/*const request = require('supertest');
const app = require('../server');

describe('User API - Registration → Login → Authenticated Flow', () => {
  let userToken;
  let customerId;
  let adminToken;
  let adminId;
  const timestamp = Date.now(); // to ensure unique email per test run

  const customer = {
    name: 'Test Customer',
    email: `customer${timestamp}@example.com`,
    passwordHash: '123456',
    role: 'customer',
  };

  const admin = {
    name: 'Test Admin',
    email: `admin${timestamp}@example.com`,
    passwordHash: 'admin123',
    role: 'admin',
  };
  const passwords = { customer: '123456', admin: 'admin123' }; 

  // 1️⃣ Register Customer (no authentication required)
  it('should register a new customer without authentication', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(customer);

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', customer.email);
    customerId = res.body.user._id;
  });

  // 2️⃣ Register Admin (no authentication required)
  it('should register a new admin without authentication', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(admin);

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', admin.email);
    adminId = res.body.user._id;
  });

  // 3️⃣ Login as Customer → Get JWT Token
  it('should login as customer and receive JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: customer.email,
        password: passwords.customer,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    userToken = res.body.token;
  });

  // 4️⃣ Login as Admin → Get JWT Token
  it('should login as admin and receive JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: admin.email,
        password: passwords.admin,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    adminToken = res.body.token;
  });

  // 4️⃣use admin JWT to get all users
  it('should allow admin to access all users', async () => {
    const res = await request(app)
      .get('/api/auth/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('users');
  });

  // 5️⃣ Use Customer JWT to access protected route
  it('should allow authenticated user to access profile', async () => {
    const res = await request(app)
      .get(`/api/auth/profile/${customerId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', customer.email);
  });

  // 6️⃣ Use Admin JWT to access protected route
  it('should allow authenticated admin to access profile', async () => {
    const res = await request(app)
      .get(`/api/auth/profile/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', admin.email);
  });

  // Export JWT tokens for other tests
  afterAll(() => {
    global.userToken = userToken;
    global.adminToken = adminToken;
  });
});
*/