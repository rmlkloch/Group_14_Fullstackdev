# 📋 SyncBoard — Fullstack Task Management Application

A modern, collaborative Kanban Task Management web application built with **React**, **Vite**, **Express**, and **JWT Authentication**. Designed for agile team workflow tracking, task categorization, and protected authorization across multiple development milestones.

---

## 1. Project Overview

* **Project Name**: SyncBoard (Kanban Flow)
* **Description**: SyncBoard is an interactive, fullstack Kanban-style task management web application designed to help agile software engineering teams organize, track, and manage project workflows efficiently.
* **Purpose**: Provides a central dashboard for team members to create tasks, organize them across status columns (*To Do*, *Doing*, *Done*), assign priorities, and restrict board access using secure authentication and role-based permissions.
* **Main Problem Solved**: Eliminates disorganized task tracking and insecure workflow access by providing a real-time, responsive Kanban board protected by JWT authentication, role guards, and structured REST API endpoints.

---

## 2. Project Goals

* 🎯 **Streamlined Task Management**: Intuitive visual Kanban columns with smooth drag/drop and action triggers for task transitions.
* 🔐 **Robust Security & Auth**: Full JWT authentication pipeline, password hashing, and frontend route protection to prevent unauthorized access.
* 🛡️ **Role-Based Access Control**: Differentiated permissions (`admin` vs `member`) for board management and restricted actions.
* ⚡ **Seamless Integration**: Clean separation of frontend service layers and backend REST API controllers with centralized error handling.

---

## 3. Technologies Used

### Frontend
* **Core Library**: React 18.3.1
* **Build Tool & Server**: Vite 5.3.4
* **Routing**: React Router DOM 6.x
* **State & Auth**: React Context API (`AuthContext`), LocalStorage Persistence
* **Styling**: Vanilla CSS3 (Custom Glassmorphism design tokens, Flexbox & Grid layouts)
* **HTTP Client**: Custom Fetch Service Layer (`apiClient.js`)

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **API Architecture**: RESTful API Design
* **Authentication & Security**: JSON Web Tokens (JWT), Bcrypt Password Hashing

### Database
* **Milestone 1 & 2**: Mock Data Structure & Local Storage Persistence
* **Milestone 3 Roadmap**: MongoDB / Mongoose ODM Integration

### Development Tools
* **Version Control**: Git & GitHub (Feature branch workflow)
* **API Testing**: Postman Collection & Integrated Frontend Auth Toolbar
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
* 🗂️ **Side Panel**: Member directory, activity history icon, and calendar widget.
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

## 4.4 M1 Components
* `Board`: Main workspace rendering columns and search/filter toolbars.
* `Column`: Renders list of task cards filtered by status (*To Do*, *Doing*, *Done*).
* `TaskCard`: Card displaying task details, priority tag, and status change controls.
* `Header`: Navigation bar with search input, notifications, and profile menu.
* `Footer`: Application copyright and status indicator.
* `SidePanel`: Sidebar containing team member list, history logs, and calendar.

## 4.5 M1 State & Mock Data
* `mockTasks.js`: Array of initial task objects containing `id`, `title`, `description`, `status`, `priority`, and `assignee`.
* `useState`: Manages local board state, modal visibility, search queries, and task column transitions.

---

# 5. Milestone 2 – Working REST API

## 5.1 M2 Overview
* **Purpose**: Build the Express REST API backend, implement JWT authentication & authorization, handle validation/errors, and connect the React frontend to the backend endpoints.
* **What Was Developed**: REST API endpoints, JWT token service, route guard wrappers, automatic 401/403 API response interceptors, role-based authorization, and an auth testing toolbar.

## 5.2 M2 Features
* 🔑 **JWT User Authentication**: Registration, Login, JWT generation, decoding, and expiration validation.
* 🛡️ **Protected React Routes**: Route guards restricting unauthenticated access to the Kanban board.
* ⚡ **Automatic 401/403 Interception**: Global API interceptor that catches expired tokens and triggers automatic logout with alert notifications.
* 👑 **Role-Based Access Control (RBAC)**: Restricts specific views and actions based on user role (`admin` vs `member`).
* 🚨 **Centralized Error Handling**: Standardized error responses, HTTP status codes, and input validation.
* 🧪 **Member 6 Auth Testing Toolbar**: Test panel on `/login` to simulate valid member/admin tokens, expired tokens, and corrupted tokens.

## 5.3 Backend Structure
```text
backend/
├── config/                    # DB & JWT configurations
├── controllers/
│   ├── authController.js      # Register & Login logic
│   └── taskController.js      # Task CRUD operations
├── middleware/
│   ├── authMiddleware.js      # JWT verification middleware
│   └── errorMiddleware.js     # Centralized error handler
├── models/
│   ├── User.js                # User schema
│   └── Task.js                # Task schema
├── routes/
│   ├── authRoutes.js          # /api/auth routes
│   └── taskRoutes.js          # /api/tasks routes
└── server.js                  # Express app entry point
```

## 5.4 API Endpoints

### Authentication
* `POST /api/auth/register` — Register a new user
* `POST /api/auth/login` — Login user & return JWT token

### Tasks (Protected Endpoints)
* `GET /api/tasks` — Get all tasks
* `POST /api/tasks` — Create a new task
* `GET /api/tasks/:id` — Get task by ID
* `PUT /api/tasks/:id` — Update task by ID
* `DELETE /api/tasks/:id` — Delete task by ID

## 5.5 Authentication & Authorization
* **JWT Tokens**: Signed tokens stored in `localStorage` and sent via `Authorization: Bearer <token>` headers.
* **Password Hashing**: Passwords hashed securely using Bcrypt.
* **Auth Middleware**: Server-side verification of incoming JWT tokens.
* **Frontend Guards**: `ProtectedRoute.jsx` checks auth status before rendering protected routes.

