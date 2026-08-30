# 📋 SyncBoard — Fullstack Task Management Application

A modern, collaborative Kanban Task Management web application built with **React**, **Vite**, **Express**, **MongoDB**, and **JWT Authentication**. Designed for agile team workflow tracking, task categorization, and protected authorization across multiple development milestones.

---

## 1. Project Overview

* **Project Name**: SyncBoard (Kanban Flow)
* **Description**: SyncBoard is an interactive, fullstack Kanban-style task management web application designed to help agile software engineering teams organize, track, and manage project workflows efficiently.
* **Purpose**: Provides a central dashboard for team members to create tasks, organize them across status columns (*To Do*, *Doing*, *Done*), assign priorities, and restrict board access using secure authentication and role-based permissions.
* **Main Problem Solved**: Eliminates disorganized task tracking and insecure workflow access by providing a real-time, responsive Kanban board protected by JWT authentication, role guards, and structured REST API endpoints backed by a layered Express architecture and MongoDB persistence.

---

## 2. Project Goals

* 🎯 **Streamlined Task Management**: Intuitive visual Kanban columns with smooth drag/drop and action triggers for task status transitions.
* 🔐 **Robust Security & Auth**: Full JWT authentication pipeline, password hashing with Bcrypt, and frontend route protection to prevent unauthorized access.
* 🛡️ **Role-Based Access Control (RBAC)**: Differentiated permissions (`admin` vs `member`) for board management and restricted administrative actions.
* ⚡ **Seamless Integration & Layered Backend**: Clean separation of frontend service layers and backend layered architecture (Controllers, Services, Repositories, Middleware) with centralized error handling and rate limiting.

---

## 3. Technologies Used

### Frontend
* **Core Library**: React 18.3.1
* **Build Tool & Server**: Vite 5.3.4
* **Routing**: React Router DOM 7.18.3
* **HTTP Client**: Axios 1.20.0 & Custom Fetch Service Layer (`apiClient.js`, `api.js`)
* **Validation**: Zod 4.5.4 & Prop-Types 15.8.1
* **State & Auth**: React Context API (`AuthContext`), LocalStorage Persistence
* **Styling**: Vanilla CSS3 (Custom Glassmorphism design tokens, Flexbox & Grid layouts)

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js 5.2.1
* **API Architecture**: RESTful Layered Architecture (Controllers -> Services -> Repositories -> Models)
* **Authentication & Security**: JSON Web Tokens (`jsonwebtoken` 9.0.3), Bcrypt Password Hashing (`bcryptjs` 3.0.3), Rate Limiting (`express-rate-limit` 8.7.0), CORS 2.8.6
* **Environment Config**: Dotenv 17.4.2

### Database
* **Database**: MongoDB / Mongoose ODM 9.9.4
* **Connection Logic**: Multi-strategy connection with SRV Atlas support, direct replica set fallback, local MongoDB fallback, and Google DNS fallback (`8.8.8.8`).

### Development Tools
* **Version Control**: Git & GitHub (Feature branch workflow)
* **API Testing**: Postman Collection (`backend/docs/SyncBoard_API.postman_collection.json`) & Integrated Frontend Auth Testing Toolbar
* **IDE**: VS Code / Antigravity IDE

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

# 6. Installation & Setup

## 6.1 Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **Git**: Installed on local system
* **MongoDB**: Local instance or MongoDB Atlas account

## 6.2 Clone Repository
```bash
git clone https://github.com/Genzheta/Group_14_Fullstackdev.git
cd Group_14_Fullstackdev-upload
```

