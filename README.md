# 🛒 GOF Ecommerce Platform

> **TL;DR:** GOF is a full-stack e-commerce platform where customers can browse and purchase jerseys, boots, and footballs inspired by some of the world's greatest footballers. Built with **React, Tailwind CSS, Node.js, Express, and MongoDB**, it enables users to browse products, authenticate securely, and complete purchases. The project demonstrates **frontend-backend integration, REST API development, JWT authentication, and scalable ecommerce architecture**.

---

## 💡 Inspiration

Built to practice full-stack ecommerce development and modern web architecture — specifically how a React frontend communicates with a Node/Express backend and MongoDB database to deliver a real shopping experience.

---

## ✨ Features

### ✅ Implemented

- **Product Browsing** — browse available jerseys, boots, and footballs with a clean, responsive product listing
- **User Registration & Login** — full account creation and login flow backed by secure API routes
- **JWT Authentication** — stateless session management using signed JSON Web Tokens; protected routes reject unauthorised requests with `401 Unauthorized`
- **Checkout & Order System** — users can complete purchases through a structured checkout flow

### 🔧 In Progress

- **Shopping Cart** — add/remove items and view cart contents before checkout
- **Individual Product Pages** — detailed view per product with images, description, and pricing

---

## 🏗️ Architecture

GOF follows a standard **client-server architecture** with a clear separation between the React frontend and the Express/MongoDB backend.

```
┌─────────────────────┐         HTTP / REST API        ┌──────────────────────┐
│   React Frontend    │  ──────────────────────────►  │  Express.js Backend  │
│ (Vite + Tailwind)   │  ◄──────────────────────────  │   (Node.js + REST)   │
└─────────────────────┘        JSON Responses          └──────────┬───────────┘
                                                                   │
                                                                   │ Mongoose ODM
                                                                   ▼
                                                        ┌─────────────────────┐
                                                        │       MongoDB       │
                                                        │  (Products, Users,  │
                                                        │     Orders DB)      │
                                                        └─────────────────────┘
```

**API structure:**
```
POST   /api/auth/register       → Register a new user
POST   /api/auth/login          → Authenticate and receive JWT
GET    /api/products            → Fetch all products (public)
GET    /api/products/:id        → Fetch single product (public)
POST   /api/orders              → Place an order (protected)
GET    /api/orders/:userId      → Fetch user order history (protected)
```

**Data flow:**
1. User registers or logs in → backend validates credentials → returns a signed JWT
2. JWT is stored client-side and attached to every subsequent request via the `Authorization` header
3. Protected routes (orders, user data) verify the token before processing
4. Product and order data is fetched from MongoDB and rendered dynamically on the frontend

---

## 🔐 Security & Authentication

- **JWT-based auth** — on successful login, the server issues a signed token with an expiry time
- **Protected routes** — all order endpoints require a valid `Authorization: Bearer <token>` header; invalid or expired tokens return `401 Unauthorized`
- **Password hashing** — passwords are hashed before storage and never returned in API responses
- **Environment variables** — sensitive config (MongoDB URI, JWT secret) kept out of source code via `.env`

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, React Router, Axios, React Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Auth | JSON Web Tokens (JWT) |

---

## 🚀 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/gof-ecommerce.git
cd gof-ecommerce
```

**2. Install backend dependencies**
```bash
cd backend
npm install
```

**3. Install frontend dependencies**
```bash
cd ../frontend
npm install
```

**4. Set up environment variables**

Create a `.env` file in the `/backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
```

**5. Start the backend**
```bash
npm run dev
# Runs at http://localhost:5000
```

**6. Start the frontend**
```bash
npm run dev
# Runs at http://localhost:5173
```

---

## 🎨 UI Highlights

- Modern ecommerce layout with product cards, images, and pricing
- Responsive navigation bar across desktop, tablet, and mobile
- Clean and intuitive checkout flow

---

## 📸 Screenshots

> _Add screenshots here — product listing, product page, and checkout flow recommended._

To add screenshots:
1. Take a screenshot of the running app
2. Save to a `/screenshots` folder in the repo
3. Reference them here: `![Products](screenshots/products.png)`

---

## 🛠 Future Improvements

- [ ] Complete shopping cart (add/remove items, quantity management)
- [ ] Individual product detail pages
- [ ] User order history dashboard
- [ ] Admin panel for product management
- [ ] Payment gateway integration (Stripe or M-Pesa)
- [ ] Product search, filtering, and sorting
- [ ] Product reviews and ratings
- [ ] Containerise with Docker and deploy via Render or Railway

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a pull request
