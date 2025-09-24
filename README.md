# ecommerce-api
The E-Commerce API is a backend solution for managing products, shopping carts, inventories and customer orders. It integrates with MongoDB for scalable data storage and supports payment gateway integration (Stripe/PayPal).

# 🛒 E-Commerce Product & Order Management API

A **Node.js + Express + MongoDB** backend system that manages **Products, Orders, Customers, and Inventory** with role-based access and JWT authentication.

---

## 🚀 Features
- Full **CRUD** operations:
  - Products
  - Orders
  - Customers
  - Inventory
- **Automatic inventory deduction/restock** on order create/cancel/delete
- **Validation & error handling** using `express-validator`
- **Role-based authorization** (Admin, Customer, etc.)
- JWT-based **authentication**
- RESTful API design with **Swagger docs**

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT
- **Validation:** express-validator
- **Dev Tools:** ESLint, Nodemon

---

## 📦 Installation
```bash
# Clone repo
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api

# Install dependencies
npm install

⚙️ Environment Setup

Create a .env file in root:
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-secret-key

▶️ Running the Server
# Development
npm run dev

# Production
npm start

📚 API Endpoints
🔑 Auth

POST /api/auth/register – Register user

POST /api/auth/login – Login & get token

📦 Products

POST /api/products – Create product

GET /api/products – Get all products

PUT /api/products/:id – Update product

DELETE /api/products/:id – Delete product

📦 Orders

POST /api/orders – Place order (deducts inventory)

PUT /api/orders/:id – Update order

DELETE /api/orders/:id – Delete order (restores stock)

POST /api/orders/:id/cancel – Cancel order (restores stock)

📦 Inventory

GET /api/inventory – List inventory

PUT /api/inventory/:id/restock – Restock item

🧪 Testing

Use REST Client or Postman collection (included in /tests).

