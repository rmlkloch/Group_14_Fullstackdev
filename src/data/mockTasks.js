/**
 * Mock task dataset for Kanban Flow application.
 * Covers statuses: 'To do', 'Doing', 'Done'
 * Covers tags: 'Design', 'Testing', 'Security', 'DevOps', 'Bugfix'
 * Covers assigned team members: 'JD', 'AM', 'SK', 'EL', 'OW'
 */

export const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Design high-fidelity landing page mockup',
    description: 'Create a responsive, high-fidelity Figma mockup for the main landing page incorporating the new brand guidelines.',
    dueDate: 'Oct 12',
    tag: 'Design',
    assignedTo: 'JD',
    status: 'To do',
    column: 'To do',
  },
  {
    id: 2,
    title: 'Implement OAuth2 authentication middleware',
    description: 'Set up Google and GitHub OAuth providers in the backend API and connect the frontend login flow.',
    dueDate: 'Oct 14',
    tag: 'Security',
    assignedTo: 'AM',
    status: 'Doing',
    column: 'Doing',
  },
  {
    id: 3,
    title: 'Profile & fix memory leak in WebSocket connection layer',
    description: 'Investigate the memory spike observed during high concurrent WebSocket connections. Trace allocations and apply fix.',
    dueDate: 'Oct 15',
    tag: 'Bugfix',
    assignedTo: 'SK',
    status: 'Doing',
    column: 'Doing',
  },
  {
    id: 4,
    title: 'Set up automated CI/CD pipeline on GitHub Actions',
    description: 'Configure standard linting, unit testing, and automated deployment stages for the main repository using GitHub Actions.',
    dueDate: 'Oct 10',
    tag: 'DevOps',
    assignedTo: 'EL',
    status: 'Done',
    column: 'Done',
  },
  {
    id: 5,
    title: 'Write comprehensive integration tests for payments controller',
    description: 'Increase test coverage on the payments controller. Mock Stripe API responses and handle webhook edge cases.',
    dueDate: 'Oct 20',
    tag: 'Testing',
    assignedTo: 'OW',
    status: 'To do',
    column: 'To do',
  },
  {
    id: 6,
    title: 'Audit application dependencies for security vulnerabilities',
    description: 'Run security scanners on node modules and container base images. Upgrade vulnerable packages to safe versions.',
    dueDate: 'Oct 08',
    tag: 'Security',
    assignedTo: 'JD',
    status: 'Done',
    column: 'Done',
  },
  {
    id: 7,
    title: 'Fix layout overflow on mobile viewport filter bar',
    description: 'Resolve horizontal scrolling and overlapping badge UI issues when filtering tasks on mobile viewports.',
    dueDate: 'Oct 18',
    tag: 'Bugfix',
    assignedTo: 'AM',
    status: 'To do',
    column: 'To do',
  },
];

export default INITIAL_TASKS;
