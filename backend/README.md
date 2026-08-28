# Phase 2: Authentication & Authorization Backend Module

This repository module contains the standalone **Authentication & Authorization** backend built as part of Phase 2 (Member 2). It provides secure user management, password hashing with `bcryptjs`, JWT token issuance, and protected route middleware.

---

## 🛠️ Technology Stack & Dependencies

- **Node.js & Express**: Web server framework.
- **MongoDB & Mongoose**: NoSQL database and ODM for schema definitions.
- **bcryptjs**: One-way password hashing algorithm (`saltRounds = 10`).
- **jsonwebtoken (JWT)**: Stateless authentication via signed tokens.
- **dotenv**: Environment variable management.

---

## ⚙️ Environment Variable Requirements (`.env`)

Configure the following key-value pairs in `backend/.env`:

| Variable | Description | Example / Recommended Value |
| :--- | :--- | :--- |
| `PORT` | Port number for the Express server | `5000` |
| `MONGO_URI` | MongoDB Atlas or local MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/syncboard` |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens | `your_jwt_secret_key_change_in_production` |

> [!NOTE]
> **DNS SRV Resolution Fallback:** In `server.js`, a fallback using `dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])` is configured to handle `querySrv ECONNREFUSED` issues caused by restrictive local ISP DNS resolvers. Direct non-SRV replica set connection string templates are also provided in `.env`.

---

## 📁 Directory Structure

```
backend/
├── .env                          # Environment variables & DB connection string
├── package.json                  # Module dependencies & scripts
├── README.md                     # Technical module documentation
├── models/
│   └── User.js                   # Mongoose User Schema & password hashing pre-save hook
├── controllers/
│   └── authController.js         # Controllers for register, login, & profile retrieval
├── middleware/
│   └── authMiddleware.js         # JWT Authentication guard middleware (`protect`)
├── routes/
│   └── authRoutes.js             # Express API routes (`/api/auth`)
├── utils/
│   └── generateToken.js          # JWT signing utility (30-day expiration)
└── server.js                     # Express server, DNS fallback & MongoDB connection
```

---

## 🔒 Security Architecture

### 1. User Model & Password Hashing (`models/User.js`)
- **Schema Fields**: `name`, `email` (unique, lowercase, trimmed), `password` (min length: 6).
- **Pre-Save Hashing Hook**: Automatically salts (`saltRounds = 10`) and hashes passwords using `bcryptjs` before persisting to MongoDB.
- **Password Comparison**: Instance method `user.matchPassword(enteredPassword)` compares plain text input against the stored hash securely via `bcrypt.compare`.

### 2. Stateless Auth & JWT Issuance (`utils/generateToken.js` & `controllers/authController.js`)
- Returns a signed JSON Web Token (JWT) containing the user's MongoDB `_id` upon registration or login (`expiresIn: '30d'`).
- Plain text and hashed passwords are stripped from responses.

### 3. Middleware Guard (`middleware/authMiddleware.js`)
- `protect` middleware extracts the `Bearer <token>` from the HTTP `Authorization` header.
- Decodes and verifies the token signature using `JWT_SECRET`.
- Fetches user records from MongoDB excluding the password field (`.select('-password')`) and attaches the object to `req.user`.
- Protects unauthorized requests by returning **HTTP 401 Unauthorized**.

---

## 🚀 API Endpoint Reference & Verified Payloads

### 1. Register User
- **Route**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "_id": "6a91364e9f03d49409f2119b",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### 2. Login User
- **Route**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "_id": "6a91364e9f03d49409f2119b",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### 3. Get User Profile (Protected)
- **Route**: `GET /api/auth/profile`
- **Access**: Private (Requires `Authorization: Bearer <token>`)
- **Headers**:
  ```http
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Response (200 OK)**:
  ```json
  {
    "_id": "6a91364e9f03d49409f2119b",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2026-08-28T07:18:38.633Z",
    "updatedAt": "2026-08-28T07:18:38.633Z"
  }
  ```
- **Response (401 Unauthorized - Missing/Invalid Token)**:
  ```json
  {
    "message": "Not authorized, no token"
  }
  ```

---

## 🧪 Verification & Automated Testing

All 4 authentication workflows were validated against the live running server:
1. ✅ **User Registration** (`POST /api/auth/register`) returns `201 Created` with signed JWT.
2. ✅ **User Login** (`POST /api/auth/login`) returns `200 OK` with verified credentials & signed JWT.
3. ✅ **Unauthorized Guard** (`GET /api/auth/profile` without token) returns `401 Unauthorized`.
4. ✅ **Authorized Retrieval** (`GET /api/auth/profile` with Bearer token) returns sanitized user profile without password exposure.

---

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`.
3. Start development server:
   ```bash
   npm start
   ```
