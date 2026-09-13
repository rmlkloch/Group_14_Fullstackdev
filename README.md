# 📋 SyncBoard — Fullstack Kanban Task Management Application

> **Group 14 | Full Stack Web Development**
> A collaboratively built, progressively developed full-stack web application.

[![CI Pipeline](https://github.com/Genzheta/Group_14_Fullstackdev/actions/workflows/ci.yml/badge.svg)](https://github.com/Genzheta/Group_14_Fullstackdev/actions/workflows/ci.yml)

---

## 📚 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technologies Used](#2-technologies-used)
3. [How to Run](#3-how-to-run)
   - [Option A — Docker (Recommended)](#option-a--docker-compose-recommended-easiest)
   - [Option B — Local Manual Setup](#option-b--local-manual-setup)
   - [Option C — Run Tests Only](#option-c--run-tests-only)
4. [Project Structure](#4-complete-project-structure)
5. [API Endpoints](#5-api-endpoints)
6. [Milestone Summary](#6-milestone-progress-complete-summary)
7. [Team Members](#7-team-members--allocations)
8. [Project Plans](#8-project-plans)

---

## 1. Project Overview

**SyncBoard** is a real-time, collaborative Kanban task management web application built with a full-stack architecture across five progressive milestones. It allows agile teams to create boards, manage tasks across status columns (*To Do*, *Doing*, *Done*), and collaborate with live updates — all secured behind JWT authentication and role-based access control.

- **Application**: SyncBoard (Kanban Flow)
- **Stack**: React + Vite (Frontend) | Express.js + Node.js (Backend) | MongoDB + Mongoose (Database) | Socket.io (Real-Time) | Docker (DevOps)
- **Repository**: [github.com/Genzheta/Group_14_Fullstackdev](https://github.com/Genzheta/Group_14_Fullstackdev)

**Key features built:**
- 🗂️ Kanban board with drag-and-drop task management
- 🔐 JWT authentication (register, login, protected routes)
- 👑 Role-based access control (admin vs member)
- ⚡ Real-time updates via Socket.io (task moves broadcast live to all connected clients)
- 🔁 Concurrent edit detection — `HTTP 409 Conflict` returned on version mismatch
- 💾 Client-side persistence (localStorage) for tokens and draft task data
- 🧪 Automated test suite (28 frontend + 107 backend tests)
- 🚀 CI/CD with GitHub Actions + Docker Compose deployment

A progressively built full-stack Kanban application — developed milestone-by-milestone as part of the Group 14 Full Stack Web Development project.

---

## 2. Project Goals

* 🎯 **Streamlined Task Management**: Intuitive visual Kanban columns with smooth drag/drop and action triggers for task status transitions.
* 🔐 **Robust Security & Auth**: Full JWT authentication pipeline, password hashing with Bcrypt, and frontend route protection to prevent unauthorized access.
* 🛡️ **Role-Based Access Control (RBAC)**: Differentiated permissions (`admin` vs `member`) for board management and restricted administrative actions.
* ⚡ **Real-Time Collaboration**: Socket.io keeps all connected clients in sync — task moves, creates, and deletes are broadcast live.
* 🔁 **Concurrent Edit Safety**: Mongoose `__v` version key detects conflicting simultaneous edits and returns `HTTP 409 Conflict`.

---

## 3. Technologies Used

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI component library |
| Vite | 5.3.4 | Build tool & dev server |
| React Router DOM | 7.18.3 | Client-side routing |
| Axios | 1.20.0 | HTTP client with interceptors |
| Zod | 4.5.4 | Schema validation |
| Socket.io-client | — | Real-time WebSocket connection |
| Vitest + RTL | — | Frontend unit testing |
| MSW | 2.x | API mocking for tests |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | ≥18 | Server runtime |
| Express.js | 5.2.1 | Web framework (REST API) |
| MongoDB | — | NoSQL database |
| Mongoose | 9.9.4 | MongoDB ODM |
| jsonwebtoken | 9.0.3 | JWT auth tokens |
| bcryptjs | 3.0.3 | Password hashing |
| Socket.io | — | Real-time WebSocket server |
| express-rate-limit | 8.7.0 | API rate limiting |
| Jest + Supertest | — | Backend testing |

### DevOps & Tools
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Container orchestration |
| Nginx | Frontend static server + reverse proxy |
| GitHub Actions | Automated CI/CD pipeline |
| Git (Feature Branch Workflow) | Version control |
| Postman | API testing (`backend/docs/SyncBoard_API.postman_collection.json`) |

---

# 4. Milestone 1 – Static Frontend

## 4.1 M1 Overview
* **Purpose**: Build the foundational React user interface, component layout, and mock data flow.
* **What Was Developed**: A responsive single-page Kanban board with three task status columns (*To Do*, *Doing*, *Done*), header, footer, navigation bar, side panel, and interactive task movement placeholders.

## 4.2 M1 Features
* 📊 **Kanban Board Layout**: Core grid layout displaying task status columns.
* 📝 **Task Columns**: Dedicated containers for *To Do*, *Doing*, and *Done* tasks.
* 🎴 **Task Cards**: Component rendering title, description, priority badge, tags, and assigned member.
* 🔝 **Header & Footer**: App branding, user profile indicator, and navigation links.
* 🗂️ **Side Panel**: Member directory, activity history log, and calendar widget.
* ⚙️ **Task Movement & Actions**: Buttons and handlers for updating task status between columns.

## 4.3 M1 Frontend Structure
```text
src/
├── components/
│   ├── Column.jsx             # Task Kanban Column container
│   ├── CreateTaskModal.jsx    # Modal for creating new tasks
│   ├── Footer.jsx             # Footer component
│   ├── Header.jsx             # Top navigation header
│   ├── SidePanel.jsx          # Sidebar with members, history & calendar
│   ├── SkeletonCard.jsx       # Loading state skeleton
│   └── TaskCard.jsx           # Individual task item card
├── data/
│   └── mockTasks.js           # Sample task dataset
├── pages/
│   └── HomePage.jsx           # Main Kanban board page view
├── App.css                    # Design tokens & styles
├── App.jsx                    # Root App component
└── main.jsx                   # React DOM entry point
```

---

# 5. Milestone 2 – Working REST API & Layered Backend

## 5.1 M2 Overview
* **Purpose**: Build the Express REST API backend with layered architecture, implement JWT authentication & authorization, handle validation/error middleware, connect MongoDB via Mongoose, and connect the React frontend to the backend endpoints.
* **What Was Developed**: REST API endpoints, JWT token service, route guard wrappers, automatic 401/403 API response interceptors, role-based authorization, rate limiting, and an auth testing toolbar.

## 5.2 M2 Features
* 🔑 **JWT User Authentication**: Registration, Login, JWT generation, decoding, and expiration validation.
* 🛡️ **Protected React Routes**: Route guards restricting unauthenticated access to the Kanban board (`ProtectedRoute.jsx`).
* ⚡ **Automatic 401/403 Interception**: Global API interceptor (`apiClient.js`) that catches expired tokens and triggers automatic session cleanup with user notifications.
* 👑 **Role-Based Access Control (RBAC)**: Restricts specific views and actions based on user role (`admin` vs `member`).
* 🚨 **Centralized Error Handling & Middleware**: Standardized custom `AppError` payload, rate limiting middleware, validation middleware, and global error handling middleware.
* 🧪 **Member 6 Auth Testing Toolbar**: Test panel on `/login` to simulate valid member/admin tokens, expired tokens, and corrupted tokens.

## 5.3 Backend Layered Architecture
```text
backend/
├── config/                    # Database & JWT configuration settings
├── controllers/
│   ├── authController.js      # Register & Login HTTP controller logic
│   └── taskController.js      # Task CRUD HTTP controller handlers
├── docs/
│   └── SyncBoard_API.postman_collection.json  # Postman API tests & endpoints
├── middleware/
│   ├── authMiddleware.js      # JWT & Role authorization middleware
│   ├── errorMiddleware.js     # Centralized error handler
│   ├── rateLimiter.js         # API rate limiting middleware
│   └── validationMiddleware.js# Request body validation middleware
├── models/
│   └── User.js                # Mongoose User model & password hashing hooks
├── repositories/
│   └── taskRepository.js      # Task data access repository layer
├── routes/
│   ├── authRoutes.js          # /api/auth routes
│   └── taskRoutes.js          # /api/tasks routes
├── services/
│   └── taskService.js         # Business logic layer for task workflows
├── utils/
│   ├── AppError.js            # Operational custom error class
│   └── generateToken.js       # JWT signing utility
├── .env.example               # Environment variables template
└── server.js                  # Express app entry point with DNS & DB connection logic
```

## 5.4 API Endpoints

### Health Check
* `GET /` — API health check endpoint (`{ message: "API is running..." }`)

### Authentication (`/api/auth`)
* `POST /api/auth/register` — Register a new user (`name`, `email`, `password`, `role`)
* `POST /api/auth/login` — Login user & return JWT token + user profile

### Tasks — Protected Endpoints (`/api/tasks`)
* `GET /api/tasks` — Fetch all tasks for logged-in user / board
* `POST /api/tasks` — Create a new task (`title`, `description`, `status`, `priority`, `assignee`)
* `GET /api/tasks/:id` — Retrieve task details by ID
* `PUT /api/tasks/:id` — Update task by ID
* `DELETE /api/tasks/:id` — Delete task by ID

## 5.5 Authentication & Authorization
* **JWT Tokens**: Signed tokens stored in `localStorage` and sent via `Authorization: Bearer <token>` headers.
* **Password Hashing**: Passwords hashed securely using `bcryptjs` with salt rounds.
* **Auth Middleware**: `protect` middleware verifies JWT token signature and attaches user context (`req.user`); `authorize(...roles)` enforces role permissions.
* **Frontend Guards**: `ProtectedRoute.jsx` checks auth state and user roles before rendering protected views.

## 5.6 Error Handling & Middleware Pipeline
* **Custom Operational Errors**: Managed via `AppError.js` with status code and error message propagation.
* **Global Error Middleware**: Catches unhandled routes, validation errors, and database connection issues.
* **Standardized JSON Response**: `{ success: false, message: "..." }`
* **HTTP Status Codes**: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `429 Too Many Requests`, `500 Internal Server Error`.

## 5.7 Frontend–Backend Integration Layer
* `tokenService.js`: Utility for saving, decoding, and checking expiration of JWTs in `localStorage`.
* `apiClient.js` & `api.js`: Axios / Fetch HTTP service wrappers with automatic Bearer token injection and 401/403 response interceptors.
* `AuthContext.jsx`: React Context managing global state (`isAuthenticated`, `user`, `login()`, `logout()`, `hasRole()`).
* `ProtectedRoute.jsx`: Component guard securing `/`, `/dashboard`, and `/admin` routes.

---

# 6. How to Run

> **Prerequisite tools**: [Git](https://git-scm.com/), [Node.js v18+](https://nodejs.org/), [npm v9+](https://www.npmjs.com/)

### Step 0 — Clone the Repository

```bash
git clone https://github.com/Genzheta/Group_14_Fullstackdev.git
cd Group_14_Fullstackdev
```

---

### ⭐ Option A — Docker Compose (Recommended — Easiest)

> **Additional requirement**: [Docker Desktop](https://www.docker.com/products/docker-desktop/) must be installed and running.

This single command starts **MongoDB**, the **Express backend**, and the **React frontend** (served via Nginx) all at once. No manual environment setup needed.

```bash
# From the project root directory:
docker compose up --build
```

| Service | URL |
|---|---|
| 🌐 Frontend (React via Nginx) | http://localhost:80 |
| ⚙️  Backend API | http://localhost:5000 |
| 🗄️  MongoDB | mongodb://localhost:27017 |

To stop all services:
```bash
docker compose down
```

To stop and remove all data volumes:
```bash
docker compose down -v
```

---

### 🔧 Option B — Local Manual Setup

Run the backend and frontend separately in development mode.

#### Step 1 — Setup & Start the Backend

```bash
# Navigate to the backend folder
cd backend

# Install backend dependencies
npm install

# Create your environment file (copy from the template)
cp .env.example .env
```

Edit `backend/.env` and fill in your values:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/syncboard
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
```

> **MongoDB**: You need a running MongoDB instance. Either:
> - Install [MongoDB Community](https://www.mongodb.com/try/download/community) locally, **or**
> - Use a free [MongoDB Atlas](https://www.mongodb.com/atlas/database) cluster and paste your Atlas SRV connection string as `MONGO_URI`.

```bash
# Start the backend development server (with nodemon auto-reload)
npm run dev
```

The backend will start at **http://localhost:5000**
Verify it is running: http://localhost:5000 should return `{ "message": "API is running..." }`

#### Step 2 — Setup & Start the Frontend

Open a **new terminal window**, then from the project root:

```bash
# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend will start at **http://localhost:5173**

#### Step 3 — Register & Login

1. Go to **http://localhost:5173**
2. Click **Register** and create a new account
3. Login with your credentials to access the Kanban board

#### Other Frontend Commands

```bash
npm run build      # Build production bundle
npm run preview    # Preview production build locally
```

---

### 🧪 Option C — Run Tests Only

You do **not** need a running MongoDB instance to run the automated test suites.

#### Frontend Tests (Vitest + React Testing Library)

```bash
# From the project root:
npm test
```

Expected output: **28 tests passing** across 8 test suites.

To run with coverage report:
```bash
npm run test:coverage
```

#### Backend Tests (Jest + Supertest)

```bash
# From the backend directory:
cd backend
npm test
```

Expected output: **107 tests passing** across auth, board, task, concurrency, and middleware suites.

---

### 🔬 Quick Reference — All Commands

| Command | Directory | What it runs |
|---|---|---|
| `npm test` | Root | Frontend Vitest unit tests (28 tests) |
| `npm run test:coverage` | Root | Frontend tests with coverage report |
| `npm test` | `backend/` | Backend Jest + Supertest tests (107 tests) |
| `docker compose up --build` | Root | Full stack with Docker (all services) |
| `npm run build` | Root | Production frontend build |

---

# 7. Complete Project Structure

```text
Group_14_Fullstackdev-upload/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js          # Authentication controller
│   │   └── taskController.js          # Task CRUD controller
│   ├── docs/
│   │   └── SyncBoard_API.postman_collection.json # API Postman collection
│   ├── middleware/
│   │   ├── authMiddleware.js          # JWT & Role authorization middleware
│   │   ├── errorMiddleware.js         # Centralized error handling
│   │   ├── rateLimiter.js             # API rate limiter middleware
│   │   └── validationMiddleware.js    # Body validation middleware
│   ├── models/
│   │   └── User.js                    # User Mongoose model
│   ├── repositories/
│   │   └── taskRepository.js          # Task repository data access layer
│   ├── routes/
│   │   ├── authRoutes.js              # Auth endpoints (/api/auth)
│   │   └── taskRoutes.js              # Task endpoints (/api/tasks)
│   ├── services/
│   │   └── taskService.js             # Task business logic layer
│   ├── utils/
│   │   ├── AppError.js                # Custom operational error class
│   │   └── generateToken.js           # JWT token generator
│   ├── .env.example                   # Backend environment template
│   ├── package.json                   # Backend dependencies & scripts
│   └── server.js                      # Express server entry point
├── dist/                              # Production build output
├── src/
│   ├── components/                    # React UI Components
│   │   ├── Column.jsx                 # Kanban column container
│   │   ├── CreateTaskModal.jsx        # Task creation modal
│   │   ├── Footer.jsx                 # Footer component
│   │   ├── Header.jsx                 # Header & user menu
│   │   ├── ProtectedRoute.jsx         # Route Guard & RBAC component
│   │   ├── SidePanel.jsx              # Sidebar, member list & calendar
│   │   ├── SkeletonCard.jsx           # Task card skeleton loading state
│   │   └── TaskCard.jsx               # Task card item component
│   ├── context/
│   │   └── AuthContext.jsx            # React Auth Context & State Provider
│   ├── data/
│   │   └── mockTasks.js               # Initial mock task data
│   ├── pages/
│   │   ├── HomePage.jsx               # Kanban board view
│   │   ├── LoginPage.jsx              # Login page & Auth testing toolbar
│   │   └── RegisterPage.jsx           # User registration page
│   ├── services/
│   │   ├── api.js                     # Centralized API service methods
│   │   ├── apiClient.js               # Fetch wrapper with interceptors
│   │   ├── mockJwt.js                 # Mock JWT token helper for testing
│   │   └── tokenService.js            # Token decode & storage helper
│   ├── App.css                        # Global CSS & Glassmorphism styles
│   ├── App.jsx                        # Root React Router layout
│   └── main.jsx                       # Application entry point
├── index.html                         # Base HTML template
├── package.json                       # Frontend dependencies & scripts
├── vite.config.js                     # Vite configuration file
└── README.md                          # Project documentation
```

---

## M3, M4 & M5 Testing
* **Frontend Unit Tests (Vitest + React Testing Library)**: 8 test suites, **28 tests passing (100%)**.
* **Backend Unit & Integration Tests (Jest + Supertest + Node Test)**: **107 total tests passing (100%)** across auth, board, task, concurrency, and authorization middleware.
* **CI/CD Pipeline**: GitHub Actions workflow (`.github/workflows/ci.yml`) configured for strict automated test verification on every push.
* **Docker Compose**: Orchestration verified for local multi-service execution (`docker-compose up --build`).
* **Production Build Test**: Executed `npm run build` — **Built successfully with 0 errors**.

---

# 9. Git & GitHub Workflow

* **Repository**: Central GitHub repository for Group 14 (`Group_14_Fullstackdev`).
* **Branch Strategy**: Feature branch workflow where each member works on assigned feature branches before creating Pull Requests into `main`.
* **Commit Conventions**: Descriptive commit messages referencing feature scope (`feat: add ProtectedRoute guard`, `fix: test suite and CI pipeline setup`).
* **Pull Requests & Reviews**: Peer review before merging feature branches into `main`.

---

# 10. Team Members & Allocations

| Member | Student Name | GitHub Handle | Phase 1 Role & Feature Branch | Phase 2 Role & Feature Branch |
| :--- | :--- | :--- | :--- | :--- |
| **Member 1** | Desandu | [`@desanduhas`](https://github.com/desanduhas) | Board & CSS Layout<br>`feature/Login-page-and-Home-screen-UI-by-desanduhas` | API Integration Service Layer<br>`feature/api-integration_by_desandu` |
| **Member 2** | Lochana | [`@rmlkloch`](https://github.com/rmlkloch) | TaskCard Component Designer<br>`feature/task-card-details-by-Lochana` | Backend API & Controllers<br>`feature/backend-api-by-Lochana` |
| **Member 3** | Pooja | [`@psbasnayaka`](https://github.com/psbasnayaka) | State & Mock Data Architect<br>`feature/mock-data-and-state-by-Pooja` | Backend Auth & Security (Bcrypt/JWT)<br>`feature/backend-auth-by-pooja` |
| **Member 4** | Bihansa | [`@Genzheta`](https://github.com/Genzheta) | Interactive Task Flows & Drag/Drop<br>`feature/task-drag-drop-by-bihansa` | Protected Frontend & Authorization<br>`feature/protected-frontend_by_bihansa` |
| **Member 5** | Daham | [`@dahmmarkx-bravo1`](https://github.com/dahmmarkx-bravo1) | Header, Footer & Navigation<br>`feature/header-footer-navigation-by-Daham` | Frontend Auth & Docker Compose<br>`feature/frontend-auth` |
| **Member 6** | Nawoda | [`@DevOpsNNK`](https://github.com/DevOpsNNK) | Side Panel, History & Calendar<br>`feature/side-panel-history-calander-by-Nawoda` | Error Handling Middleware & Docs<br>`feature/error-handling-docs` |

---

# 11. Milestone Progress (Complete Summary)

## M1 – Static Frontend (2 Aug)
* [x] Scaffold React App with Vite
* [x] Kanban Board Layout & Columns (*To Do*, *Doing*, *Done*)
* [x] Reusable UI Components (TaskCard, Column, CreateTaskModal, Header, Footer, SidePanel)
* [x] Interactive Task Movement Handlers & Drag/Drop

## M2 – Working REST API & Backend (9 Aug)
* [x] Layered Express Architecture (Controllers, Services, Repositories, Models)
* [x] RESTful CRUD Endpoints (`/api/auth`, `/api/tasks`, `/api/boards`)
* [x] JWT Authentication & Password Hashing with Bcrypt
* [x] Protected Frontend Routes (`ProtectedRoute.jsx`) & RBAC Guards (`admin` vs `member`)

## M3 – Persistence & Offline Support (16 Aug)
* [x] MongoDB & Mongoose ODM Models (`User`, `Task`, `Board`, `Activity`)
* [x] Multi-Strategy DB Connection Logic & Google DNS Fallback
* [x] LocalStorage JWT Token Persistence & Client State Caching
* [x] Offline Draft Detection — localStorage caches in-progress task edits
* [x] Concurrent Edit Detection — Mongoose `__v` version key → `HTTP 409 Conflict`

## M4 – Test Suite & CI Pipeline (23 Aug)
* [x] Client Unit Tests (Vitest + RTL — 28 tests passing)
* [x] Server Unit & Integration Tests (Jest + Supertest + Node test — 107 tests passing)
* [x] GitHub Actions Automated CI Pipeline (`.github/workflows/ci.yml`)

## M5 – Real-Time Sync, DevOps & Launch (30 Aug)
* [x] Socket.io Real-Time Synchronization & JWT Handshake Auth
* [x] Optimistic Concurrency Locking with Mongoose `__v` (`HTTP 409 Conflict`)
* [x] Docker Containerization & Multi-Container Setup (`docker-compose.yml`)
* [x] Nginx Frontend Web Server & Reverse Proxy Configuration

---

# 12. Project Plans

For full details on our project planning, milestone task allocations per member, and a summary of all planned vs built features, see:

📄 **[plans & group members.md](./plans%20%26%20group%20members.md)**

This document contains:
- Full group member list with GitHub handles
- Pre-development plans for each milestone
- Per-member task allocations and feature branches
- Planned vs built feature comparison table