## 5.6 Validation & Error Handling
* **Input Validation**: Rejects missing fields, invalid emails, or short passwords.
* **Standardized Errors**: Consistent JSON error payload: `{ success: false, message: "..." }`.
* **HTTP Status Codes**: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Server Error`.

## 5.7 Frontend–Backend Integration
* `tokenService.js`: Utility for saving, decoding, and checking expiration of JWTs.
* `apiClient.js`: Custom fetch wrapper that injects auth headers and catches 401/403 responses.
* `AuthContext.jsx`: React Context managing global `isAuthenticated`, `user`, `login()`, `logout()`, and `hasRole()`.
* `ProtectedRoute.jsx`: Component guard securing `/`, `/dashboard`, and `/admin` routes.

---

# 6. Installation & Setup

## 6.1 Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **Git**: Installed on local system

## 6.2 Clone Repository
```bash
git clone https://github.com/Genzheta/Group_14_Fullstackdev.git
cd Group_14_Fullstackdev-main
```

## 6.3 Install Dependencies
```bash
npm install
```

## 6.4 Environment Variables
Create a `.env` file in the project root:
```text
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## 6.5 Run the Application
```bash
# Start Vite development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

# 7. Project Structure

```text
SyncBoard/
├── dist/                          # Production build output
├── public/                        # Static web assets
├── src/
│   ├── components/                # React UI Components
│   │   ├── Column.jsx             # Task Kanban Column container
│   │   ├── CreateTaskModal.jsx    # Modal for creating new tasks
│   │   ├── Footer.jsx             # Footer component
│   │   ├── Header.jsx             # Top navigation header
│   │   ├── ProtectedRoute.jsx     # Route Guard & Role Authorization component
│   │   ├── SidePanel.jsx          # Sidebar with members, history & calendar
│   │   ├── SkeletonCard.jsx       # Loading state skeleton
│   │   └── TaskCard.jsx           # Individual task item card
│   ├── context/
│   │   └── AuthContext.jsx        # Global Auth Context Provider & State
│   ├── data/
│   │   └── mockTasks.js           # Sample task dataset
│   ├── pages/
│   │   ├── HomePage.jsx           # Main Kanban board page view
│   │   └── LoginPage.jsx          # Login Page & Auth Testing Toolbar
│   ├── services/
│   │   ├── apiClient.js           # HTTP Fetch Wrapper with 401/403 Interceptor
│   │   ├── mockJwt.js             # Mock JWT Token Generator for testing
│   │   └── tokenService.js        # JWT Storage, Expiration & Header Utility
│   ├── App.css                    # Design tokens & styles
│   ├── App.jsx                    # Root App component & React Router Config
│   └── main.jsx                   # React DOM entry point & BrowserRouter
├── m1 plan.md                     # Phase 1 Task Allocation Plan
├── members.md                     # Group 14 Member Assignments & GitHub Branches
├── Member_6_Phase_2_Report.md     # Member 6 Accomplishments Report
├── Phase 2 Plan .docx             # Phase 2 Technical Architecture & Work Plan
├── package.json                   # Dependencies & Scripts
└── vite.config.js                 # Vite Configuration
```

---

# 8. Testing

## M1 Testing
* **Component Rendering**: Verified rendering of `Board`, `Column`, `TaskCard`, `Header`, `Footer`, `SidePanel`.
* **Task Movement**: Verified task state transitions between *To Do*, *Doing*, and *Done* columns.
* **Layout Responsiveness**: Tested Flexbox/Grid responsive behavior across mobile, tablet, and desktop views.

## M2 Testing
* **JWT Auth Testing**: Tested token storage, base64 payload decoding, and `exp` expiration validation.
* **Route Protection**: Tested blocking unauthenticated visitors from accessing `/` or `/dashboard`.
* **401/403 Interception**: Tested automatic session purge and alert banner display on 401/403 API responses.
* **Role-Based Authorization**: Tested restriction of `/admin` route for standard members.
* **Member 6 Auth Testing Toolbar**: Built-in test toolbar on `/login` to simulate:
  * 🟢 **Valid Member JWT**
  * 🔵 **Valid Admin JWT**
  * 🟡 **Test Expired JWT**
  * 🔴 **Test Invalid JWT**
* **Production Build Test**: Executed `npm run build` — **Built successfully with 0 errors**.

---

# 9. Git & GitHub Workflow

* **Repository**: Central GitHub repository for Group 14.
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

## M2 – Working REST API
* [x] Express server structure completed
* [x] REST endpoints completed (`/api/tasks`)
* [x] CRUD operations completed
* [x] JWT Authentication completed
* [x] Role Authorization completed (`hasRole`, RBAC)
* [x] Protected frontend routes completed (`ProtectedRoute.jsx`)
* [x] Validation completed
* [x] Error handling & 401/403 interceptor completed
* [x] Frontend / API integration service layer completed
* [x] Testing & build verification completed (`npm run build` - 0 errors)

---

# 12. Future Milestones

* 🗄️ **Milestone 3 — MongoDB & Database Integration**: Connect Express backend to MongoDB / Mongoose ODM for persistent database storage.
* ⚡ **Milestone 4 — Advanced Features & Real-Time Sync**: Implement Socket.io / WebSockets for live multi-user board updates and drag-and-drop task movements.
* 🚀 **Milestone 5 — Final Testing, Cloud Deployment & Docs**: End-to-end integration testing, Docker containerization, cloud deployment (Render / Vercel), and final project showcase documentation.
