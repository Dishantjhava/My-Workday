/* ═══════════════════════════════════════════════
   MY WORKDAY — MOCK DATA
═══════════════════════════════════════════════ */

const TASKS = [
  {
    id: 't1',
    title: 'API Integration Specification',
    priority: 'high',
    status: 'overdue',
    deadline: '2026-09-16',
    deadlineLabel: 'Yesterday',
    assignedBy: 'Sarah Mitchell',
    assignedByInitial: 'S',
    assignedByColor: '#6366F1',
    progress: 60,
    description: 'Finalize the REST API integration specification document for the payment gateway module. Include endpoint definitions, authentication flow, rate limiting, and error handling scenarios.',
    outcome: 'A complete API spec document reviewed and approved by the backend team, ready for sprint implementation next Monday.',
    messages: [
      { from: 'alex', text: 'Should I include the webhook endpoints in this spec as well?', time: '9:30 AM', date: 'Sep 15' },
      { from: 'sarah', text: 'Yes, definitely include webhooks. Also add rate limiting details — we need 100req/min per user.', time: '10:15 AM', date: 'Sep 15' },
      { from: 'alex', text: 'Got it, adding those sections now. One more thing — should error codes follow the existing standard or define new ones?', time: '10:22 AM', date: 'Sep 15' }
    ],
    activity: [
      { text: 'Task created by Sarah Mitchell', time: 'Sep 14 · 9:00 AM' },
      { text: 'Alex Chen changed status to In Progress', time: 'Sep 15 · 11:30 AM' },
      { text: 'Sarah Mitchell replied in Q&A', time: 'Sep 15 · 10:15 AM' },
      { text: 'Task became overdue', time: 'Sep 16 · 12:00 AM' }
    ]
  },
  {
    id: 't2',
    title: 'Review PR #142 — Auth Refactor',
    priority: 'high',
    status: 'in-progress',
    deadline: '2026-09-17',
    deadlineLabel: 'Due today',
    assignedBy: 'Sarah Mitchell',
    assignedByInitial: 'S',
    assignedByColor: '#6366F1',
    progress: 45,
    description: 'Review the authentication module refactoring pull request. Check for security vulnerabilities, code quality issues, proper error handling, and adequate test coverage before merging.',
    outcome: 'Approved or rejected PR with detailed inline review comments. Minimum 80% test coverage required before approval.',
    messages: [
      { from: 'alex', text: 'Found a potential XSS vulnerability in the session token handling at line 234 — investigating the impact now.', time: '11:00 AM', date: 'Today' }
    ],
    activity: [
      { text: 'Task created by Sarah Mitchell', time: 'Sep 16 · 2:00 PM' },
      { text: 'Alex Chen changed status to In Progress', time: 'Sep 17 · 9:00 AM' }
    ]
  },
  {
    id: 't3',
    title: 'Write Unit Tests — Payment Module',
    priority: 'medium',
    status: 'pending',
    deadline: '2026-09-18',
    deadlineLabel: 'Due tomorrow',
    assignedBy: 'Sarah Mitchell',
    assignedByInitial: 'S',
    assignedByColor: '#6366F1',
    progress: 0,
    description: 'Write comprehensive unit tests for the payment processing module including success cases, partial payment failures, timeout scenarios, and currency edge cases.',
    outcome: 'A test suite with minimum 90% code coverage, all passing in CI/CD pipeline, with a brief coverage report shared in the PR.',
    messages: [],
    activity: [
      { text: 'Task created by Sarah Mitchell', time: 'Sep 17 · 8:00 AM' }
    ]
  },
  {
    id: 't4',
    title: 'Update Project Documentation',
    priority: 'low',
    status: 'pending',
    deadline: '2026-09-20',
    deadlineLabel: 'Due in 3 days',
    assignedBy: 'Sarah Mitchell',
    assignedByInitial: 'S',
    assignedByColor: '#6366F1',
    progress: 0,
    description: 'Update the project README and internal Confluence pages with the latest architecture changes, new API endpoints, and updated deployment instructions for the staging environment.',
    outcome: 'Updated documentation accessible to all team members, reviewed by at least one other engineer.',
    messages: [],
    activity: [
      { text: 'Task created by Sarah Mitchell', time: 'Sep 16 · 4:00 PM' }
    ]
  },
  {
    id: 't5',
    title: 'Setup CI/CD Pipeline',
    priority: 'medium',
    status: 'done',
    deadline: '2026-09-17',
    deadlineLabel: 'Completed',
    assignedBy: 'Sarah Mitchell',
    assignedByInitial: 'S',
    assignedByColor: '#6366F1',
    progress: 100,
    description: 'Configure GitHub Actions for automated testing on every PR and deployment to staging environment on merge to main branch.',
    outcome: 'Fully working CI/CD pipeline with green badges on the repo README.',
    messages: [
      { from: 'alex', text: 'Pipeline is live! All 142 tests pass. Deployment to staging verified.', time: '3:00 PM', date: 'Today' },
      { from: 'sarah', text: 'Amazing work Alex! Closing this one.', time: '3:30 PM', date: 'Today' }
    ],
    activity: [
      { text: 'Task created by Sarah Mitchell', time: 'Sep 15 · 10:00 AM' },
      { text: 'Alex Chen changed status to In Progress', time: 'Sep 16 · 2:00 PM' },
      { text: 'Alex Chen changed status to Done', time: 'Sep 17 · 3:00 PM' },
      { text: 'Sarah Mitchell closed the task', time: 'Sep 17 · 3:30 PM' }
    ]
  }
];

