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
| `JWT_EXPIRE` | Expiration time for generated JWT tokens | `30d` (or `7d`, `1d`, `1h`) |

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
│   └── User.js                   # Mongoose User Schema (select: false on password) & hashing hook
├── controllers/
│   └── authController.js         # Controllers for register, login, & profile/me retrieval
├── middleware/
│   ├── authMiddleware.js         # JWT Authentication guard middleware (`protect`) & expiry handler
│   └── rateLimiter.js            # Login rate limiter middleware (`express-rate-limit`)
├── routes/
│   └── authRoutes.js             # Express API routes (`/api/auth`)
├── utils/
│   └── generateToken.js          # JWT signing utility (configurable expiration via JWT_EXPIRE)
└── server.js                     # Express server, DNS fallback & MongoDB connection
```

---

## 🔒 Security Architecture

### 1. User Model & Password Hashing (`models/User.js`)
- **Schema Fields**: `name`, `email` (unique, lowercase, trimmed), `password` (`select: false`, min length: 6).
- **Defense in Depth**: Password field is set to `select: false` by default, ensuring password hashes are NEVER returned in any Mongoose query unless explicitly requested via `.select('+password')`.
- **Pre-Save Hashing Hook**: Automatically salts (`saltRounds = 10`) and hashes passwords using `bcryptjs` before persisting to MongoDB.
- **Password Comparison**: Instance method `user.matchPassword(enteredPassword)` compares plain text input against the stored hash securely via `bcrypt.compare`.

### 2. Stateless Auth & JWT Expiry (`utils/generateToken.js` & `controllers/authController.js`)
- Returns a signed JSON Web Token (JWT) containing the user's MongoDB `_id` upon registration or login (`expiresIn: process.env.JWT_EXPIRE || '30d'`).
- Plain text and hashed passwords are stripped from all API response payloads.

### 3. Rate Limiting (`middleware/rateLimiter.js`)
- `loginLimiter` protects `POST /api/auth/login` against brute force attacks by limiting requests per IP address (10 requests per 15-minute window).

### 4. Middleware Guard & Bearer Token Validation (`middleware/authMiddleware.js`)
- `protect` middleware strictly extracts `Bearer <token>` from the HTTP `Authorization` header.
- Decodes and verifies token signature using `JWT_SECRET`.
- Gracefully handles `TokenExpiredError` with an explicit 401 response (`"Not authorized, token expired"`).
- Fetches user records from MongoDB excluding the password field and attaches the object to `req.user`.

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

### 2. Login User (Rate-Limited)
- **Route**: `POST /api/auth/login`
- **Access**: Public (Max 10 requests / 15 mins)
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

### 3. Get Current Auth User / Profile (Protected)
- **Route**: `GET /api/auth/me` (Alias: `GET /api/auth/profile`)
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
- **Response (401 Unauthorized - Token Expired)**:
  ```json
  {
    "message": "Not authorized, token expired"
  }
  ```

---

## 🧪 Verification & Automated Testing

All authentication workflows and gap fixes were validated:
1. ✅ **`GET /api/auth/me`**: Returns 200 OK with sanitized user details when provided a valid Bearer token.
2. ✅ **JWT Expiry Validation**: `TokenExpiredError` is caught cleanly and returns 401 `"Not authorized, token expired"`.
3. ✅ **Password Hash Protection**: `password` is defined with `select: false`, preventing accidental hash exposure in queries.
4. ✅ **Rate Limiting**: `POST /api/auth/login` uses `loginLimiter` to mitigate brute force attacks.
5. ✅ **Explicit Bearer-token Parsing**: Handled securely via case-insensitive `Bearer ` prefix check.

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
