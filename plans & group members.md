# 📋 Group 14 — Project Plans & Group Members

> **Course**: Full Stack Web Development
> **Project**: SyncBoard — A Progressively Built Full-Stack Kanban Application
> **Group**: Group 14

---

## 👥 Group Members

| # | Student Name | GitHub Handle | Primary Role |
|---|---|---|---|
| Member 1 | Desandu | [@desanduhas](https://github.com/desanduhas) | Frontend UI & API Integration |
| Member 2 | Lochana | [@rmlkloch](https://github.com/rmlkloch) | Task Components & Backend API |
| Member 3 | Pooja | [@psbasnayaka](https://github.com/psbasnayaka) | State Management & Backend Auth |
| Member 4 | Bihansa | [@Genzheta](https://github.com/Genzheta) | Task Flows, Drag-Drop & Protected Routes |
| Member 5 | Daham | [@dahmmarkx-bravo1](https://github.com/dahmmarkx-bravo1) | Header/Footer, Navigation & Docker |
| Member 6 | Nawoda | [@DevOpsNNK](https://github.com/DevOpsNNK) | Side Panel, Error Handling & CI Pipeline |

---

## 🗓️ Project Plan by Milestone

### Milestone 1 — Static Frontend (Due: 2 Aug)

**Goal**: Build a working static React frontend with mock data. No backend required yet.

**Plan**:
- Scaffold the React + Vite project and define the folder structure
- Design the Kanban board layout with three columns: *To Do*, *Doing*, *Done*
- Build reusable components: `TaskCard`, `Column`, `Header`, `Footer`, `SidePanel`, `CreateTaskModal`
- Use mock data (`mockTasks.js`) to populate the board
- Implement basic task movement handlers (move task between columns)
- Add drag-and-drop interaction for task cards
- Style the application with Vanilla CSS (glassmorphism design)

**Task Allocation — Milestone 1**:

| Member | Assigned Feature | Branch |
|---|---|---|
| Desandu (M1) | Home screen UI layout & Login page design | `feature/Login-page-and-Home-screen-UI-by-desanduhas` |
| Lochana (M2) | TaskCard component with details, priority & tags | `feature/task-card-details-by-Lochana` |
| Pooja (M3) | Mock data setup & global state management | `feature/mock-data-and-state-by-Pooja` |
| Bihansa (M4) | Interactive task flows & drag-drop functionality | `feature/task-drag-drop-by-bihansa` |
| Daham (M5) | Header, Footer & navigation components | `feature/header-footer-navigation-by-Daham` |
| Nawoda (M6) | Side panel, member history & calendar widget | `feature/side-panel-history-calander-by-Nawoda` |

---

### Milestone 2 — Working REST API & Backend (Due: 9 Aug)

**Goal**: Replace mock data with a real Express REST API backed by MongoDB, and add JWT authentication.

**Plan**:
- Build a layered Express backend: Controllers → Services → Repositories → Models
- Create MongoDB/Mongoose models: `User`, `Task`, `Board`, `Activity`
- Implement JWT authentication: Register, Login, token generation & validation
- Add middleware: Auth guard (`protect`), Role guard (`authorize`), rate limiting, error handling
- Build REST API endpoints for `/api/auth` and `/api/tasks`
- Connect React frontend to backend using Axios service layer (`apiClient.js`, `api.js`)
- Implement `ProtectedRoute.jsx` to guard frontend routes
- Add Role-Based Access Control (admin vs member)

**Task Allocation — Milestone 2**:

| Member | Assigned Feature | Branch |
|---|---|---|
| Desandu (M1) | API Integration service layer (Axios + interceptors) | `feature/api-integration_by_desandu` |
| Lochana (M2) | Backend API controllers & routes (tasks, boards) | `feature/backend-api-by-Lochana` |
| Pooja (M3) | Backend authentication, JWT & Bcrypt password hashing | `feature/backend-auth-by-pooja` |
| Bihansa (M4) | Protected frontend routes & RBAC authorization | `feature/protected-frontend_by_bihansa` |
| Daham (M5) | Frontend auth pages (Login/Register) & Docker Compose | `feature/frontend-auth-by-Daham` |
| Nawoda (M6) | Error handling middleware & API documentation | `feature/error-handling-docs-by-nawoda` |

---

### Milestone 3 — Persistence & Offline Support (Due: 16 Aug)

**Goal**: Add full MongoDB persistence, client-side offline support, and concurrent edit detection.

**Plan**:
- Finalise all Mongoose models (`User`, `Task`, `Board`, `Activity`) with full schema validation
- Implement client-side `localStorage` persistence for JWT tokens and draft task data
- Add offline draft saving so in-progress work survives a page refresh
- Implement **optimistic concurrency control** using Mongoose `__v` (version key) to detect conflicting simultaneous edits and return `HTTP 409 Conflict`
- Add MongoDB Atlas production connection with DNS fallback strategies
- Implement database performance optimisations (indexing)

**Task Allocation — Milestone 3**:

| Member | Assigned Feature | Branch |
|---|---|---|
| Desandu (M1) | Frontend API integration with real backend data | `feature/frontend-api-integration` |
| Lochana (M2) | MongoDB performance optimisation & indexing | `feature/mongodb-performance-by-Lochana` |
| Pooja (M3) | Persistent API layer & offline state caching | `feature/persistent-api-by-pooja` |
| Bihansa (M4) | MongoDB models (User, Task, Board, Activity) | `feature/mongodb-models-by-bihansa` |
| Daham (M5) | Validation & concurrency conflict detection (409) | `feature/validation-concurrency-by-Daham` |
| Nawoda (M6) | Database infrastructure & MongoDB connection config | `feature/database-infrastructure-by-nawoda` |

---

### Milestone 4 — Test Suite & CI Pipeline (Due: 23 Aug)

**Goal**: Write comprehensive automated tests for both frontend and backend; set up GitHub Actions CI.

**Plan**:
- Write frontend unit tests with **Vitest + React Testing Library** for all key components
- Write backend unit & integration tests with **Jest + Supertest** for all API routes and middleware
- Configure a **GitHub Actions CI pipeline** that runs all tests on every push to any branch
- Set up MSW (Mock Service Worker) for frontend API mocking in tests
- Aim for meaningful test coverage across components, routes, auth, and models

**Task Allocation — Milestone 4**:

| Member | Assigned Feature | Branch |
|---|---|---|
| Desandu (M1) | — (covered by Lochana for frontend M4 testing) | — |
| Lochana (M2) | Frontend component tests (Vitest + RTL) | `feature/m4-testing-frontend-by-Lochana` |
| Pooja (M3) | Backend API route tests (Jest + Supertest) | `feature/m4-testing-api-by-pooja` |
| Bihansa (M4) | Backend board integration tests | `feature/m4-testing-boards-by-bihansa` |
| Daham (M5) | Backend task & auth middleware tests | `feature/m4-testing-tasks-by-Daham` |
| Nawoda (M6) | CI pipeline setup & backend auth tests | `feature/m4-ci-pipeline-by-nawoda` |

---

### Milestone 5 — Real-Time Sync, DevOps & Launch (Due: 30 Aug)

**Goal**: Add Socket.io real-time synchronisation, containerise with Docker, and deploy to production.

**Plan**:
- Integrate **Socket.io** for real-time board updates between connected clients (task moves, creates, deletes broadcast live)
- Implement JWT authentication handshake for Socket.io connections
- Set up **Docker** with a multi-container `docker-compose.yml` (frontend, backend, MongoDB)
- Configure **Nginx** as a reverse proxy and static frontend web server
- Deploy the application to a production environment (cloud host)
- Add real-time event handlers on the frontend using custom hooks (`useBoardSocket`)

**Task Allocation — Milestone 5**:

| Member | Assigned Feature | Branch |
|---|---|---|
| Desandu (M1) | — (integration supported by existing API layer) | — |
| Lochana (M2) | Production deployment & Nginx configuration | `feature/production-deployment-by-Lochana` |
| Pooja (M3) | Real-time events & Socket.io server integration | `feature/realtime-events-by-pooja` |
| Bihansa (M4) | Frontend real-time Socket.io hook (`useBoardSocket`) | `feature/frontend-realtime-by-bihansa` |
| Daham (M5) | Real-time sync frontend handlers | `feature/realtime-sync-by-Daham` |
| Nawoda (M6) | Socket.io server setup & JWT socket auth | `feature/socketio-server-by-nawoda` |

---

## 📌 Summary of What Was Planned vs What Was Built

| Planned Feature | Built? | Notes |
|---|---|---|
| React + Vite Kanban Frontend | ✅ Yes | Full implementation with drag-drop, columns, modals |
| Mock Data for M1 | ✅ Yes | `mockTasks.js` used throughout M1 |
| Express REST API (layered architecture) | ✅ Yes | Controllers → Services → Repositories → Models |
| MongoDB + Mongoose ODM | ✅ Yes | User, Task, Board, Activity models |
| JWT Authentication | ✅ Yes | Register, Login, Bearer token, bcrypt hashing |
| Protected Frontend Routes (RBAC) | ✅ Yes | `ProtectedRoute.jsx`, admin vs member roles |
| Client-side localStorage Persistence | ✅ Yes | JWT tokens & auth state persisted in localStorage |
| Offline Draft Detection | ✅ Yes | Draft state caching via localStorage |
| Concurrent Edit Detection (409 Conflict) | ✅ Yes | Mongoose `__v` version key concurrency control |
| Frontend Tests (Vitest + RTL) | ✅ Yes | 8 test suites, 28 tests |
| Backend Tests (Jest + Supertest) | ✅ Yes | 107 tests across auth, board, task, middleware |
| GitHub Actions CI Pipeline | ✅ Yes | `.github/workflows/ci.yml` |
| Socket.io Real-Time Sync | ✅ Yes | Live board updates between connected clients |
| Docker Compose Containerisation | ✅ Yes | `docker-compose.yml` with frontend, backend & MongoDB |
| Nginx Reverse Proxy | ✅ Yes | `nginx.conf` configured |
| Feature Branch Git Workflow | ✅ Yes | Each member worked on their own branch with PRs |

---

*This document reflects the project planning discussions and task allocations made by Group 14 prior to and during development of SyncBoard.*
