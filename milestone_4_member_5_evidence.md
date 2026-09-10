# Milestone 4 — Member 5 Testing Evidence & Quality Assurance Report

**Member:** Member 5 (API Features, Filtering, Sorting & Pagination)  
**Branch:** `feature/m4-testing-api-by-pooja`  
**Target Feature Area:** Server-side Shared API Behavior (Filtering, Sorting, Pagination, HTTP Status Codes, Response Shapes)

---

## 1. Test Coverage Summary

| Metric | Coverage % | Description |
| :--- | :--- | :--- |
| **Statements** | 100% (`apiFeatures.js`) / 58.73% Total | 100% statement coverage on query features utility |
| **Branches** | 87.27% (`apiFeatures.js`) / 58.94% Total | Handles edge cases, invalid inputs, and alias field mappings |
| **Functions** | 100% (`apiFeatures.js`) / 73.33% Total | Complete functional coverage of feature helpers |
| **Lines** | 100% (`apiFeatures.js`) / 58.06% Total | All lines executed and validated |

---

## 2. Milestone 4 Testing Evidence Table

| Test Scenario | Expected | Actual | Result (PASS/FAIL) | Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Unit: Pagination Calculation** | `page=2, limit=5` yields `skip: 5, limit: 5` | `skip: 5, limit: 5` | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Pagination Defaults** | Omitted params yield `page: 1, limit: 10, skip: 0` | `page: 1, limit: 10, skip: 0` | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Pagination Invalid Handling** | `page="invalid", limit="-5"` falls back to defaults | `page: 1, limit: 10, skip: 0` | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Sorting Ascending Order** | `sortBy="title", order="asc"` maps to `{ title: 1 }` | `{ title: 1 }` | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Sorting Descending Order** | `sortBy="priority", order="desc"` maps to `{ priority: -1 }` | `{ priority: -1 }` | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Sorting Defaults** | Omitted sort params yield `{ createdAt: -1 }` | `{ createdAt: -1 }` | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Filter Parameter Parsing** | `status="To Do", priority="High"` parses into MongoDB query | `{ status: 'To Do', priority: 'High' }` | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Reserved Parameter Exclusion** | `page`, `limit`, `sortBy`, `order` excluded from filter object | Reserved keys removed, only filter fields retained | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Alias Mapping** | `assignedTo="user123"` mapped to `assignee` key | `{ assignee: 'user123' }` | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: Whitelist Key Filtering** | Unallowed query keys stripped when whitelist provided | Unallowed keys ignored | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Unit: APIFeatures Chainability** | Chainable `.filter().sort().paginate()` execution | Mongoose query methods invoked with criteria | **PASS** | `backend/tests/unit/apiFeatures.unit.test.js` |
| **Integration: API Pagination** | `GET /api/tasks?page=1&limit=2` returns 200 OK, 2 tasks & metadata | HTTP 200 OK, 2 tasks, `totalTasks: 6, totalPages: 3` | **PASS** | `backend/tests/integration/apiEndpoints.integration.test.js` |
| **Integration: API Filtering** | `GET /api/tasks?status=Done` returns 200 OK & only Done tasks | HTTP 200 OK, 2 tasks returned, all with `status: 'Done'` | **PASS** | `backend/tests/integration/apiEndpoints.integration.test.js` |
| **Integration: API Sorting** | `GET /api/tasks?sortBy=createdAt&order=asc` returns 200 OK in ascending date order | HTTP 200 OK, tasks sorted chronologically ascending | **PASS** | `backend/tests/integration/apiEndpoints.integration.test.js` |
| **Integration: Error - Invalid Limit** | `GET /api/tasks?limit=-5` returns 400 Bad Request | HTTP 400 Bad Request with descriptive message | **PASS** | `backend/tests/integration/apiEndpoints.integration.test.js` |
| **Integration: Error - Invalid Page** | `GET /api/tasks?page=abc` returns 400 Bad Request | HTTP 400 Bad Request with descriptive message | **PASS** | `backend/tests/integration/apiEndpoints.integration.test.js` |

---

## 3. Execution Command Summary

- **Unit Testing:** `npm test tests/unit/apiFeatures.unit.test.js`
- **Integration Testing:** `npm test tests/integration/apiEndpoints.integration.test.js`
- **Coverage Command:** `npx jest tests/unit/apiFeatures.unit.test.js tests/integration/apiEndpoints.integration.test.js --coverage --collectCoverageFrom="utils/apiFeatures.js" --collectCoverageFrom="controllers/taskController.js"`