## 6.3 Setup & Run Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in `backend/` (refer to `backend/.env.example`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/syncboard
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   ```

4. Start the backend server:
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

## 6.4 Setup & Run Frontend

1. From the project root (`Group_14_Fullstackdev-upload`):
   ```bash
   npm install
   ```

2. Start Vite development server:
   ```bash
   npm run dev
   ```

3. Build production bundle:
   ```bash
   npm run build
   ```

4. Preview production build locally:
   ```bash
   npm run preview
   ```

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

# 8. Testing & Verification

## M1 Testing
* **Component Rendering**: Verified rendering of `Board`, `Column`, `TaskCard`, `Header`, `Footer`, `SidePanel`.
* **Task Movement**: Verified task state transitions between *To Do*, *Doing*, and *Done* columns.
* **Layout Responsiveness**: Tested Flexbox/Grid responsive behavior across mobile, tablet, and desktop views.

## M2 Testing
* **JWT Auth Testing**: Tested token storage, base64 payload decoding, and `exp` expiration validation.
* **Route Protection**: Tested blocking unauthenticated visitors from accessing `/` or `/dashboard`.
* **401/403 Interception**: Tested automatic session purge and alert banner display on 401/403 API responses.
* **Role-Based Authorization**: Tested restriction of `/admin` route for standard members vs admin users.
* **Member 6 Auth Testing Toolbar**: Built-in test toolbar on `/login` to simulate:
  * 🟢 **Valid Member JWT**
  * 🔵 **Valid Admin JWT**
  * 🟡 **Test Expired JWT**
  * 🔴 **Test Invalid JWT**
* **Production Build Test**: Executed `npm run build` — **Built successfully with 0 errors**.

---

# 9. Git & GitHub Workflow

* **Repository**: Central GitHub repository for Group 14 (`Group_14_Fullstackdev`).
* **Branch Strategy**: Feature branch workflow where each member works on assigned feature branches before creating Pull Requests.
* **Commit Conventions**: Descriptive commit messages referencing feature scope (`feat: add ProtectedRoute guard`, `fix: token expiration timestamp check`).
* **Pull Requests & Reviews**: Peer review before merging feature branches into `main`.

---

# 10. Team Members & Allocations

| Member | Student Name | GitHub Handle | Phase 1 Role & Feature Branch | Phase 2 Role & Feature Branch |
| :--- | :--- | :--- | :--- | :--- |
| **Member 1** | Desandu | [`@desanduhas`](https://github.com/desanduhas) | Board & CSS Layout<br>`feature/Login-page-and-Home-screen-UI-by-desanduhas` | API Integration Service Layer<br>`feature/api-integration_by_desandu` |
| **Member 2** | Lochana | [`@rmlkloch`](https://github.com/rmlkloch) | TaskCard Component Designer<br>`feature/task-card-details-by-Lochana` | Backend API & Controllers<br>`feature/backend-api-by-Lochana` |
| **Member 3** | Pooja | [`@psbasnayaka`](https://github.com/psbasnayaka) | State & Mock Data Architect<br>`feature/mock-data-and-state-by-Pooja` | Backend Auth & Security (Bcrypt/JWT)<br>`feature/backend-auth-by-pooja` |
| **Member 4** | Bihansa | [`@Genzheta`](https://github.com/Genzheta) | Interactive Task Flows & Drag/Drop<br>`feature/task-drag-drop-by-bihansa` | Protected Frontend & Authorization<br>`feature/protected-frontend_by_bihansa` |
| **Member 5** | Daham | [`@dahmmarkx-bravo1`](https://github.com/dahmmarkx-bravo1) | Header, Footer & Navigation<br>`feature/header-footer-navigation-by-Daham` | Frontend Auth (Login/Register Forms)<br>`feature/frontend-auth` |
| **Member 6** | Nawoda | [`@DevOpsNNK`](https://github.com/DevOpsNNK) | Side Panel, History & Calendar<br>`feature/side-panel-history-calander-by-Nawoda` | Error Handling Middleware & Docs<br>`feature/error-handling-docs` |

---

# 11. Milestone Progress

## M1 – Static Frontend
* [x] Board completed
* [x] Columns completed (*To Do*, *Doing*, *Done*)
* [x] Task cards completed
* [x] Mock data structure completed
* [x] State management completed
* [x] Task movement completed
* [x] Header / Footer completed
* [x] Side Panel completed
* [x] History / Calendar components completed

## M2 – Working REST API & Backend
* [x] Express server structure completed (`server.js`)
* [x] Layered Architecture implemented (Controllers, Services, Repositories, Models)
* [x] REST endpoints completed (`/api/auth`, `/api/tasks`)
* [x] CRUD operations completed
* [x] JWT Authentication completed
* [x] Role Authorization completed (`hasRole`, RBAC)
* [x] Protected frontend routes completed (`ProtectedRoute.jsx`)
* [x] Request validation & rate limiting middleware completed
* [x] Error handling & 401/403 interceptor completed
* [x] Frontend / API integration service layer completed (`apiClient.js`, `api.js`)
* [x] MongoDB / Mongoose connection with DNS fallback completed
* [x] Testing & build verification completed (`npm run build` - 0 errors)

---

# 12. Future Milestones

* 🗄️ **Milestone 3 — Database & Cloud Persistence**: Complete production deployment of MongoDB Atlas instance with replica set optimization.
* ⚡ **Milestone 4 — Advanced Features & Real-Time Sync**: Implement Socket.io / WebSockets for live multi-user board updates and real-time drag-and-drop task movements.
* 🚀 **Milestone 5 — Final Testing, Cloud Deployment & Docs**: End-to-end integration testing, Docker containerization, cloud deployment (Render / Vercel), and final project showcase documentation.