const TEAM_MEMBERS = [
  {
    id: 'm1', name: 'Alex Chen', role: 'Software Engineer',
    initial: 'A', color: '#6366F1',
    tasks: { done: 4, total: 6 }, status: 'on-track', lastActive: '2 hours ago',
    standup: 'Working on the API integration spec and PR #142 review today. Should have both completed by EOD. No blockers currently.'
  },
  {
    id: 'm2', name: 'Maya Patel', role: 'UI/UX Designer',
    initial: 'M', color: '#F59E0B',
    tasks: { done: 2, total: 5 }, status: 'needs-attention', lastActive: '4 hours ago',
    standup: 'Stuck on the design system review. Need feedback from Alex on the component library before I can proceed with the dashboard screens.'
  },
  {
    id: 'm3', name: 'Raj Kumar', role: 'QA Engineer',
    initial: 'R', color: '#10B981',
    tasks: { done: 5, total: 5 }, status: 'done', lastActive: '30 min ago',
    standup: 'All tasks completed! Running final regression suite on staging. Everything looks good — no critical bugs found.'
  },
  {
    id: 'm4', name: 'Priya Sharma', role: 'Backend Engineer',
    initial: 'P', color: '#EC4899',
    tasks: { done: 1, total: 4 }, status: 'overdue', lastActive: '6 hours ago',
    standup: null
  }
];

const NOTIFICATIONS = [
  { id: 'n1', text: 'Sarah Mitchell commented on API Integration Spec', time: '10:15 AM', read: false, icon: '💬' },
  { id: 'n2', text: 'Deadline approaching: Review PR #142 is due today at 5PM', time: '1:00 PM', read: false, icon: '⏰' },
  { id: 'n3', text: 'New task assigned: Write Unit Tests — Payment Module', time: '8:05 AM', read: false, icon: '📋' },
  { id: 'n4', text: 'Raj Kumar completed all 5 tasks for today', time: 'Yesterday', read: true, icon: '✅' },
  { id: 'n5', text: 'Weekly progress report is ready to view', time: 'Yesterday', read: true, icon: '📊' }
];

const ONE_ON_ONES = [
  {
    id: 'o1', name: 'Sarah Mitchell', role: 'Engineering Manager',
    initial: 'S', color: '#6366F1',
    nextSession: 'Tomorrow · 2:00 PM', lastSession: '1 week ago',
    notes: 'Topics: Sprint retro, Q4 goals, career growth'
  }
];
