# Milestone 4 Frontend Testing Evidence

## Component Tests

| Test | Scenario | Expected | Actual | Result | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ProtectedRoute Component** | Unauthenticated user (API returns 401 or no token) | User is redirected to fallback/login component and protected content is not shown. | User is redirected to fallback/login component and protected content is not shown. | Pass | Screenshot of Vitest terminal output |
| **ProtectedRoute Component** | Authenticated user (API returns 200) | Protected child components are rendered without redirecting. | Protected child components are rendered without redirecting. | Pass | Screenshot of Vitest terminal output |
| **Dashboard Component** | Initial render before data fetch completes | Displays loading state initially. | Displays loading state initially. | Pass | Screenshot of Vitest terminal output |
| **Dashboard Component** | Data fetch completes successfully | Fetches and displays board data using mock MSW handlers. | Fetches and displays board data using mock MSW handlers. | Pass | Screenshot of Vitest terminal output |
| **Header Component** | Render active profile session | Displays the current user's profile information. | Displays the current user's profile information. | Pass | Screenshot of Vitest terminal output |
| **Header Component** | Click on navigation links | Renders navigation links and handles click events, triggering the `onNavigate` callback. | Renders navigation links and handles click events, triggering the `onNavigate` callback. | Pass | Screenshot of Vitest terminal output |
| **SidePanel Component** | Initial default render | Renders the team members and buttons correctly. | Renders the team members and buttons correctly. | Pass | Screenshot of Vitest terminal output |
| **SidePanel Component** | User clicks Member History toggle | Clicking the Member History button reveals the calendar filter. | Clicking the Member History button reveals the calendar filter. | Pass | Screenshot of Vitest terminal output |

## Coverage Summary

The core frontend components achieved solid coverage using Vitest and the v8 coverage provider. The overall coverage for the `components` directory is **76.19% Statements** and **80% Lines**.

**Detailed Component Coverage:**
- **Header.jsx:** 100% Stmts \| 100% Branch \| 100% Funcs \| 100% Lines
- **Dashboard.jsx:** 91.66% Stmts \| 100% Branch \| 83.33% Funcs \| 91.66% Lines
- **ProtectedRoute.jsx:** 66.66% Stmts \| 50.00% Branch \| 66.66% Funcs \| 71.42% Lines
- **SidePanel.jsx:** 63.63% Stmts \| 69.23% Branch \| 50.00% Funcs \| 70.00% Lines

Overall, the essential functionality (route guarding, MSW API mocking, user interaction, UI navigation) is effectively tested and adequately covered, ensuring a robust frontend structure.
