**Group Project Brief**

A Progressively Built Full-Stack Application

## Overview

Working in your assigned group, you will design and build one full-stack web application across all five sessions of this workshop. Every session adds a required layer of the stack on top of the previous one, so by 30 August your git history should read as a clear, working progression from static UI to a deployed, real-time, tested application.

## Suggested Project: Team Task Board

The default project is a collaborative Kanban-style task board (working title: “CollabBoard”) where a small team can create boards, add tasks, move tasks between columns (To Do / Doing / Done), and see teammates' changes update live. This scenario naturally exercises every required technology, so it is recommended if your group has no strong alternative idea.

Groups may propose an alternative domain (e.g. an event RSVP tracker, a shared shopping/packing list, a simple inventory tracker) instead, provided it satisfies every technical requirement below - get the idea approved by the facilitator at the start of Session 1.

## Mandatory Technical Requirements

•    Front end built with React (or Angular, if your group prefers) and organized into reusable components.

•    Back-end REST API built with Node.js and Express, following a routes/controllers/models structure.

•    Data persisted in MongoDB via an ODM/ORM such as Mongoose.

•    Basic authentication so the app distinguishes between users (register/login, protected routes).

•    At least one client-side persistence mechanism (localStorage/IndexedDB) that keeps in-progress work available after a refresh or brief network loss.

•    A documented approach to concurrent edits — at minimum, detecting a conflicting update and surfacing it rather than silently overwriting data.

•    Automated tests on both the client (Jest + React Testing Library) and the server (Jest + Supertest), running in a CI pipeline.

•    Real-time updates between connected clients using WebSockets (Socket.io recommended).

•    Containerised with Docker (docker-compose for local multi-service runs) and deployed to a publicly reachable URL.

## Milestones At a Glance

|   |
| - |

**#**

|   |
| - |

**Date**

|   |
| - |

**Milestone**

|   |
| - |

**What “done” looks like**

|   |
| - |

**M1**

|   |
| - |

2 Aug

|   |
| - |

Static Front-End Skeleton

|   |
| - |

React app scaffolded, Board/Column/TaskCard UI with mock data, wireframe + component tree, repo live

|   |
| - |

**M2**

|   |
| - |

9 Aug

|   |
| - |

Working REST API

|   |
| - |

Express CRUD API, JWT auth, front end wired to real endpoints, API contract documented

|   |
| - |

**M3**

|   |
| - |

16 Aug

|   |
| - |

Persistence & Offline Support

|   |
| - |

MongoDB via Mongoose replaces mock data, schema diagram, client-side caching.

|   |
| - |

**M4**

|   |
| - |

23 Aug

|   |
| - |

Test Suite & CI

|   |
| - |

≥3 server tests, ≥3 client tests, GitHub Actions running tests on every push, ≥1 real bug fixed

|   |
| - |

**M5**

|   |
| - |

30 Aug

|   |
| - |

Real-Time, DevOps & Launch

|   |
| - |

Socket.io live sync, Docker Compose setup, deployed app, final demo, submission package

*Full deliverable checklists for each milestone are in the Course Handbook, under the matching session.*

## Team Working Agreement

•    Agree with a branch strategy (e.g. feature branches + pull requests into main) in Session 1 and keep to it - grading looks at commit history, not just the final snapshot.

•    Rotate roles loosely across sessions (front end / back end / testing & DevOps) so every member touches each layer at least once.

## Grading Rubric

|   |
| - |

**Criterion**

|   |
| - |

**Weight**

|   |
| - |

**What we look for**

|   |
| - |

**Functionality & Feature Completeness**

|   |
| - |

25%

|   |
| - |

Core user flows (create/view/update/move/delete a task, login) work end-to-end without errors.

|   |
| - |

**Architecture & Code Quality**

|   |
| - |

15%

|   |
| - |

Clear separation of concerns (routes/controllers/models, reusable components), consistent style, meaningful commits.

|   |
| - |

**Database Design & Persistence**

|   |
| - |

15%

|   |
| - |

Sensible schema, appropriate use of embedding vs referencing, data survives a server restart.

|   |
| - |

**Testing & CI**

|   |
| - |

15%

|   |
| - |

Meaningful unit/integration tests on both tiers, CI pipeline passing at submission time.

|   |
| - |

**Real-Time Behavior & Concurrency**

|   |
| - |

15%

|   |
| - |

WebSocket updates propagate correctly; a conflicting edit is detected and handled rather than silently lost.

|   |
| - |

**DevOps & Deployment**

|   |
| - |

10%

|   |
| - |

App runs via Docker Compose locally and is reachable at a public URL.

|   |
| - |

**Team Collaboration & Demo**

|   |
| - |

5%

|   |
| - |

Even contribution visible in git history; clear, well-paced final demo and reflection.

## Final Submission Checklist (Session 5)

•    Link to the GitHub repository (commit history intact, no squashed/rewritten history).

•    Publicly reachable deployed URL for the running application.

•    README covering: setup instructions, architecture diagram, tech stack, and known limitations.

•    Passing CI pipeline (green build) at the time of submission.

•    One-page team reflection: what worked, what you'd do differently, and how work was divided.

## Getting Help

Raise blockers with the facilitator during studio time rather than waiting for the next session. Each session's hands-on block is built around groups working on their own project with support on hand, not just following along with the instructor's demo.     

Milstone 01 -Phase 1: Static Front-End Skeleton
Goal: Build the React UI with mock data.
Member 1: Build the core Board component and establish the foundational CSS layout for the application.Build the Column components to represent the "To Do", "Doing", and "Done" statuses.
Member 2: Design and build the TaskCard component to display individual task details.
Member 3: Create the mock data structure and set up the initial React state management to pass this data down to the components.
Member 4: Implement basic button functions or drag-and-drop placeholders to simulate moving tasks between columns.
Member 5: Build the header, footer, and basic site navigation framework. 
Member 6:members listed Side panel , history icon, calendar.     Assignment 01 - Static Front-End Skeleton
 Submitted 22 August 2026
