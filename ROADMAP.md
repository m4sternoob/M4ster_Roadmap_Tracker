# m4ster-tracker Roadmap

## Vision
Build the best open-source roadmap tracker for product teams — fast, accessible, offline-first, and extensible. **Cross-platform sync (PC ↔ Mac), full keyboard control, fullscreen mode, local-first with cloud sync.**

---

## v1.0 — Foundation ✅ COMPLETE
**Released: 2024-09-27**

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
| **Deployed to Vercel** | ✅ |

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

## v1.2 — Cross-Platform Sync Foundation 🔄 PLANNED (Week 3-5)

### Cloud Backend (Supabase/Firebase)
- [ ] Supabase project setup (PostgreSQL + Realtime + Auth)
- [ ] Database schema: projects, issues, epics, sprints, users
- [ ] Row-level security (RLS) policies
- [ ] Edge functions for sync logic

### Authentication
- [ ] Email/password auth
- [ ] OAuth: GitHub, Google, Apple
- [ ] Magic link / passwordless
- [ ] Session management + refresh tokens

### Sync Engine (Phase 1: Server-Authoritative)
- [ ] Sync queue in IndexedDB (offline mutations)
- [ ] WebSocket connection (Supabase Realtime)
- [ ] Conflict resolution: Last-Write-Wins + vector clocks
- [ ] Optimistic UI updates
- [ ] Background sync queue with retry logic
- [ ] Sync status indicator: Online / Syncing / Offline / Pending

