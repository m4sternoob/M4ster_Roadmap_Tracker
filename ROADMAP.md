# m4ster-tracker Roadmap

## Vision
Build the best open-source roadmap tracker for product teams — fast, accessible, offline-first, and extensible.

---

## v1.0 — Foundation ✅ COMPLETE
**Released: 2024**

| Feature | Status |
|---------|--------|
| Kanban board (5 columns) | ✅ |
| Drag-and-drop (@dnd-kit) | ✅ |
| Issue CRUD (type, priority, story points, labels, assignee, due date) | ✅ |
| Epic management (color-coded, issue grouping) | ✅ |
| Sprint lifecycle (Planning → Active → Complete) | ✅ |
| Burndown charts (SVG) | ✅ |
| Dark/light theme (persisted) | ✅ |
| localStorage persistence | ✅ |
| Export/import JSON | ✅ |
| TypeScript strict + path aliases | ✅ |
| Vitest + Testing Library setup | ✅ |
| CI/CD (lint, test, build, Docker) | ✅ |
| Docker + nginx production config | ✅ |

---

## v1.1 — Polish & Accessibility 🔄 NEXT (Week 1-2)

### Search & Navigation
- [ ] Global search (Cmd+K) — filter issues by title, key, labels, assignee
- [ ] Column filters (priority, type, assignee, epic, sprint)
- [ ] Keyboard shortcuts: `n` new issue, `e` new epic, `s` new sprint, `/` search, `?` help
- [ ] Column collapse/expand
- [ ] Board zoom (compact/comfortable)

### PWA & Offline
- [ ] Web App Manifest + Service Worker (Workbox)
- [ ] Offline fallback page
- [ ] Install prompt
- [ ] Background sync for future backend

### Accessibility Audit
- [ ] Full ARIA audit (roles, labels, live regions)
- [ ] Focus traps in modals
- [ ] Drag-drop keyboard alternative (arrow keys + Enter/Space)
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Color contrast verification (WCAG AA)
- [ ] Reduced motion support

### Performance
- [ ] Virtualized columns (react-window)
- [ ] Memoized selectors (reselect or Zustand selectors)
- [ ] Code-split modals (React.lazy + Suspense)
- [ ] Image optimization (none currently, but ready)

---

## v1.2 — Collaboration & Backend ⏳ PLANNED (Week 3-5)

### Backend API
- [ ] Node/Express or Go backend
- [ ] PostgreSQL + Prisma/Drizzle
- [ ] REST + WebSocket (Socket.io or native WS)
- [ ] Auth: Clerk / Auth0 / NextAuth (email, GitHub, Google)
- [ ] Row-level security / project permissions

### Real-time
- [ ] Live issue updates across clients
- [ ] Presence indicators (who's viewing)
- [ ] Optimistic UI with server reconciliation

### Comments & Activity
- [ ] Threaded comments on issues
- [ ] @mentions with notifications
- [ ] Activity feed (created, moved, assigned, commented)
- [ ] Markdown support in descriptions/comments

### Teams & Projects
- [ ] Multi-project support
- [ ] Team workspaces
- [ ] Roles: Owner, Admin, Member, Viewer
- [ ] Project invitations (email + link)
- [ ] Project settings (columns, workflows, issue types)

---

## v1.3 — Integrations ⏳ PLANNED (Week 5-7)

### Git Sync
- [ ] GitHub Issues ↔ m4ster-tracker (bi-directional)
- [ ] GitLab Issues sync
- [ ] Link PRs to issues, auto-transition on merge
- [ ] Webhook receiver for GitHub/GitLab events

### Chat & Calendar
- [ ] Slack notifications (new issue, assignment, mentions)
- [ ] Discord webhook support
- [ ] Calendar export (.ics) for sprint dates
- [ ] Google Calendar / Outlook sync

### Import/Export
- [ ] Jira CSV import
- [ ] Linear CSV import
- [ ] Trello JSON import
- [ ] Notion database import
- [ ] Asana CSV import
- [ ] Custom field mapping UI

---

## v2.0 — Intelligence & Customization ⏳ PLANNED (Week 8-12)

### Time Tracking & Analytics
- [ ] Manual time logging per issue
- [ ] Start/stop timer
- [ ] Velocity reports (per sprint, per person)
- [ ] Cycle time / lead time charts
- [ ] Burndown history (per sprint)
- [ ] Forecasting (Monte Carlo simulation)

### AI Assist (Local-first, optional cloud)
- [ ] Sprint planning suggestions (based on velocity)
- [ ] Duplicate issue detection
- [ ] Auto-generate descriptions from titles
- [ ] Sprint retrospective summary
- [ ] Priority recommendation

### Customization
- [ ] Custom fields (text, number, select, date, user)
- [ ] Custom workflows (statuses, transitions)
- [ ] Custom issue types per project
- [ ] Automation rules (if X then Y)
- [ ] Webhooks (outgoing)

### Advanced
- [ ] Dependencies (blocks / blocked by)
- [ ] Issue hierarchies (epic → story → subtask tree view)
- [ ] Roadmap timeline view (Gantt-like)
- [ ] Capacity planning per sprint
- [ ] Release management (versions, changelog)

---

## v2.1 — Platform ⏳ PLANNED

- [ ] Public API (REST + GraphQL)
- [ ] Webhook system (incoming/outgoing)
- [ ] Plugin/extension system
- [ ] Marketplace for templates, automations
- [ ] Mobile app (React Native / Capacitor)
- [ ] Electron desktop app

---

## Release Cadence

| Version | Target | Type |
|---------|--------|------|
| v1.1 | 2 weeks | Minor |
| v1.2 | 6 weeks | Minor |
| v1.3 | 8 weeks | Minor |
| v2.0 | 14 weeks | Major |

**Patch releases** as needed for bugs/security.

---

## Contributing to Roadmap

See [CONTRIBUTING.md](CONTRIBUTING.md) — roadmap items are tracked as GitHub Issues with `roadmap` label.

**Priority voting**: React with 👍 on issues to signal interest.

---

*Last updated: 2024 — v1.0.0 released*