Please submit the fontend skeleton of SyncBoard client Project.
Write a Report (in docx) which includes
Introduction about your project
Team (Describe each team member's role )
Github link (Create a tag for Assignment 01 - Static Front-End Skeleton). Each members commit should be there.
How to run ?
Screenshots of your front end (Each pages).  Assignment 01: Static Front-End Skeleton

Introduction
SyncBoard is a collaborative task management application developed using React and Vite as the core front end framework. The static front end skeleton utilizes a custom dark mode CSS design system, starting with a glassmorphic login interface that includes real time regex form validation and persistent session state management via localStorage.

The main dashboard features a modular architecture, utilizing reusable React components for the Kanban board columns (To do, Doing, Done), which include dynamic task counters and SkeletonCard components to simulate asynchronous data loading. The application manages its data state centrally, employing JavaScript Set structures for dynamic filtering and searching, while ensuring structural integrity across components through robust prop types data validation. 

Team Roles
•	KBGDH Kariyawasam (33361): Developed the core authentication workflow, the main dashboard visualization, and the modular Kanban board UI components. 

•	RMLK Ranathunga (33360): Built the primary task visualization interfaces, including the TaskCard and CreateTaskModal components, along with dynamic input fields. 

•	PS Basnayaka: Designed the mock data architecture, established the central state management for the application, and implemented dynamic search filtering. 

•	KHB Sithmanthi (31880): Implemented the task movement features, including drag and drop functionality between Kanban columns and basic navigation buttons. 

•	RPD Sathruwan (33799): Engineered the Header, Footer, and multi-functional SidePanel components, and structured the overall responsive application layout shell. 

•	KNN Kumaranayake (33759): Developed the interactive team management and audit features for the sidebar, engineered a calendar driven history widget, and optimized the Kanban column CSS grid. 

GitHub Repository
Link: https://github.com/rmlkloch/Group_14_Fullstackdev.git.

How to Run
Ensure you have Node.js, npm, and Git installed on your system before proceeding.

1.	Open your terminal and clone the repository: git clone [https://github.com/rmlkloch/Group_14_Fullstackdev.git ]

2.	Navigate into the project folder: cd Group_14_Fullstackdev .

3.	Install all required client-side dependencies: npm install .

4.	Launch the Vite development server: npm run dev .

5.	Access the application by opening your web browser to http://localhost:5173/.

Screenshots( there are in the document ). --- 1.⁠ ⁠Member 01 -     
2.⁠ ⁠Member 02-  task card details and add task   
3.⁠ ⁠Member03-     
4.⁠ ⁠Member04-feature/task-drag-drop-by-bihansa
5.⁠ ⁠Member 5 - footer, navi and header
6.⁠ ⁠Member 6 - side panel, history + calender.  

Milstone 02- Phase 2: Working REST API
Goal: Build the Express CRUD API, implement JWT authentication, and connect the frontend.
Member 1 : Lead the core Express routing and controller structure. This leverages existing familiarity with robust backend APIs and data pipelines to establish a solid foundation.
Member 2: Implement user authentication, focusing on JWT generation and validation logic on the server.
Member 3: Build the frontend registration and login forms to capture user credentials.
Member 4: Connect the frontend React components to the new API endpoints using fetch or Axios, replacing the mock data from Phase 1.
Member 5: Write the API contract documentation and set up error-handling middleware.
Member 6: Implement protected routes on the React frontend so only logged-in users can view the task boards.

phase 3 - member allocation 

member 1 - Bihansa
member 2 - Nawoda
member 3 - Pooja 
member 4 - Lochana 
member 5 - Desadu 
member 6 - Daham 

phase 3 GitHub branches

Member 01 - feature/mongodb-models-by-bihansa
Member 02 - feature/database-infrastructure-by-nawoda
Member 03 - feature/persistent-api-by-pooja
Member 04 - feature/mongodb-performance-by-Lochana
Member 05 - feature/validation-concurrency-by-Daham
Member 06 - feature/api-integration_by_desandu




Member 1 (K.H.B.Sithmanthi - 31880)

I designed and implemented the main MongoDB models and schemas for the SyncBoard application using Mongoose. I created the User, Board, Task, and Activity models and defined their fields, required values, enums, defaults, relationships, and timestamps.
For the User model, I added email validation, password hashing using bcryptjs pre-save hooks, and toJSONtransformations to hide sensitive information such as passwords.
For the Board model, I embedded columns inside the Board document and defined their ID, title, and position. For Tasks, I added status and priority rules, relationships, and a version field for tracking updates.
I also added schema validation and suitable single and compound indexes for fields such as boardId, assignee, and status to improve database query performance.
Finally, I organized and exported all models and created model-level tests using the Node.js test runner to verify validation, enums, password hashing, defaults, and JSON serialization.


Member 2 (K.N.Nethmini Kumaranayake - 33759)

I spearheaded the database infrastructure by configuring the connection between our Express application and MongoDB Atlas. I managed the environment variables, including the creation of a .env.example file, and built a dedicated connection module that handles database startup, connection successes, failures, and disconnections. To streamline our development workflow, I engineered the database initialization logic by writing custom scripts to automatically seed sample data and reset or clear the database for development environments. Finally, I implemented a GET /api/health endpoint to actively monitor and report the Mongoose connection state, verified data persistence across server restarts, and thoroughly documented the complete database setup. 

Member 3 (P.S Basnayaka - 33900)

As Member 3 responsible for Persistent REST API & Aggregation in Milestone 3, I migrated the application backend from temporary in-memory data structures to a fully persistent MongoDB persistence layer using Express.js and Mongoose ODM. In backend/controllers/taskController.js and backend/routes/taskRoutes.js, I engineered RESTful CRUD endpoints supporting dynamic filtering (boardId, status, assignee), multi-field sorting (sortBy, order), field projections (fields), and server-side MongoDB pagination using .skip() and .limit() to return structured pagination metadata ({ tasks, totalTasks, totalPages, currentPage }). Additionally, I implemented strict ObjectId format validation returning 400 Bad Request for invalid IDs and 404 Not Found for missing documents. In backend/controllers/boardController.js and backend/routes/boardRoutes.js, I developed Board lifecycle management endpoints alongside embedded column operations using MongoDB subdocument array operators—specifically $push for column creation, $set with positional array filters (columns.$.title) for column updates, and $pull for column removal. Furthermore, I architected a multi-stage MongoDB aggregation pipeline (GET /api/boards/:id/analytics) utilizing $match, $facet, $group, $lookup, $unwind, and $project to compute overall task counts, status distributions, per-assignee task allocations with populated user profile metadata, and non-completed overdue tasks (dueDate < current date) in a single database roundtrip. All endpoints are protected via JWT protect middleware and verified through end-to-end integration tests.



Member 4 (R.M.L.K Ranathunga - 33360):

  I led the database performance optimization by identifying and accelerating frequently used MongoDB queries. I enhanced the Task schema by deploying strategic compound indexes ({ boardId: 1, status: 1, position: 1 } and { assignee: 1, status: 1 }) to optimize board and task relationship retrievals. To reduce unnecessary database operations, I engineered a centralized queryService.js module that implements highly efficient filtering, sorting, pagination, and data projections across our API controllers. Finally, I verified these improvements by analyzing query performance with MongoDB's explain() method—confirming a perfect 1:1 document examination ratio via IXSCAN—and formally documented our hybrid modeling and performance decisions. 

Member 5 (RPD Sathruwan - 33799)

For Phase 3, I developed the complete database safety, error handling, automated testing, and optimistic concurrency architecture as Member 5 on the feature/validation-concurrency-by-Daham branch. I implemented Mongoose schema validations and ObjectId checks alongside centralized middleware to handle duplicate records and database errors gracefully. To prevent data overwrites during simultaneous edits, I built optimistic concurrency control using task versioning that detects stale updates and returns 409 Conflict responses. Finally, I authored automated test suites to verify valid inputs, resource edge cases, database error responses, and version conflict scenarios, ensuring a reliable backend integration.


Member 6 (K.B.G.D.H.Kariyawasam - 33361):

In the feature/frontend-api-integration branch, the React frontend was fully integrated with the backend REST API by implementing dedicated service modules (api.js, taskService.js, boardService.js) and a custom useTasks hook to manage task creation, updates, column movements, member assignments, deletion, and optimistic concurrency control for 409 conflict handling. Additionally, all hardcoded mock data was removed from HomePage.jsx and SidePanel.jsx, allowing task categories, board members, search filtering, and board status actions to be dynamically rendered and synchronized in real-time with live server data.

milstone 02 - **Phase 2: Working REST API**

**Goal:** Build the Express CRUD API, implement JWT authentication and authorization, handle errors and validation, and connect the frontend to the backend.

**Member 1:** Lead the core Express routing, controller, and CRUD API structure. Implement RESTful endpoints, request/response handling, HTTP status codes, and basic backend validation to establish a solid API foundation.

**— Backend API & Controllers**

• Express project structure

• Routes

• CRUD controllers

• REST endpoints

• HTTP status codes

• Basic backend validation

**Member 2:** Implement server-side authentication and authorization, including user registration, password hashing, JWT generation and validation, authentication middleware, and protection of backend API endpoints.

**— Authentication & Authorization**

• Registration backend

• Password hashing

• Login

• JWT generation/validation

• Authentication middleware

• Authorization

• Protected API endpoints

**Member 3:** Build the frontend registration and login forms to capture and validate user credentials. Implement the authentication UI, login/logout functionality, and display appropriate authentication errors.

**— Authentication Frontend**

• Registration page

• Login page

• Form validation

• Authentication state

• Login/logout functionality

• Authentication-related UI/error handling

**Member 4:** Connect the frontend React components to the new API endpoints using Fetch or Axios, replacing the mock data from Phase 1. Implement frontend CRUD operations and handle loading, success, and error states.

**— API Integration & Task Operations**

• Connect React to API

• Replace mock data

• Create/read/update/delete tasks

• Axios/Fetch service layer

• Loading/success/error states

**Member 5:** Write the API contract documentation and implement centralized error-handling middleware. Define consistent error responses, validation errors, HTTP status codes, and API request/response specifications.

**— Error Handling, Validation & API Documentation**

• Centralized error middleware

• Standard error responses

• Input validation

• HTTP error handling

• API contract/documentation

• Test API endpoints using Postman

**Member 6:** Implement protected routes and authorization handling on the React frontend so only authenticated and authorized users can access the task boards. Handle invalid/expired tokens, unauthorized access, and session/logout behavior.

**— Protected Frontend & Authorization**

• React protected routes

• Route guards

• Token handling

• Unauthorized/expired-token handling

• User access restrictions

• Logout and session handling

• Integration testing of protected flows



**Step 1 —** **API Contract & Team Setup**

**All Members — Start together**

Before coding, agree on:

• API endpoint names

• HTTP methods

• Request body formats

• Response formats

• JWT/header format

• HTTP status codes

• Error response format

• Validation rules

• Git branches and merge strategy

|   |
| - |

**Method**

|   |
| - |

**Endpoint**

|   |
| - |

**Purpose**

|   |
| - |

POST

|   |
| - |

/api/auth/register

|   |
| - |

Register user

|   |
| - |

POST

|   |
| - |

/api/auth/login

|   |
| - |

Login

|   |
| - |

GET

|   |
| - |

/api/tasks

|   |
| - |

Get tasks

|   |
| - |

POST

|   |
| - |

/api/tasks

|   |
| - |

Create task

|   |
| - |

GET

|   |
| - |

/api/tasks/\:id

|   |
| - |

Get task

|   |
| - |

PUT

|   |
| - |

/api/tasks/\:id

|   |
| - |

Update task

|   |
| - |

DELETE

|   |
| - |

/api/tasks/\:id

|   |
| - |

Delete task

Step 2 — Parallel Development

Member 1 — Backend API & Controllers

**Branch:** feature/backend-api

Tasks

• Set up Express backend structure

• Create routes

• Create controllers

• Implement CRUD operations

• Create REST endpoints

• Implement request/response handling

• Use appropriate HTTP status codes

• Implement basic backend validation

Deliverable - Working CRUD REST API.

Member 2 — Authentication & Authorization

**Branch:** feature/auth

Tasks

• Implement registration backend

• Hash passwords

• Implement login

• Generate JWT

• Validate JWT

• Create authentication middleware

• Implement authorization

• Protect backend endpoints

Deliverable - Working authentication and protected API endpoints.

Member 3 — Authentication Frontend

**Branch:** feature/frontend-auth

Use the **existing Phase 1 frontend**.

Tasks

• Implement registration page functionality

• Implement login functionality

• Form validation

• Connect forms to authentication API

• Authentication state

• Login/logout functionality

• Display authentication errors

• Handle successful authentication

Deliverable

Working frontend registration and login.

Use the agreed API contract/mock responses while Member 2 develops the actual authentication API.

Member 4 — API Integration & Task Operations

**Branch:** feature/api-integration

Tasks

• Create Axios/Fetch service layer

• Replace Phase 1 mock data

• Connect task board to API

• GET tasks

• CREATE tasks

• UPDATE tasks

• DELETE tasks

• Send JWT with protected requests

• Loading states

• Success states

• Error states

Build the service layer against the agreed API contract.

Deliverable -Existing frontend working with the real backend API.

Member 5 — Error Handling, Validation & Documentation

**Branch:** feature/error-handling-docs

Tasks

• Centralized error-handling middleware

• Standard error responses

• Input validation

• Error handling

• API contract/documentation

• Document endpoints

• Document request/response formats

• Create Postman collection

• Test API endpoints using Postman

Deliverable

Documented and consistently handled API with Postman test collection.

Member 6 — Protected Frontend & Authorization

**Branch:** feature/protected-routes

Tasks

• React protected routes

• Route guards

• Token handling

• User access restrictions

• Unauthorized access handling

• Invalid/expired token handling

• Logout/session handling

• Integration testing of protected flows

Deliverable - Only authenticated/authorized users can access protected task boards.

Use the agreed authentication/token structure.

Step 3 — Individual Testing

After each member completes their main implementation:

|   |
| - |

**Member**

|   |
| - |

**Testing**

|   |
| - |

Member 1

|   |
| - |

CRUD endpoint testing

|   |
| - |

Member 2

|   |
| - |

Authentication/JWT testing

|   |
| - |

Member 3

|   |
| - |

Login/register frontend testing

|   |
| - |

Member 4

|   |
| - |

API integration testing

|   |
| - |

Member 5

|   |
| - |

Error/validation/Postman testing

|   |
| - |

Member 6

|   |
| - |

Protected-route/auth testing

This prevents everyone from waiting until the end to discover problems.

Step 4 — Integration

Once the individual components are ready:

Member 1

Backend CRUD

     +

Member 2

Authentication

     +

Member 3

Login/Register

     +

Member 4

Task API Integration

     +

Member 5

Error Handling

     +

Member 6

Protected Routes

     ↓

 FULL SYSTEM

Integration tasks

• Connect frontend to actual backend

• Connect login to JWT authentication

• Send JWT with protected requests

• Verify protected API endpoints

• Verify protected React routes

• Test CRUD with authenticated users

• Test unauthorized access

• Test validation errors

• Test server errors

• Fix integration issues

Step 5 — Final Testing

Run complete system tests:

Authentication

•  Register new user

•  Login with valid credentials

•  Reject invalid credentials

•  Generate JWT

•  Validate JWT

•  Reject expired/invalid JWT

•  Logout

CRUD

•  Create task

•  Read tasks

•  Update task

•  Delete task

Authorization

•  Unauthenticated user cannot access protected board

•  Authenticated user can access board

•  Unauthorized operations are rejected

•  Protected API endpoints require JWT

Error handling

•  Invalid input

•  Missing fields

•  Invalid credentials

•  Invalid token

•  Resource not found

•  Server/API errors

•  Consistent error messages

Timeline

|   |
| - |

**Day**

|   |
| - |

**Activity**

|   |
| - |

**Day 1**

|   |
| - |

API contract + Git branches + team setup

|   |
| - |

**Days 2–5**

|   |
| - |

All 6 members develop simultaneously

|   |
| - |

**Day 6**

|   |
| - |

Individual testing + code review

|   |
| - |

**Days 7–8**

|   |
| - |

Frontend/backend integration

|   |
| - |

**Day 9**

|   |
| - |

Full system testing

|   |
| - |

**Day 10**

|   |
| - |

Bug fixing + documentation + final review

The exact number of days can be adjusted to your project schedule.

Git workflow

Since everyone is working simultaneously, I recommend:

main

│

├── feature/backend-api          → Member 1

├── feature/auth                 → Member 2

├── feature/frontend-auth        → Member 3

├── feature/api-integration      → Member 4

├── feature/error-handling-docs  → Member 5

└── feature/protected-routes     → Member 6

Each member works on their own branch and regularly updates from main.

Then:

Feature Branch

     ↓

Pull Request

     ↓

Code Review

     ↓

Merge to main

     ↓

Integration Testing

.

**Missing M2 Tasks Plan**

|   |
| - |

Member 

|   |
| - |

What is already in M2 plan 

|   |
| - |

What is missing

|   |
| - |

Member

1

|   |
| - |

• Express project structure

• Routes

• Controllers

• CRUD operations

• REST endpoints

• Request/response handling

•HTTP status codes

• Basic backend validation

|   |
| - |

• Service layer

• Repository layer

• Route → Controller → Service →

Repository architecture

• Filtering (status, assignee)

• Sorting

• Pagination (page, limit)

• Server-side maximum limit

• Change PUT → PATCH for task update

|   |
| - |

Member

2

|   |
| - |

• Registration backend

• Password hashing

• Login

• JWT generation/validation

• Authentication middleware

• Authorization

• Protected API endpoints

|   |
| - |

• GET /api/auth/me

• JWT expiry

• .env configuration

• Secure JWT\_SECRET management

• Never return password hashes

• Login rate limiting

• Explicit Bearer-token implementation

|   |
| - |

Member

3

|   |
| - |

• Registration page

• Login page

• Form validation

• Authentication state

• Login/logout

• Authentication errors

• Successful authentication

|   |
| - |

• AuthContext for centralized

authentication state

• Connect AuthContext with protected

routes/session handling

|   |
| - |

Member

4

|   |
| - |

• Axios/Fetch service layer

• Replace mock data

• Connect React to API

•GET/CREATE/UPDATE/DEL

ETE tasks

• Send JWT

• Loading states

• Success states

• Error states

|   |
| - |

• CORS configuration• Vite development

proxy (if used)

• Centralized 401 handling

• Automatically handle expired/invalid

token from API• Empty states

• Ensure mockTasks.js is removed

completely

**Member**

**5**

• Centralized error

middleware

• Standard error responses

• Input validation

• HTTP error handling

• API documentation

• Endpoint documentation

• Request/response

documentation

• Postman collection

• Postman testing

• Explicit **Zod schemas**

• Reusable validation middleware

• Per-field validation details

• AppError / custom error classes

• Centralized **404 handler**

• Proper **500 error handling** without

exposing internals

• **Standard success response** format

(data)

• Standard error structure (error)

**Member**

**6**

• React protected routes

• Route guards

• Token handling

• User access restrictions

• Unauthorized handling

• Invalid/expired token

handling

• Logout/session handling

• Protected-flow integration

testing

• **Board membership/ownership**

**authorization**

• Ensure users can only access boards

they belong to

• Ensure users cannot read another user's

tasks

• Ensure users cannot modify another

user's tasks•

Test ownership restrictions in Postman

**Member** **Already**

**Completed**

**Gap Fix — Do Now** **Do NOT Redo**

**Member**

**1**

Express, routes,

controllers,

CRUD, REST

endpoints, status

codes

🔴 **Check/add Service layer**

**and Repository layer** if they

are missing. Ensure business

logic is in services and data

access is in repositories.

🔴 Change task update from

**PUT → PATCH** if your

implementation currently uses

PUT.

🟡 Add

filtering/sorting/pagination **only**

**if required by your agreed**

**M2 scope**.

❌ Don't rewrite

existing

controllers/routes

unnecessarily.**Member**

**2**

**Member**

**3**

**Member**

**4**

**Member**

**5**

**Member**

**6**

Registration,

bcrypt, login,

JWT, middleware,

authorization

Registration/login

UI, validation,

auth state,

login/logout

Axios/Fetch, real

API, CRUD

integration, JWT,

loading/success/e

rror

Error middleware,

validation,

documentation,

Postman

Protected routes,

route guards,

token handling,

unauthorized/expi

red handling

🔴 Add/check GET

/api/auth/me.

🔴 Check JWT **expiry**.

🔴 Check .env for

JWT\_SECRET.

🔴 Ensure password hashes

are never returned.

🟡 Add login rate limiting if not

already present.

🔴 Add/check AuthContext if

it isn't already used.

🔴 Make sure /me can restore

the logged-in user when the

application starts.

🔴 Configure **CORS** if missing.

🔴 Add **centralized 401**

**handling** in the API client.

🔴 Ensure **empty state** is

handled.

🔴 Confirm mockTasks.js is

deleted.

🔴 Check that validation uses

**Zod schemas** on write

endpoints.

🔴 Check one consistent error

shape.

🔴 Add/check **404 handler**. 🔴

Ensure 500 responses don't

expose internal details. 🟡 Add

AppError only if your current

error system doesn't already

provide the same functionality.

🔴 **Verify ownership**

**enforcement**: users cannot

read/modify tasks on boards

they don't belong to. This must

be enforced server-side, not

only in React.

❌ Don't rewrite

working

registration/login/J

WT code unless a

security

requirement is

actually missing.

❌ Don't rebuild

the login/register

pages.

❌ Don't rebuild

the API service or

CRUD integration.

❌ Don't replace

working error

handling just to

rename it.

❌ Don't rebuild

protected routes if

they already work.🔴 Demonstrate this with

Postman.

**API contract —**

Current API contract also needs these additions\:These come directly from the

lecture's SyncBoard API contract.

**Missing endpoint** **Purpose**

GET /api/auth/me Get current authenticated user

GET /api/boards Get boards the user can access

POST /api/boards Create a board

GET /api/boards/\:id/tasks Get tasks belonging to a board

PATCH /api/tasks/\:id Update task fields

**Simple summary**

**Member** **Current plan** **Missing workload**

**M1** Strong Architecture + advanced querying

**M2** Strong Security + /me + configuration

**M3** Mostly covered AuthContext

**M4** Strong CORS + centralized token handling

**M5** Strong Zod + error/response architecture

**M6** Strong Ownership/membership authorizationdirect comparison of **what current M2 plan already contains vs. what is missing**

**according to the lecture note**.

**Area** **What is already in**

**your M2 plan**

**What is missing / needs to be added**

**Express setup** Member 1: Express

project structure

✅ Nothing major

**Routes** Member 1: Create

routes

✅ Covered

**Controllers** Member 1: Create

CRUD controllers

✅ Covered

**REST endpoints** Member 1: REST

endpoints

✅ Covered

**HTTP**

**methods/status**

**codes**

Member 1:

Appropriate HTTP

status codes

⚠ Change **PUT → PATCH** for task

update

**Service layer** ❌ Not explicitly

included

**Add Service layer**

**Repository layer** ❌ Not explicitly

included

**Add Repository layer**

**Layered**

**architecture**

⚠ Routes/controllers

are included

Add **Route → Controller → Service**

**→ Repository**structure**CRUD** **Filtering** **Sorting** **Pagination** **Server-side limit** **Basic validation** **Zod schemas** **Validation**

**middleware**

**Per-field**

**validation errors**

**Central error**

**middleware**

**Standard error**

**responses**

Member 1 + Member

✅ Covered

4

❌ Not included Add status, assignee filtering

❌ Not included Add sorting using query parameters

❌ Not included Add page and limit

❌ Not included Add maximum pagination limit

Members 1 & 5 ⚠ Already covered, but specify **Zod**

❌ Not explicitly

named

Add Zod schemas for

create/update/auth

⚠ Input validation

mentioned

Add reusable Zod validation

middleware

❌ Not explicitly

included

Add field-level error details

Member 5 ✅ Covered

Member 5 ✅ Covered**AppError/error**

**classes**

**404 handler** **500 error**

**handling**

**Consistent**

**success**

**response**

**Registration**

**backend**

**Password**

**hashing**

**Login** **JWT generation** **JWT validation** **Authentication**

**middleware**

**Authorization** ❌ Not explicitly

included

❌ Not explicitly

included

⚠ General error

handling

❌ Not explicitly

included

Member 2 Member 2 Member 2 Member 2 Member 2 Member 2 Member 2 Add AppError, ValidationError,

NotFoundError, ForbiddenError

Add centralized unknown-route 404

handler

Explicitly prevent stack/database

details from being returned

Add standard { data: ... }

response format

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

⚠ General authorization covered**Ownership**

**enforcement**

GET

/api/auth/me

**JWT expiry** **JWT secret**

**security**

.env** /**

**configuration**

**Password hash**

**protection**

**Login rate**

**limiting**

**Bearer token** **Frontend**

**registration/logi**

**n**

**Authentication**

**state**

❌ Not explicitly

included

❌ Not included ⚠ Token handling

mentioned

❌ Not included ❌ Not included ❌ Not included ❌ Not included Members 4 & 6 Member 3 Member 3 Add board/task ownership and

membership checks

Add current-user endpoint

Explicitly add token expiration

Add .env and protect JWT\_SECRET

Add environment configuration +

.env.example

Ensure password hashes are never

returned

Add rate limiting to login

✅ Covered

✅ Covered

⚠ Covered generally**AuthContext** **Login/logout** **Protected React**

**routes**

**Route guards** **Token handling** **Expired token**

**handling**

**Unauthorized**

**handling**

**Session**

**handling**

**CORS** **API service**

**layer**

**Replace mock**

**data**

❌ Not explicitly

included

Member 3 Member 6 Member 6 Member 6 Member 6 Member 6 Member 6 ❌ Not included Member 4 Member 4 Add React AuthContext

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

Add CORS configuration

✅ Covered

✅ Covered**Live API**

**integration**

**Loading states** **Success states** **Error states** **Central 401**

**handling**

**Empty state** **Postman testing** **API**

**documentation**

**API contract** GET

/api/auth/me

GET

/api/boards

Member 4 ✅ Covered

Member 4 ✅ Covered

Member 4 ✅ Covered

Member 4 ✅ Covered

⚠ Invalid/expired

token handling exists

Add **centralized** 401 handling in API

client

❌ Not explicitly

included

Add frontend empty-state handling

Member 5 ✅ Covered

Member 5 ✅ Covered

All members ⚠ Update with missing endpoints

❌ Add to API contract

❌ Add to API contractPOST

/api/boards

❌ Add to API contract

GET

/api/boards/:

id/tasks

❌ Add to API contract

PATCH

/api/tasks/\:i

d

❌ Add to API contract

**Git branches** All members ✅ Covered

**Pull**

**requests/code**

**review**

All members ✅ Covered

**Individual**

**testing**

All members ✅ Covered

**Integration**

**testing**

All members ✅ Covered

**Final testing** All members ✅ Covered

The lecture's architecture explicitly requires **routes, controllers, services, and**

**repositories**, while its API contract includes /api/auth/me, board endpoints,

board-task access, and PATCH /api/tasks/\:id.

**Most important missing items**

1. **Service layer**2. **Repository layer**

3. **Board endpoints**

4. GET /api/auth/me

5. **Ownership/membership authorization**

6. **PATCH instead of PUT**

7. **Filtering**

8. **Sorting**

9. **Pagination**

10. **Zod validation**

11. **CORS**

12. .env** / JWT secret management**

13. **JWT expiry**

14. **Never return password hashes**

15. **Consistent success response**

16. **Central 404/error handling**

17. **AuthContext**

18. **Login rate limiting**

**Member 1 — Missing Backend Architecture &**

**Advanced API**

**Branch:** feature/backend-api

**Additional Tasks**

●

●

●

●

●

●

●

●

●

●

Implement **Service layer**

Implement **Repository layer**

Keep business logic inside services

Keep data-access logic inside repositories

Ensure no req or res below the controller layer

Implement **filtering** using query parameters

Implement **sorting**

Implement **pagination**

Add server-side maximum limit for pagination

Handle query parameters such as:

○

status

○

assignee○

○

○

sort

page

limit

**Additional Deliverable:**

Fully layered backend with Route → Controller → Service → Repository architecture

and advanced task querying.

**Member 2 — Missing Authentication**

**Security**

**Branch:** feature/auth

**Additional Tasks**

●

●

●

●

●

●

●

●

Implement GET /api/auth/me

Add **JWT expiration**

Keep JWT\_SECRET in .env

Create .env.example

Ensure JWT secret is never committed

Ensure password hashes are never returned to the frontend

Add **login rate limiting**

Ensure authentication uses:

○

Authorization

○

Bearer \<token>

●

Ensure invalid/expired tokens return 401

**Additional Deliverable:**

Complete and secure authentication system with /me, token expiry, secret

management, password protection, and login protection.

**Member 3 — Missing Authentication**

**State Structure**

**Branch:** feature/frontend-auth**Additional Tasks**

●

●

●

●

●

●

Implement/use **AuthContext**

Store and manage the authenticated user

Maintain authentication state across the React application

Connect authentication state with protected routes

Ensure login updates the global authentication state

Ensure logout clears authentication state

**Additional Deliverable:**

Centralized React authentication state using AuthContext.

**Member 4 — Missing Client–Server**

**Communication**

**Branch:** feature/api-integration

**Additional Tasks**

●

●

●

●

●

●

●

●

Configure **CORS** between React and Express

Configure development API proxy if required

Ensure API requests use the agreed Authorization: Bearer \<token>

format

Handle 401 responses centrally

Automatically remove expired/invalid token on 401

Trigger authentication-expired handling

Ensure frontend handles **empty states** from the real API

Ensure mockTasks.js is completely removed

**Additional Deliverable:**

Fully configured and reliable React ↔ Express communication using the real API.

**Member 5 — Missing Validation &**

**Response Standards**

**Branch:** feature/error-handling-docs**Additional Tasks**

●

●

●

●

●

●

●

●

●

●

Implement **Zod schema validation**

Create schemas for:

○

Task creation

○

Task update

○

Authentication

Implement reusable validation middleware

Return **per-field validation details**

Define a consistent **success response format**

Define a consistent **error response format**

Implement AppError

Implement appropriate error types:

○

Validation Error

○

Not Found Error

○

Forbidden Error

Implement centralized 404 route handling

Ensure 500 errors do not expose stack traces or database details

**Additional Deliverable:**

Consistent Zod validation and standardized API success/error responses.

**Member 6 — Missing Authorization &**

**Ownership**

**Branch:** feature/protected-routes

**Additional Tasks**

●

●

●

●

●

●

●

●

Implement **board access restrictions**

Implement **task ownership/membership checking**

Ensure users can only access boards they belong to

Ensure users cannot read another user's tasks

Ensure users cannot modify another user's tasks

Ensure unauthorized operations return:

○

403 Forbidden, or

○

404 Not Found where appropriate

Test ownership restrictions using Postman

Test authenticated vs unauthorized users**Additional Deliverable:**

Complete ownership-based authorization for boards and tasks.

**Additional Team Task — API Contract**

**Update**

Before development, **all members** should update the API contract to include the

missing lecture endpoints:

**Method** **Endpoint** **Purpose**

GET /api/auth/me Get current authenticated user

GET /api/boards Get user's boards

POST /api/boards Create a board

GET /api/boards/\:id/tasks Get tasks belonging to a board

PATCH /api/tasks/\:id Partially update a task

The lecture's contract uses **PATCH rather than PUT** for task updates.

**In short, the missing work is:**

**Member 1:** Services + Repositories + Filtering + Sorting + Pagination

**Member 2:** /me + JWT expiry + Secrets + Password protection + Rate limiting

**Member 3:** AuthContext + Central authentication state

**Member 4:** CORS + Central 401 handling + Empty states + Remove mock data

**Member 5:** Zod + AppError + Standard response formats + 404/500 handling

**Member 6:** Board/task ownership + Membership authorization

**All:** Update API contract with /me, boards, board tasks, and PATCH.

**Missing M2 Tasks Plan**

|   |
| - |

Member 

|   |
| - |

What is already in M2 plan 

|   |
| - |

What is missing

|   |
| - |

Member

1

|   |
| - |

• Express project structure

• Routes

• Controllers

• CRUD operations

• REST endpoints

• Request/response handling

•HTTP status codes

• Basic backend validation

|   |
| - |

• Service layer

• Repository layer

• Route → Controller → Service →

Repository architecture

• Filtering (status, assignee)

• Sorting

• Pagination (page, limit)

• Server-side maximum limit

• Change PUT → PATCH for task update

|   |
| - |

Member

2

|   |
| - |

• Registration backend

• Password hashing

• Login

• JWT generation/validation

• Authentication middleware

• Authorization

• Protected API endpoints

|   |
| - |

• GET /api/auth/me

• JWT expiry

• .env configuration

• Secure JWT\_SECRET management

• Never return password hashes

• Login rate limiting

• Explicit Bearer-token implementation

|   |
| - |

Member

3

|   |
| - |

• Registration page

• Login page

• Form validation

• Authentication state

• Login/logout

• Authentication errors

• Successful authentication

|   |
| - |

• AuthContext for centralized

authentication state

• Connect AuthContext with protected

routes/session handling

|   |
| - |

Member

4

|   |
| - |

• Axios/Fetch service layer

• Replace mock data

• Connect React to API

•GET/CREATE/UPDATE/DEL

ETE tasks

• Send JWT

• Loading states

• Success states

• Error states

|   |
| - |

• CORS configuration• Vite development

proxy (if used)

• Centralized 401 handling

• Automatically handle expired/invalid

token from API• Empty states

• Ensure mockTasks.js is removed

completely

**Member**

**5**

• Centralized error

middleware

• Standard error responses

• Input validation

• HTTP error handling

• API documentation

• Endpoint documentation

• Request/response

documentation

• Postman collection

• Postman testing

• Explicit **Zod schemas**

• Reusable validation middleware

• Per-field validation details

• AppError / custom error classes

• Centralized **404 handler**

• Proper **500 error handling** without

exposing internals

• **Standard success response** format

(data)

• Standard error structure (error)

**Member**

**6**

• React protected routes

• Route guards

• Token handling

• User access restrictions

• Unauthorized handling

• Invalid/expired token

handling

• Logout/session handling

• Protected-flow integration

testing

• **Board membership/ownership**

**authorization**

• Ensure users can only access boards

they belong to

• Ensure users cannot read another user's

tasks

• Ensure users cannot modify another

user's tasks•

Test ownership restrictions in Postman

**Member** **Already**

**Completed**

**Gap Fix — Do Now** **Do NOT Redo**

**Member**

**1**

Express, routes,

controllers,

CRUD, REST

endpoints, status

codes

🔴 **Check/add Service layer**

**and Repository layer** if they

are missing. Ensure business

logic is in services and data

access is in repositories.

🔴 Change task update from

**PUT → PATCH** if your

implementation currently uses

PUT.

🟡 Add

filtering/sorting/pagination **only**

**if required by your agreed**

**M2 scope**.

❌ Don't rewrite

existing

controllers/routes

unnecessarily.**Member**

**2**

**Member**

**3**

**Member**

**4**

**Member**

**5**

**Member**

**6**

Registration,

bcrypt, login,

JWT, middleware,

authorization

Registration/login

UI, validation,

auth state,

login/logout

Axios/Fetch, real

API, CRUD

integration, JWT,

loading/success/e

rror

Error middleware,

validation,

documentation,

Postman

Protected routes,

route guards,

token handling,

unauthorized/expi

red handling

🔴 Add/check GET

/api/auth/me.

🔴 Check JWT **expiry**.

🔴 Check .env for

JWT\_SECRET.

🔴 Ensure password hashes

are never returned.

🟡 Add login rate limiting if not

already present.

🔴 Add/check AuthContext if

it isn't already used.

🔴 Make sure /me can restore

the logged-in user when the

application starts.

🔴 Configure **CORS** if missing.

🔴 Add **centralized 401**

**handling** in the API client.

🔴 Ensure **empty state** is

handled.

🔴 Confirm mockTasks.js is

deleted.

🔴 Check that validation uses

**Zod schemas** on write

endpoints.

🔴 Check one consistent error

shape.

🔴 Add/check **404 handler**. 🔴

Ensure 500 responses don't

expose internal details. 🟡 Add

AppError only if your current

error system doesn't already

provide the same functionality.

🔴 **Verify ownership**

**enforcement**: users cannot

read/modify tasks on boards

they don't belong to. This must

be enforced server-side, not

only in React.

❌ Don't rewrite

working

registration/login/J

WT code unless a

security

requirement is

actually missing.

❌ Don't rebuild

the login/register

pages.

❌ Don't rebuild

the API service or

CRUD integration.

❌ Don't replace

working error

handling just to

rename it.

❌ Don't rebuild

protected routes if

they already work.🔴 Demonstrate this with

Postman.

**API contract —**

Current API contract also needs these additions\:These come directly from the

lecture's SyncBoard API contract.

**Missing endpoint** **Purpose**

GET /api/auth/me Get current authenticated user

GET /api/boards Get boards the user can access

POST /api/boards Create a board

GET /api/boards/\:id/tasks Get tasks belonging to a board

PATCH /api/tasks/\:id Update task fields

**Simple summary**

**Member** **Current plan** **Missing workload**

**M1** Strong Architecture + advanced querying

**M2** Strong Security + /me + configuration

**M3** Mostly covered AuthContext

**M4** Strong CORS + centralized token handling

**M5** Strong Zod + error/response architecture

**M6** Strong Ownership/membership authorizationdirect comparison of **what current M2 plan already contains vs. what is missing**

**according to the lecture note**.

**Area** **What is already in**

**your M2 plan**

**What is missing / needs to be added**

**Express setup** Member 1: Express

project structure

✅ Nothing major

**Routes** Member 1: Create

routes

✅ Covered

**Controllers** Member 1: Create

CRUD controllers

✅ Covered

**REST endpoints** Member 1: REST

endpoints

✅ Covered

**HTTP**

**methods/status**

**codes**

Member 1:

Appropriate HTTP

status codes

⚠ Change **PUT → PATCH** for task

update

**Service layer** ❌ Not explicitly

included

**Add Service layer**

**Repository layer** ❌ Not explicitly

included

**Add Repository layer**

**Layered**

**architecture**

⚠ Routes/controllers

are included

Add **Route → Controller → Service**

**→ Repository**structure**CRUD** **Filtering** **Sorting** **Pagination** **Server-side limit** **Basic validation** **Zod schemas** **Validation**

**middleware**

**Per-field**

**validation errors**

**Central error**

**middleware**

**Standard error**

**responses**

Member 1 + Member

✅ Covered

4

❌ Not included Add status, assignee filtering

❌ Not included Add sorting using query parameters

❌ Not included Add page and limit

❌ Not included Add maximum pagination limit

Members 1 & 5 ⚠ Already covered, but specify **Zod**

❌ Not explicitly

named

Add Zod schemas for

create/update/auth

⚠ Input validation

mentioned

Add reusable Zod validation

middleware

❌ Not explicitly

included

Add field-level error details

Member 5 ✅ Covered

Member 5 ✅ Covered**AppError/error**

**classes**

**404 handler** **500 error**

**handling**

**Consistent**

**success**

**response**

**Registration**

**backend**

**Password**

**hashing**

**Login** **JWT generation** **JWT validation** **Authentication**

**middleware**

**Authorization** ❌ Not explicitly

included

❌ Not explicitly

included

⚠ General error

handling

❌ Not explicitly

included

Member 2 Member 2 Member 2 Member 2 Member 2 Member 2 Member 2 Add AppError, ValidationError,

NotFoundError, ForbiddenError

Add centralized unknown-route 404

handler

Explicitly prevent stack/database

details from being returned

Add standard { data: ... }

response format

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

⚠ General authorization covered**Ownership**

**enforcement**

GET

/api/auth/me

**JWT expiry** **JWT secret**

**security**

.env** /**

**configuration**

**Password hash**

**protection**

**Login rate**

**limiting**

**Bearer token** **Frontend**

**registration/logi**

**n**

**Authentication**

**state**

❌ Not explicitly

included

❌ Not included ⚠ Token handling

mentioned

❌ Not included ❌ Not included ❌ Not included ❌ Not included Members 4 & 6 Member 3 Member 3 Add board/task ownership and

membership checks

Add current-user endpoint

Explicitly add token expiration

Add .env and protect JWT\_SECRET

Add environment configuration +

.env.example

Ensure password hashes are never

returned

Add rate limiting to login

✅ Covered

✅ Covered

⚠ Covered generally**AuthContext** **Login/logout** **Protected React**

**routes**

**Route guards** **Token handling** **Expired token**

**handling**

**Unauthorized**

**handling**

**Session**

**handling**

**CORS** **API service**

**layer**

**Replace mock**

**data**

❌ Not explicitly

included

Member 3 Member 6 Member 6 Member 6 Member 6 Member 6 Member 6 ❌ Not included Member 4 Member 4 Add React AuthContext

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

✅ Covered

Add CORS configuration

✅ Covered

✅ Covered**Live API**

**integration**

**Loading states** **Success states** **Error states** **Central 401**

**handling**

**Empty state** **Postman testing** **API**

**documentation**

**API contract** GET

/api/auth/me

GET

/api/boards

Member 4 ✅ Covered

Member 4 ✅ Covered

Member 4 ✅ Covered

Member 4 ✅ Covered

⚠ Invalid/expired

token handling exists

Add **centralized** 401 handling in API

client

❌ Not explicitly

included

Add frontend empty-state handling

Member 5 ✅ Covered

Member 5 ✅ Covered

All members ⚠ Update with missing endpoints

❌ Add to API contract

❌ Add to API contractPOST

/api/boards

❌ Add to API contract

GET

/api/boards/:

id/tasks

❌ Add to API contract

PATCH

/api/tasks/\:i

d

❌ Add to API contract

**Git branches** All members ✅ Covered

**Pull**

**requests/code**

**review**

All members ✅ Covered

**Individual**

**testing**

All members ✅ Covered

**Integration**

**testing**

All members ✅ Covered

**Final testing** All members ✅ Covered

The lecture's architecture explicitly requires **routes, controllers, services, and**

**repositories**, while its API contract includes /api/auth/me, board endpoints,

board-task access, and PATCH /api/tasks/\:id.

**Most important missing items**

1. **Service layer**2. **Repository layer**

3. **Board endpoints**

4. GET /api/auth/me

5. **Ownership/membership authorization**

6. **PATCH instead of PUT**

7. **Filtering**

8. **Sorting**

9. **Pagination**

10. **Zod validation**

11. **CORS**

12. .env** / JWT secret management**

13. **JWT expiry**

14. **Never return password hashes**

15. **Consistent success response**

16. **Central 404/error handling**

17. **AuthContext**

18. **Login rate limiting**

**Member 1 — Missing Backend Architecture &**

**Advanced API**

**Branch:** feature/backend-api

**Additional Tasks**

●

●

●

●

●

●

●

●

●

●

Implement **Service layer**

Implement **Repository layer**

Keep business logic inside services

Keep data-access logic inside repositories

Ensure no req or res below the controller layer

Implement **filtering** using query parameters

Implement **sorting**

Implement **pagination**

Add server-side maximum limit for pagination

Handle query parameters such as:

○

status

○

assignee○

○

○

sort

page

limit

**Additional Deliverable:**

Fully layered backend with Route → Controller → Service → Repository architecture

and advanced task querying.

**Member 2 — Missing Authentication**

**Security**

**Branch:** feature/auth

**Additional Tasks**

●

●

●

●

●

●

●

●

Implement GET /api/auth/me

Add **JWT expiration**

Keep JWT\_SECRET in .env

Create .env.example

Ensure JWT secret is never committed

Ensure password hashes are never returned to the frontend

Add **login rate limiting**

Ensure authentication uses:

○

Authorization

○

Bearer \<token>

●

Ensure invalid/expired tokens return 401

**Additional Deliverable:**

Complete and secure authentication system with /me, token expiry, secret

management, password protection, and login protection.

**Member 3 — Missing Authentication**

**State Structure**

**Branch:** feature/frontend-auth**Additional Tasks**

●

●

●

●

●

●

Implement/use **AuthContext**

Store and manage the authenticated user

Maintain authentication state across the React application

Connect authentication state with protected routes

Ensure login updates the global authentication state

Ensure logout clears authentication state

**Additional Deliverable:**

Centralized React authentication state using AuthContext.

**Member 4 — Missing Client–Server**

**Communication**

**Branch:** feature/api-integration

**Additional Tasks**

●

●

●

●

●

●

●

●

Configure **CORS** between React and Express

Configure development API proxy if required

Ensure API requests use the agreed Authorization: Bearer \<token>

format

Handle 401 responses centrally

Automatically remove expired/invalid token on 401

Trigger authentication-expired handling

Ensure frontend handles **empty states** from the real API

Ensure mockTasks.js is completely removed

**Additional Deliverable:**

Fully configured and reliable React ↔ Express communication using the real API.

**Member 5 — Missing Validation &**

**Response Standards**

**Branch:** feature/error-handling-docs**Additional Tasks**

●

●

●

●

●

●

●

●

●

●

Implement **Zod schema validation**

Create schemas for:

○

Task creation

○

Task update

○

Authentication

Implement reusable validation middleware

Return **per-field validation details**

Define a consistent **success response format**

Define a consistent **error response format**

Implement AppError

Implement appropriate error types:

○

Validation Error

○

Not Found Error

○

Forbidden Error

Implement centralized 404 route handling

Ensure 500 errors do not expose stack traces or database details

**Additional Deliverable:**

Consistent Zod validation and standardized API success/error responses.

**Member 6 — Missing Authorization &**

**Ownership**

**Branch:** feature/protected-routes

**Additional Tasks**

●

●

●

●

●

●

●

●

Implement **board access restrictions**

Implement **task ownership/membership checking**

Ensure users can only access boards they belong to

Ensure users cannot read another user's tasks

Ensure users cannot modify another user's tasks

Ensure unauthorized operations return:

○

403 Forbidden, or

○

404 Not Found where appropriate

Test ownership restrictions using Postman

Test authenticated vs unauthorized users**Additional Deliverable:**

Complete ownership-based authorization for boards and tasks.

**Additional Team Task — API Contract**

**Update**

Before development, **all members** should update the API contract to include the

missing lecture endpoints:

**Method** **Endpoint** **Purpose**

GET /api/auth/me Get current authenticated user

GET /api/boards Get user's boards

POST /api/boards Create a board

GET /api/boards/\:id/tasks Get tasks belonging to a board

PATCH /api/tasks/\:id Partially update a task

The lecture's contract uses **PATCH rather than PUT** for task updates.

**In short, the missing work is:**

**Member 1:** Services + Repositories + Filtering + Sorting + Pagination

**Member 2:** /me + JWT expiry + Secrets + Password protection + Rate limiting

**Member 3:** AuthContext + Central authentication state

**Member 4:** CORS + Central 401 handling + Empty states + Remove mock data

**Member 5:** Zod + AppError + Standard response formats + 404/500 handling

**Member 6:** Board/task ownership + Membership authorization

**All:** Update API contract with /me, boards, board tasks, and PATCH.

[image](https://nlearn.nsbm.ac.lk/mod/assign/view.php?id=141228)[**Assignment 02 - Working REST APIs (with mock data) Integrated with Frontend**](https://nlearn.nsbm.ac.lk/mod/assign/view.php?id=141228) ([image](https://nlearn.nsbm.ac.lk/theme/image.php/adaptable/assign/1784172475/icon))

[*** ***](https://nlearn.nsbm.ac.lk/mod/assign/view.php?id=141228)[**Submitted 31 August 2026**](https://nlearn.nsbm.ac.lk/mod/assign/view.php?id=141228)


Please submit the frontend + Backend of SyncBoard client Project.

Write a Report (in docx/pdf) which includes

- Introduction about your project
- Team (Describe each team member's role )
- Github link (Create a tag for Assignment 02 - Working REST APIs (with mock data) Integrated with Frontend). Each members commit should be there.
- README File explaining How to run ?
- API Collocations (Postmon or Swagger)
- Screenshots of frontend + Backend of SyncBoard (Each pages).    **Assignment 02 - Working REST APIs Integrated with Frontend**



  **1. Introduction about our project**



  SyncBoard (Kanban Flow) is an interactive, fullstack Kanban-style task management web application. It is designed to help agile software engineering teams organize, track, and manage project workflows efficiently. For this phase of development, the project focus shifted to building a robust Express REST API backend utilizing a layered architecture, implementing secure JWT authentication and role-based authorization, and connecting the React frontend directly to these new backend endpoints. 



  **2. Team (Roles and Contributions)**



  • **Member 1 (Lochana / RMLK Ranathunga - 33360):** Established the foundational backend infrastructure by initializing the Node.js Express project structure and engineering the core REST API. Developed modular routes and controllers to handle robust CRUD operations, incorporating basic backend input validation and standard HTTP status codes. Refactored the codebase into a strict Route-Controller-Service-Repository pattern, transitioned task updates to use the PATCH method, and introduced dynamic filtering, sorting, and pagination. *(Branch: *feature/backend-api-by-Lochana*)*. 



  • **Member 2 (Pooja / PS Basnayaka):** Engineered and deployed the standalone backend Authentication and Authorization module. Implemented secure user registration and login workflows incorporating bcryptjs password hashing and schema-level defense-in-depth. Achieved stateless session management by issuing signed JSON Web Tokens (JWT) with configurable expiration. Authored custom protect authentication middleware, built protected endpoints, and integrated IP-based login rate limiting. *(Branch: *feature/backend-auth-by-pooja*)*. 



  • **Member 3 (Daham / RPD Sathruwan - 33799):** Developed the entire authentication frontend and global state architecture. Created the registration page component and updated the login page with complete client-side form validation for email formatting, field completion, and password matching. Implemented a centralized AuthContext to manage global user state, login, and logout, which automatically verifies saved JWT tokens for session persistence. *(Branch: *feature/frontend-auth-by-daham*)*. 



  • **Member 4 (Desandu / KBGDH Kariyawasam - 33361):** Connected the React frontend with the backend API using Axios to implement GET, POST, PUT, and DELETE operations for tasks. Connected task creation, deletion, status changes, and member updates with the backend. Completed missing integrations by adding empty-state handling, removing mock data, and implementing Bearer token and centralized 401/expired-token handling. *(Branch: *feature/api-integration\_by\_desandu*)*. 



  • **Member 5 (Nawoda / KNN Kumaranayake - 33759):** Architected the backend's validation layer, standardized response formats, and centralized error handling. Developed robust error-handling middleware utilizing custom error classes alongside standard 500 and 404 responses. Integrated Zod for input validation schemas and authored the comprehensive API contract documentation via a Postman collection. *(Branch: *feature/error-handling-docs-by-nawoda*)*. 



  • **Member 6 (Bihansa / KHB Sithmanthi - 31880):** Focused on frontend security and authentication by creating the ProtectedRoute component to protect pages and control role-based access for members and admins. Created tokenService.js to manage JWT tokens in localStorage and apiClient.js to automatically add Bearer tokens to requests and handle 401/403 errors. Built an Auth Testing Toolbar on the login page to simulate different token situations. *(Branch: *feature/protected-frontend\_by\_bihansa*)*. 



  **3. GitHub Link**



  • **Repository URL:** https://github.com/rmlkloch/Group_14_Fullstackdev.git



  • **Assignment 02 Tag URL:**[https://github.com/rmlkloch/Group\_14\_Fullstackdev/releases/tag/assignment-02](https://github.com/rmlkloch/Group_14_Fullstackdev/releases/tag/assignment-02)



  **4. How to run? (README Instructions)**



  **Prerequisites:** Ensure Node.js (v18.0.0 or higher), npm (v9.0.0 or higher), and MongoDB are installed on your local system. 



  **Step 1: Setup and Run the Backend**



  1. Open a terminal and navigate to the backend directory: cd backend.



  2. Install backend dependencies: npm install.



  3. Create a .env file in the backend/ directory based on the example structure: 



  PORT=5000
  MONGO\_URI=mongodb://127.0.0.1:27017/syncboard
  JWT\_SECRET=your\_jwt\_secret\_key\_here
  JWT\_EXPIRE=30d




  4. Start the backend server: npm run dev (for development mode) or npm start. 



  **Step 2: Setup and Run the Frontend**



  1. Open a new terminal from the project root directory.



  2. Install frontend dependencies: npm install. 



  3. Start the Vite development server: npm run dev. 



  **5. API Collections**



  The complete API contract, including request parameters, authorization requirements, and response examples, has been documented and tested.



  • **Postman Documentation Link:**[https://documenter.getpostman.com/view/57827084/2sBYAuSrDM](https://documenter.getpostman.com/view/57827084/2sBYAuSrDM)



  **6. Screenshots of Frontend + Backend**



  **Frontend Screenshots(they were provided in document)**

  **Milestone 3 — Frontend ↔ Backend**

**Integration**

**Goal: Connect the React frontend to the REST API from M2 and make the**

**application work with real MongoDB data instead of mock data, while**

**adding Mongoose models, database persistence, aggregation,**

**validation, testing, and concurrency control.**

|   |
| - |

Member 

|   |
| - |

Ownership 

|   |
| - |

Area 

|   |
| - |

Main Code 

|   |
| - |

Git branches

|   |
| - |

1 

|   |
| - |

MongoDB

Models &

Schemas

|   |
| - |

Data

Models

|   |
| - |

Models/Schemas 

|   |
| - |

feature/mong

odb-models

|   |
| - |

2 

|   |
| - |

MongoDB

Connection &

Infrastructure

|   |
| - |

DB

Infrastruct

ure

|   |
| - |

Connection/Seed/H

ealth

|   |
| - |

feature/data

base-infrast

ructure

|   |
| - |

3 

|   |
| - |

Persistent

REST API &

Aggregation

|   |
| - |

Persistent

API

|   |
| - |

Controllers/Routes/

Aggregation

|   |
| - |

feature/pers

istent-api

|   |
| - |

4 

|   |
| - |

MongoDB

Queries,

Indexes &

Performance

|   |
| - |

Database

Optimizati

on

|   |
| - |

Queries/Indexes/Per

formance

|   |
| - |

feature/mong

odb-performa

nce

|   |
| - |

5 

|   |
| - |

Validation,

Error

Handling,

Testing &

Concurrency

|   |
| - |

Validation

& Testing

|   |
| - |

Validators/Tests/Con

currency

|   |
| - |

feature/vali

dation-concu

rrency

|   |
| - |

6 

|   |
| - |

React ↔ API

Integration &

Persistence

|   |
| - |

Frontend

Integratio

n

|   |
| - |

React/Services/Stat

e

|   |
| - |

feature/fron

tend-api-int

egration

**Member 1 — MongoDB Models &**

**Schemas**

**Branch:** feature/mongodb-models

**Main responsibility: Build the complete MongoDB data model layer.**

**Ownership:** MongoDB Models & Schemas

**Tasks**

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

Set up Mongoose models

Create User model

Create Board model

Create Task model

Create Activity model

Embed columns inside the Board document

Define field types

Define required fields

Define enum values

Define default values

Define timestamps

Define relationships between entities

Add version field to Task

Define appropriate indexes

Define schema-level validation

Add toJSON transformations where required

Export all models

Create model-level tests

**Suggested structure**

backend/

└── models/

├── User.js

├── Board.js

├── Task.js

└── Activity.js**Board structure**

Board

├──

id

\_

├── name

├── ownerId

├── members[]

├── columns[]

│ ├──

id

\_

│ ├── title

│ └── position

├── createdAt

└── updatedAt

**Deliverable**

Complete MongoDB model layer for User, Board, Task, and

Activity, with columns embedded inside Board, indexes,

validation, timestamps and Task versioning.

**Should NOT Do**

●

●

●

●

●

Build API controllers

Build React components

Build a separate local database

Modify authentication/JWT

Implement concurrency logic

**Independent development**

Member 1 can work almost completely independently using the agreed data

model.

**Member 2 — MongoDB Connection &**

**Database Infrastructure**

**Branch:** feature/database-infrastructure**Main responsibility: Build the infrastructure that connects the**

**Express application to MongoDB.**

**Ownership:** MongoDB Connection, Seed & Infrastructure

**Tasks**

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

Configure MongoDB/MongoDB Atlas

Create database connection module

Configure environment variables

Create .env.example

Configure database startup

Handle connection success

Handle connection failure

Handle database disconnection

Create database initialization logic

Create seed/sample data script

Create database reset/clear script for development

Create GET /api/health

Report Mongoose connection state through health check

Verify persistence after server restart

Document database setup

**Suggested structure**

backend/

├── config/

│ └── database.js

├── scripts/

│ ├── seed.js

│ └── reset.js

└──

.env.example

**Deliverable**

A working MongoDB infrastructure that connects to the existing

Express backend, provides database health checking, seed/reset

functionality and persistent storage.

**Should NOT Do**●

●

●

●

●

Build CRUD controllers

Design MongoDB schemas

Build React UI

Build a separate local database

Implement authentication

**Independent development**

Member 2 can develop and test the database connection separately from the

API controllers.

**Member 3 — Persistent REST API &**

**Aggregation**

**Branch:** feature/persistent-api

**Main responsibility: Convert the existing M2 API from**

**temporary/in-memory data to MongoDB and implement aggregation**

**endpoints.**

**Ownership:** Persistent Task + Board/Column API & Aggregation

**Tasks**

Implement Task API:

GET /api/tasks

GET /api/tasks/\:id

POST /api/tasks

PUT /api/tasks/\:id

DELETE /api/tasks/\:id

Implement Board API:

GET /api/boards

GET /api/boards/\:id

POST /api/boards

PUT /api/boards/\:idDELETE /api/boards/\:id

Manage embedded columns through Board operations.

Also:

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

Replace mock/in-memory data

Connect controllers to Mongoose models

Query MongoDB

Create MongoDB documents

Update MongoDB documents

Delete MongoDB documents

Handle MongoDB ObjectIds

Handle not-found cases

Implement projections

Implement sorting

Implement pagination

Implement aggregation pipelines

Create an aggregation endpoint for useful board/task statistics

Implement overdue-task aggregation

Preserve M2 JWT protection

Preserve existing API response format

Test API endpoints

**Suggested structure**

backend/

├── controllers/

│ ├── taskController.js

│ └── boardController.js

└── routes/

├── taskRoutes.js

└── boardRoutes.js

**Example aggregation**

GET /api/boards/\:boardId/analytics

Can return information such as:●

●

●

●

Tasks per assignee

Overdue tasks

Tasks by status

Task counts for the board

**Deliverable**

Fully working MongoDB-backed REST API with CRUD operations,

queries, pagination and aggregation endpoints.

**Should NOT Do**

●

●

●

●

●

Redesign MongoDB schemas

Build a separate local database

Build React components

Replace authentication

Implement concurrency logic

**Independent development**

Member 3 can develop against the agreed Mongoose models and M2 API

contract without waiting for the frontend.

**Member 4 — MongoDB Queries,**

**Indexes & Performance**

**Branch:** feature/mongodb-performance

**Main responsibility: Improve MongoDB query efficiency, indexing**

**and database performance.**

**Ownership:** MongoDB Queries, Indexes & Performance

**Tasks**

●

●

●

●

Identify frequently used MongoDB queries

Create appropriate indexes

Add indexes for commonly searched fields

Add indexes for board/task relationships●

●

●

●

●

●

●

●

●

●

●

●

●

●

Optimize task queries

Optimize board queries

Optimize user-related queries

Implement efficient filtering

Implement efficient sorting

Implement pagination queries

Use projections where appropriate

Analyze query performance

Use MongoDB explain() where appropriate

Identify inefficient queries

Reduce unnecessary database operations

Test indexed versus non-indexed queries

Verify indexes using MongoDB/Mongoose tools

Document database performance decisions

**Suggested structure**

backend/

├── models/

│ └──

...

├── services/

│ └── queryService.js

└── utils/

└── databasePerformance.js

**Example responsibilities**

Member 4 can optimize queries such as:

Find all tasks for a board

Find overdue tasks

Find tasks assigned to a user

Find tasks by status

Find recently updated tasks

**Deliverable**

An optimized MongoDB query and indexing layer that improves

task/board retrieval, filtering, sorting and pagination performance.**Should NOT Do**

●

●

●

●

●

●

Redesign the overall database schema

Build the main CRUD controllers

Build React components

Modify authentication/JWT

Implement PouchDB or another local database

Implement concurrency logic

**Independent development**

Member 4 can work independently using the agreed Mongoose models and

sample/seed data created for the project.

**Member 5 — Validation, Error Handling,**

**Testing & Concurrency**

**Branch:** feature/validation-concurrency

**Main responsibility: Build the database safety, error handling,**

**automated testing and optimistic concurrency layer.**

**Ownership:** Validation, Error Handling, Testing & Concurrency

**Tasks**

**Validation**

●

●

●

●

●

●

●

Validate MongoDB ObjectIds

Validate required fields

Validate task status

Validate priority

Validate dates

Validate relationships

Validate user/board/task ownership

**Database Errors**

●

Handle duplicate records●

●

●

●

●

Handle duplicate email errors

Handle invalid database operations

Handle Mongoose validation errors

Integrate database errors with M2 error middleware

Standardize database-related errors

**Optimistic Concurrency**

●

Use Task version field

●

●

●

●

●

●

●

Compare client baseVersion with database version

Reject stale updates

Return 409 Conflict

Return current task information when a conflict occurs

Test simultaneous task edits

Support field-level merge where appropriate

Document the chosen conflict strategy

**Testing**

●

●

●

●

●

●

●

●

●

●

●

●

Create database tests

Create API tests

Test valid inputs

Test invalid inputs

Test missing resources

Test unauthorized operations

Test duplicate records

Test aggregation endpoints

Test database errors

Test concurrency conflicts

Test 409 Conflict responses

Test indexes/explain plans where appropriate

**Suggested structure**

backend/

├── validators/

│ ├── taskValidator.js

│ ├── boardValidator.js

│ └── userValidator.js

├── middleware/

│ └── databaseValidation.js└── tests/

├── database/

├── api/

└── concurrency/

**Deliverable**

A validated, tested and concurrency-safe database/API layer with

consistent errors and optimistic conflict detection.

**Should NOT Do**

●

●

●

●

●

Build the entire backend

Redesign MongoDB schemas

Build a separate local database

Build major React features

Replace authentication

**Independent development**

Member 5 can develop tests and validation against the agreed schemas and

API contracts using test data.

**Member 6 — React ↔ API Integration &**

**Persistence**

**Branch:** feature/frontend-api-integration

**Main responsibility: Connect the existing React application to the**

**MongoDB-backed REST API and replace mock data with persistent**

**server data.**

**Ownership:** React API Integration, State & Persistence

**Tasks**

●

●

Replace remaining mock task data

Connect React task board to persistent REST API●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

Connect React board data to REST API

Create/reuse API service module

Load tasks from API

Load boards from API

Create tasks through API

Update tasks through API

Delete tasks through API

Create boards through API

Update boards through API

Delete boards through API

Handle API loading states

Handle API errors

Handle empty states

Keep React state synchronized with server data

Update UI after CRUD operations

Implement appropriate request/response handling

Preserve authentication/JWT

Send authentication token with protected requests

Handle 401 Unauthorized

Handle 403 Forbidden

Handle 404 Not Found

Handle 409 Conflict

Display conflict information to the user

Connect frontend task updates to the concurrency system

Test refresh persistence through MongoDB

Test frontend CRUD operations

Test API integration

**Suggested structure**

src/

├── services/

│ ├── taskService.js

│ ├── boardService.js

│ └── api.js

├── hooks/

│ └── useTasks.js

└── components/

└── Board.jsx**Example API service**

taskService.js

getTasks()

getTask(id)

createTask(data)

updateTask(id, data)

deleteTask(id)

boardService.js

getBoards()

getBoard(id)

createBoard(data)

updateBoard(id, data)

deleteBoard(id)

**Deliverable**

The existing React task board fully integrated with the

MongoDB-backed REST API, replacing mock data with persistent

database data and handling API states, errors and conflicts.

**Should NOT Do**

●

●

●

●

●

●

Modify MongoDB schemas

Write Express controllers

Build MongoDB infrastructure

Replace authentication

Build a separate local database

Take over backend API development

**Independent development**

Member 6 can initially work using the existing M2 API contract and mock

responses, then connect to the MongoDB-backed API during integration.**M3 Final Deliverables**

By the end of M3, the team should have:

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

●

✅ MongoDB/Mongoose database

✅ User, Board, Task and Activity models

✅ Columns embedded inside Boards

✅ Task versioning

✅ MongoDB indexes

✅ MongoDB connection and health check

✅ Seed/reset scripts

✅ Persistent Task and Board REST APIs

✅ Pagination and queries

✅ Aggregation endpoint(s)

✅ Optimized MongoDB queries

✅ Mongoose validation

✅ Database error handling

✅ Automated database/API tests

✅ Optimistic concurrency

✅ 409 Conflict handling

✅ React connected to real MongoDB data through the REST API

✅ Mock data removed from the main application

✅ Frontend CRUD operations connected to backend

✅ API loading/error/empty states

✅ Authentication maintained

✅ Frontend conflict handling

**Important:** This updated M3 plan uses **MongoDB + Mongoose as the**

**database layer**. **PouchDB and separate local/offline persistence are**

**removed from M3.         -----**Milestone 04 — Testing & Quality Assurance Plan

## 1. Overall M4 Goal

Test the SyncBoard application to make sure the **client-side and server-side features work correctly** and that the application can be tested automatically on every push.
The main focus of M4 is:
**Unit Testing → Integration/API Testing → Component Testing → Test Coverage → Continuous Integration (CI)**

---

# 2. M4 Core Requirements

According to the M4 lecture, the team must complete:

- Meaningful **Unit Tests**
- **Integration/API Tests** for the server
- **Component Tests** for the React client
- **Test Coverage** analysis
- **GitHub Actions CI**
- Tests running on a clean machine on every push
- Protected `main` branch that blocks failed CI builds

### Optional

- **End-to-End (E2E) Testing with Playwright**

E2E testing is optional because the lecture identifies it as **bonus marks, not a core M4 requirement**.

---

# 3. Testing Strategy

The team will follow the testing pyramid from the lecture:

| **Testing Level**       | **Purpose**                                                      | **Main Tool**                  |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------ |
| Unit Testing            | Test individual functions, reducers, services and utilities      | Jest / Vitest                  |
| Integration/API Testing | Test multiple server units together and API + database behaviour | Jest + Supertest               |
| Component Testing       | Test React components from the user's perspective                | Vitest + React Testing Library |
| E2E Testing             | Test complete application flows in a real browser                | Playwright — Optional          |
| Test Coverage           | Measure tested code and identify gaps                            | Jest / Vitest Coverage         |
| CI                      | Automatically run tests on every push/PR                         | GitHub Actions                 |

**Testing principle:** More cheap unit tests, some integration/component tests, and only a small number of expensive E2E tests.

---

# 4. What Should Be Tested

The team should focus on **meaningful application behaviour**.

### Worth Testing

- Reducer behaviour
- Service-layer business rules
- Validation rules
- Ownership rules
- Authentication
- Authorization
- API status codes and response data
- Conflict handling
- Utility functions
- React component behaviour
- User interactions
- Async behaviour
- API + database interaction

### Do Not Waste Tests On

- React rendering a simple `<div>`
- Mongoose itself
- Third-party library behaviour
- Exact CSS/styling
- Static text that has no behaviour
- Trivial getters

**Rule:** Test behaviour, not implementation.

---

# 5. Testing Tools

| **Area**                       | **Tool**               |
| ------------------------------ | ---------------------- |
| Server Unit Testing            | Jest                   |
| Server Integration/API Testing | Jest + Supertest       |
| Database Testing               | MongoDB Memory Server  |
| Client Unit/Component Testing  | Vitest                 |
| React Component Testing        | React Testing Library  |
| User Interaction               | user-event             |
| Network Mocking                | MSW                    |
| Coverage                       | Jest / Vitest Coverage |
| CI                             | GitHub Actions         |
| Optional E2E                   | Playwright             |

---

# 6. Team Structure

| **Member** | **Feature Area**                              |
| ---------- | --------------------------------------------- |
| Member 1   | Authentication & Login                        |
| Member 2   | Boards & Columns                              |
| Member 3   | Tasks & Task Management                       |
| Member 4   | Users, Roles & Permissions                    |
| Member 5   | API Features, Filtering, Sorting & Pagination |
| Member 6   | Frontend Dashboard, Navigation & Protected UI |

Each member tests the feature area they already own.

---

# 7. Member 1 — Authentication & Login

**Branch:** `feature/m4-testing-auth-by-member1`

### Main Responsibility

Test the authentication functionality of SyncBoard.

### Tasks

- Write unit tests for authentication utilities/services.
- Test login validation.
- Test valid and invalid login credentials.
- Test JWT/token generation and validation.
- Test authentication middleware.
- Test unauthenticated requests.
- Test authenticated requests.
- Test relevant authorization behaviour.
- Test authentication API endpoints using Supertest.
- Test login-related React components where applicable.
- Check authentication test coverage.

### Main Testing Areas

**Unit → Integration/API → Component → Coverage**

---

# 8. Member 2 — Boards & Columns

**Branch:** `feature/m4-testing-boards-by-member2`

### Main Responsibility

Test board and column functionality.

### Tasks

- Write unit tests for board/column business logic.
- Test board creation.
- Test board retrieval.
- Test board updates.
- Test column operations.
- Test validation rules.
- Test API responses and status codes.
- Test board API + database interaction.
- Test relevant React board components.
- Test unauthorized access to boards where applicable.
- Check test coverage.

### Main Testing Areas

**Unit → Integration/API → Component → Coverage**

---

# 9. Member 3 — Tasks & Task Management

**Branch:** `feature/m4-testing-tasks-by-member3`

### Main Responsibility

Test task management functionality.

### Tasks

- Write unit tests for task-related logic.
- Test task creation.
- Test task retrieval.
- Test task updates.
- Test task deletion.
- Test task validation.
- Test task ownership rules.
- Test task API endpoints using Supertest.
- Test API + MongoDB interaction using MongoDB Memory Server.
- Test relevant Task React components.
- Check test coverage.

### Main Testing Areas

**Unit → Integration/API → Component → Coverage**

---

# 10. Member 4 — Users, Roles & Permissions

**Branch:** `feature/m4-testing-users-by-member4`

### Main Responsibility

Test user management and role/permission behaviour.

### Tasks

- Write unit tests for role and permission logic.
- Test user-related services.
- Test authorization rules.
- Test permitted and forbidden actions.
- Test API responses for unauthorized users.
- Test relevant user APIs.
- Test database interaction where applicable.
- Test relevant React components.
- Check test coverage.

### Main Testing Areas

**Unit → Integration/API → Component → Coverage**

---

# 11. Member 5 — API Features

**Branch:** `feature/m4-testing-api-by-member5`

### Main Responsibility

Test shared API behaviour such as filtering, sorting and pagination.

### Tasks

- Write unit tests for filtering logic.
- Write unit tests for sorting logic.
- Write unit tests for pagination logic.
- Test API query parameters.
- Test correct API response shapes.
- Test HTTP status codes.
- Test validation and error responses.
- Test API + database behaviour.
- Test conflict handling where applicable.
- Check server-side test coverage.

### Main Testing Areas

**Unit → Integration/API → Coverage**
Member 5 focuses mainly on the **server/API side**, avoiding unnecessary duplication of the feature tests owned by Members 1–4.

---

# 12. Member 6 — Frontend Dashboard & Protected UI

**Branch:** `feature/m4-testing-frontend-by-member6`

### Main Responsibility

Test the main React frontend experience.

### Tasks

- Write component tests using React Testing Library.
- Test Dashboard components.
- Test navigation.
- Test protected UI.
- Test loading states.
- Test error states.
- Test user interactions.
- Test forms where applicable.
- Use `user-event` for realistic interactions.
- Use async assertions for asynchronous UI behaviour.
- Use MSW where API requests need to be mocked.
- Check frontend test coverage.

### Main Testing Areas

**Component → Unit → Coverage**

---

# 13. Shared Testing Responsibility

Some testing activities should be coordinated by the whole team instead of being repeated by every member.

| **Activity**            | **Responsibility**                                |
| ----------------------- | ------------------------------------------------- |
| Unit Testing            | Each member for their own feature                 |
| Integration/API Testing | Members responsible for server features           |
| Component Testing       | Members responsible for relevant React components |
| Database Testing        | Relevant backend members                          |
| Authentication Testing  | Member 1                                          |
| Authorization Testing   | Member 1 + Member 4 + relevant feature owners     |
| Coverage                | Each member checks their own area                 |
| CI                      | Shared team responsibility                        |
| E2E Testing             | Optional shared activity                          |

The team should **avoid duplicate tests**.
For example, the same login test should not be independently written by all six members.

---

# 14. Database Testing

The lecture specifically demonstrates using **MongoDB Memory Server** for backend tests.
The team should:

- Create an in-memory MongoDB database.
- Connect the application during tests.
- Create test data.
- Run API operations.
- Check database results.
- Clear test data between tests.
- Close the database after testing.

### Important

Do **not** use the real MongoDB Atlas database for automated CI tests.
This keeps tests isolated and avoids requiring database credentials in GitHub Actions.

---

# 15. React Component Testing

React components should be tested from the **user's perspective**.
Use React Testing Library queries in this order:

1.

```
getByRole
```

1.

```
getByLabelText
```

1. `getByPlaceholderText` / `getByText`
2. `getByTestId` only when necessary

Use:

- `user-event` for user interactions
- `queryBy` when checking that something is absent
- `findBy` for asynchronous elements
- MSW when network requests need to be mocked

The focus should be on **what the user can see and do**, rather than how the component is internally implemented.

---

# 16. Test Coverage

Each member must check coverage for their own tests.
Coverage should be treated as a **signal, not a target**.
The team should pay particular attention to:

- Statements
- Branches
- Functions
- Lines

### Coverage Process

Write Tests
     ↓
Run Tests
     ↓
Generate Coverage
     ↓
Identify Untested Behaviour
     ↓
Add Meaningful Tests

The goal is not simply to achieve a high percentage. The goal is to ensure important application behaviour is covered.

---

# 17. Continuous Integration — GitHub Actions

The team will create a shared GitHub Actions workflow.

### CI Process

Push / Pull Request
        ↓
Checkout Repository
        ↓
Setup Node.js
        ↓
npm ci
        ↓
Run Lint
        ↓
Run Server Tests
        ↓
Run Client Tests
        ↓
Generate Coverage
        ↓
Upload Coverage Report
        ↓
PASS / FAIL
        ↓
Protected Main Branch

### CI Requirements

- Tests must run automatically on every push/PR.
- CI must run on a clean environment.
- MongoDB Memory Server should be used instead of a real database.
- Secrets must not be written directly in the workflow file.
- Failed tests should make the CI build fail.
- `main` should require successful CI before merging.

---

# 18. Optional E2E Testing

**E2E testing is optional for M4.**
The lecture identifies Playwright E2E testing as **bonus marks rather than a core requirement**.
If the team has enough time, a small number of important complete flows can be tested, such as:
Login
  ↓
Open Dashboard
  ↓
Open Board
  ↓
Create Task
  ↓
View Task

Only a **few important E2E tests** should be created because they are slower and more fragile than unit, integration and component tests.

---

# 19. Testing Evidence

Each member should provide evidence of completed testing.

| **Evidence**    | **Example**                        |
| --------------- | ---------------------------------- |
| Unit Tests      | Jest/Vitest test results           |
| API Tests       | Supertest results                  |
| Database Tests  | MongoDB Memory Server test results |
| Component Tests | React Testing Library results      |
| Coverage        | Coverage report                    |
| CI              | GitHub Actions successful run      |
| Optional E2E    | Playwright report/screenshots      |

### Evidence Format

| **Test**       | **Scenario**      | **Expected**   | **Actual**      | **Result** | **Evidence** |
| -------------- | ----------------- | -------------- | --------------- | ---------- | ------------ |
| Login Test     | Valid credentials | Login succeeds | Login succeeded | PASS       | Screenshot   |
| Login Test     | Invalid password  | 401 response   | 401 response    | PASS       | Test result  |
| Task Test      | Create task       | Task created   | Task created    | PASS       | Test result  |
| Component Test | Open TaskCard     | Task displayed | Task displayed  | PASS       | Test result  |

---

# 20. Git Branches

Each member works on their own M4 testing branch:
feature/m4-testing-auth-by-member1
feature/m4-testing-boards-by-member2
feature/m4-testing-tasks-by-member3
feature/m4-testing-users-by-member4
feature/m4-testing-api-by-member5
feature/m4-testing-frontend-by-member6

After completing testing:
Feature Branch
      ↓
Pull Request
      ↓
GitHub Actions CI
      ↓
Code Review
      ↓
Merge to Main



---

# 21. Shared Team Workflow

Every member follows the same process:
1\. Create M4 testing branch
        ↓
2\. Test own feature
        ↓
3\. Write meaningful automated tests
        ↓
4\. Run tests locally
        ↓
5\. Fix failed tests
        ↓
6\. Check coverage
        ↓
7\. Commit changes
        ↓
8\. Push branch
        ↓
9\. Create Pull Request
        ↓
10\. CI runs automatically
        ↓
11\. Team reviews
        ↓
12\. Merge when CI is green



---

# 22. Final M4 Deliverables

At the end of M4, the team should have:

- Meaningful server-side unit tests
- Server integration/API tests
- MongoDB Memory Server testing
- React component tests
- Meaningful client-side tests
- Test coverage reports
- GitHub Actions CI
- Tests running automatically on every push/PR
- Protected `main` branch
- Testing evidence
- Optional Playwright E2E tests for bonus marks

---

# 23. Final M4 Testing Structure

The complete M4 approach is:
                M4 TESTING
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
      UNIT       INTEGRATION     COMPONENT
        │           / API            │
        │             │              │
        └─────────────┼──────────────┘
                      ↓
                 TEST COVERAGE
                      ↓
                  GITHUB CI
                      ↓
               PROTECTED MAIN

        Optional: Playwright E2E

### Core M4

**Unit Testing + Integration/API Testing + Component Testing + Coverage + CI**

### Optional

**E2E Testing with Playwright**
This keeps M4 aligned with the lecture while maintaining a balanced workload across all six members.  Milestone 05

# Real-Time, DevOps & Launch Plan

## Overall M5 Goal

Implement real-time collaboration in SyncBoard using **Socket.IO**, keep users synchronized during updates and reconnections, containerise the application using **Docker**, configure **Nginx and Docker Compose**, and prepare the application for **production deployment**.

---

# Team Structure

| **Member**   | **Own Feature Area**                                      |
| ------------ | --------------------------------------------------------- |
| **Member 1** | Socket.IO Server, Authentication & Real-Time Architecture |
| **Member 2** | Real-Time Task & Board Events                             |
| **Member 3** | Rooms, Synchronization & Reconnection                     |
| **Member 4** | Frontend Socket.IO Integration & Presence                 |
| **Member 5** | Docker, Nginx & Docker Compose                            |
| **Member 6** | Production Configuration & Deployment                     |

---

# Member 1 — Socket.IO Server, Authentication & Real-Time Architecture

**Branch:** `feature/socketio-server-by-name`
**Main responsibility:** Build the core Socket.IO infrastructure and secure real-time connection.
**Ownership:** Backend Socket.IO server and authentication

### Tasks

- Attach Socket.IO to the existing Express HTTP server.
- Configure `CLIENT_ORIGIN`.
- Install and configure `socket.io`.
- Implement Socket.IO connection handling.
- Authenticate the Socket.IO handshake using the existing JWT.
- Read token from `socket.handshake.auth?.token`.
- Verify the JWT before accepting the connection.
- Reject missing or invalid tokens.
- Do not send JWT through query parameters.
- Create the main real-time event structure.
- Make Socket.IO available to REST controllers using `req.app.get("io")`.
- Define the common event naming structure:
  -
  ```
  task:created
  ```
  1.
  ```
  task:updated
  ```
  1.
  ```
  task:deleted
  ```
  1.
  ```
  board:updated
  ```
  1.
  ```
  member:joined
  ```
  1.
  ```
  presence:update
  ```

---

# Member 2 — Real-Time Task & Board Events

**Branch:** `feature/realtime-events-by-name`
**Main responsibility:** Make task and board changes broadcast to connected users.
**Ownership:** Real-time task and board events

### Tasks

- Connect task CRUD operations with Socket.IO.
- Emit `task:created` after a task is created.
- Emit `task:updated` after a task is updated or moved.
- Emit `task:deleted` after a task is deleted.
- Emit `board:updated` when board-level information changes.
- Broadcast changes to the correct board.
- Use `io.to(room).emit()` where the sender should also receive the update.
- Prevent unnecessary duplicate updates.
- Keep REST API operations as the source of actual database changes.
- Ensure real-time events reflect successful backend operations.

---

# Member 3 — Rooms, Synchronization & Reconnection

**Branch:** `feature/realtime-sync-by-name`
**Main responsibility:** Keep users connected to the correct boards and recover synchronization after connection problems.
**Ownership:** Rooms, reconnection and synchronization

### Tasks

- Create board rooms using:
  -
  ```
  board:<id>
  ```
- Allow users to join the appropriate board room.
- Ensure users only receive updates for boards they belong to.
- Implement room join handling.
- Handle Socket.IO reconnection.
- Rejoin board rooms after reconnecting.
- Refetch the latest board state after reconnecting.
- Handle missed events because Socket.IO does not replay events automatically.
- Coordinate with the existing offline queue where applicable.
- Prevent duplicate socket listeners.
- Handle out-of-order or duplicate updates where necessary.
- Keep the client and server state synchronized.

---

# Member 4 — Frontend Socket.IO Integration & Presence

**Branch:** `feature/frontend-realtime-by-name`
**Main responsibility:** Connect the React frontend to Socket.IO and implement live presence.
**Ownership:** Frontend real-time communication and presence

### Tasks

- Install and configure `socket.io-client`.
- Create the frontend Socket.IO connection.
- Send the JWT using the Socket.IO `auth` option.
- Connect and disconnect users correctly.
- Listen for:
  -
  ```
  task:created
  ```
  1.
  ```
  task:updated
  ```
  1.
  ```
  task:deleted
  ```
  1.
  ```
  board:updated
  ```
  1.
  ```
  presence:update
  ```
- Update React state when real-time events arrive.
- Avoid duplicate event listeners.
- Display currently online board members.
- Implement presence updates.
- Handle connection and reconnection states in the UI.
- Ensure real-time changes appear without manually refreshing the page.

---

# Member 5 — Docker, Nginx & Docker Compose

**Branch:** `feature/docker-devops-by-name`
**Main responsibility:** Containerise the frontend and backend and configure the complete local production-like environment.
**Ownership:** Docker and infrastructure configuration

### Tasks

- Create backend `Dockerfile`.
- Create frontend multi-stage `Dockerfile`.
- Create `.dockerignore` files.
- Configure Nginx for the React SPA.
- Configure Nginx `/api/` proxy to the backend.
- Configure Nginx `/socket.io/` proxy.
- Enable WebSocket Upgrade and Connection headers.
- Create `docker-compose.yml`.
- Add MongoDB service with persistent volume.
- Add MongoDB health check.
- Configure backend environment variables.
- Configure frontend `VITE_API_URL` as a build-time argument.
- Configure service dependencies.
- Run the complete application through Docker Compose.

---

# Member 6 — Production Configuration & Deployment

**Branch:** `feature/production-deployment-by-name`
**Main responsibility:** Configure the application for public deployment and production environment settings.
**Ownership:** Production environment and launch configuration

### Tasks

- Prepare production environment variables:
  -
  ```
  MONGODB_URI
  ```
  1.
  ```
  JWT_SECRET
  ```
  1.
  ```
  CLIENT_ORIGIN
  ```
- Configure production CORS.
- Configure the frontend production API URL.
- Ensure MongoDB Atlas is used for the deployed application.
- Add/confirm `/api/health` endpoint for deployment health.
- Configure the deployed frontend and backend URLs.
- Ensure HTTPS is used in production.
- Ensure WebSocket connections work through the production proxy.
- Confirm WSS is used automatically with HTTPS.
- Deploy the application publicly.
- Handle basic production configuration issues such as:
  - Incorrect API URL
  - CORS origin problems
  - WebSocket connection/upgrade problems
  - MongoDB connection configuration

---

# Shared Team Responsibility

All members should work together on:

- Integrating their branches without breaking existing functionality.
- Using the existing JWT authentication system.
- Following the existing React → Express → MongoDB architecture.
- Ensuring real-time functionality works with the existing SyncBoard features.
- Keeping environment secrets out of GitHub.
- Using the same branch-per-feature workflow.
- Coordinating the final Docker and deployment integration.

### Final M5 Flow

**Socket.IO Server → Authentication → Rooms → Real-Time Events → Frontend Integration → Synchronization/Reconnection → Docker → Nginx → Production Configuration → Public Deployment**
This keeps **M5 strictly focused on the lecture's Real-Time, DevOps & Launch content**, while leaving **testing/evidence** and **README/demo/handover** for their appropriate stages.

[**Assignment 03 - Working Full stack application (Frontend , Backend and Database)**](https://nlearn.nsbm.ac.lk/mod/assign/view.php?id=141819)

[* *](https://nlearn.nsbm.ac.lk/mod/assign/view.php?id=141819)[Not Submitted](https://nlearn.nsbm.ac.lk/mod/assign/view.php?id=141819)

[**Due 14 September 2026**](https://nlearn.nsbm.ac.lk/mod/assign/view.php?id=141819)

Please submit the frontend + Backend + Database of SyncBoard client Project.

Write a Report (in docx/pdf) which includes

- Introduction about your project
- Team (Describe each team member's role )
- Atlas Free Database account
- Github link (Create a tag for Assignment 03 - Working Full stack application (Frontend , Backend and Database)). Each members commit should be there.
- README File explaining How to run ?
- API Collocations (Postmon or Swagger)
- Screenshots of frontend + Backend +Database of SyncBoard (Each pages) -- 