### Cross-Device Features
- [ ] User presence (who's online/viewing)
- [ ] Device management (trusted devices)
- [ ] Sync status badge in toolbar
- [ ] Manual "Sync Now" button
- [ ] Pending changes counter

---

## v1.3 — True Multi-Device Sync (CRDT) ⏳ PLANNED (Week 6-8)

### CRDT Implementation (Yjs)
- [ ] Yjs integration for conflict-free sync
- [ ] Yjs + WebRTC for P2P + WebSocket relay
- [ ] Shared Y.Doc per project
- [ ] Awareness protocol (cursors, selections)
- [ ] Offline-first, true P2P capable

### Advanced Sync Features
- [ ] Selective sync (large attachments)
- [ ] Per-item version history
- [ ] Conflict resolution UI (visual merge)
- [ ] Selective sync per project/epic
- [ ] Bandwidth-aware sync (WiFi vs cellular)

---

## v1.4 — Universal Experience (PC ↔ Mac) ⏳ PLANNED (Week 9-11)

### Full Keyboard Control
| Shortcut | Action |
|----------|--------|
| `F` / `F11` | Toggle fullscreen |
| `Cmd/Ctrl + K` | Command palette / search |
| `Cmd/Ctrl + N` | New issue |
| `Cmd/Ctrl + Shift + N` | New epic |
| `Cmd/Ctrl + Shift + S` | New sprint |
| `Cmd/Ctrl + Shift + F` | Toggle fullscreen |
| `/` | Focus search |
| `?` | Show shortcuts help |
| `1-4` | Switch views (Board/Backlog/Sprints/Reports) |
| `Esc` | Close modals/exit fullscreen |
| `Cmd/Ctrl + Enter` | Save & close modal |
| `Arrow keys` | Navigate board (with focus) |

### Fullscreen Mode
- [ ] `F` / `F11` toggles true fullscreen (browser API)
- [ ] Board fills entire viewport
- [ ] Hide browser UI (fullscreen API)
- [ ] Exit on `Esc` or `F`
- [ ] Remember fullscreen preference per device

### Command Palette (Cmd+K)
- [ ] Search issues, epics, sprints
- [ ] Quick actions (new issue, new epic, etc.)
- [ ] Recent items
- [ ] Keyboard navigation (arrows, enter, esc)

---

## v1.5 — Local-First Architecture ⏳ PLANNED (Week 12-14)

### Storage Layers
| Layer | Purpose | Persistence |
|-------|---------|-------------|
| **Zustand** | In-memory reactive state | Session |
| **IndexedDB** | Large data (issues, history) | Persistent |
| **LocalStorage** | Settings, preferences | Persistent |
| **SessionStorage** | Transient UI state | Session |

### Offline-First Guarantees
- [ ] Full app works offline (no spinner on load)
- [ ] All mutations queued in IndexedDB
- [ ] Visual pending changes counter
- [ ] Background sync on reconnect
- [ ] Service Worker caches all assets
- [ ] "You're offline" banner with retry

### Data Portability
- [ ] Export full project (JSON + attachments)
- [ ] Import from JSON
- [ ] Migration tool for schema versions
- [ ] Backup to file (download)
- [ ] Restore from backup file

---

## v2.0 — Intelligence & Collaboration ⏳ PLANNED (Month 4-6)

### Intelligence
- [ ] Sprint planning suggestions (velocity-based)
- [ ] Duplicate issue detection
- [ ] Auto-generate descriptions from titles
- [ ] Sprint retrospective summary
- [ ] Priority recommendation

### Collaboration
- [ ] Threaded comments on issues
- [ ] @mentions with notifications
- [ ] Activity feed
- [ ] Real-time cursors (Yjs awareness)

### Advanced Features
- [ ] Custom fields (text, number, select, date, user)
- [ ] Custom workflows (statuses, transitions)
- [ ] Automation rules (if X then Y)
- [ ] Webhooks (outgoing)
- [ ] Dependencies (blocks / blocked by)
- [ ] Issue hierarchies (epic → story → subtask tree)
- [ ] Roadmap timeline view (Gantt-like)
- [ ] Capacity planning per sprint
- [ ] Release management

---

## v2.1 — Platform & Ecosystem ⏳ PLANNED (Month 6+)

### Platform
- [ ] Public API (REST + GraphQL)
- [ ] Webhook system (incoming/outgoing)
- [ ] Plugin/extension system
- [ ] Marketplace for templates, automations
- [ ] Mobile app (React Native / Capacitor)
- [ ] Electron desktop app (native menus, tray)

### Self-Hostable
- [ ] Docker Compose one-click deploy
- [ ] Kubernetes Helm chart
- [ ] Single binary (Go/Rust sync server option)
- [ ] E2E encryption option
- [ ] Admin dashboard

---

## Sync Architecture Deep Dive

### Current (v1.0): LocalStorage Only
```
Browser → Zustand → localStorage (sync on every change)
```

### v1.2: Server Sync (Supabase)
```
Browser (Zustand + IndexedDB queue)
    ↓
Supabase Realtime (WebSocket)
    ↓
PostgreSQL (Supabase)
    ↓
Other devices (WebSocket push)
```

### v1.3: CRDT (Yjs)
```
Device A ←→ Device B (WebRTC P2P)
    ↓
WebSocket Relay (supabase/own server)
    ↓
Yjs Doc (conflict-free)
```

---

## Release Cadence

| Version | Target | Type | Focus |
|---------|--------|------|-------|
| v1.1 | 2 weeks | Minor | Polish, A11y, PWA |
| v1.2 | 6 weeks | Minor | Cloud Sync (Supabase) |
| v1.3 | 10 weeks | Minor | CRDT / True P2P |
| v1.4 | 14 weeks | Minor | Full Keyboard/Fullscreen |
| v1.5 | 18 weeks | Minor | Local-First Architecture |
| v2.0 | 6 months | Major | Intelligence + Collaboration |

---

## Immediate Next Steps (This Week)

1. [ ] **Virtualized Columns** — `react-window` for large lists
2. [ ] **A11y Audit** — ARIA roles, focus traps, keyboard drag-drop alt, WCAG AA
3. [ ] **Supabase Setup** — Project, schema, RLS, Realtime
4. [ ] **Sync Queue** — IndexedDB mutation queue + retry logic

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Sync latency (P95) | <200ms |
| Offline load time | <500ms |
| First paint (mobile) | <1.5s |
| Sync conflict rate | <0.1% |
| Offline session duration | Unlimited |
| Cross-device sync success | 99.9% |

---

## Notes

- **Single URL works everywhere** — https://m4ster-tracker.vercel.app opens same data on PC, Mac, mobile
- **Local-first** — Works offline, syncs when online
- **Keyboard-first** — Every action accessible via keyboard
- **Fullscreen** — True fullscreen mode for focus
- **Open source** — MIT licensed, self-hostable

---

*Last updated: 2024-10-01 — v1.0 released, v1.1 in progress*