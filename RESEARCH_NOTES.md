# Competitive Research: Todo/Roadmap Tracker Apps

## Top Competitors & Sync Strategies

### 1. Linear (Linear.app)

- **Sync**: Real-time via WebSocket + GraphQL subscriptions
- **Architecture**: Local-first with CRDT-like conflict resolution
- **Offline**: Full offline support, queues mutations
- **Sync speed**: <100ms perceived latency
- **Platforms**: Web, macOS, Windows, iOS, Android (native apps)

### 2. Notion

- **Sync**: Operational Transform (OT) via custom sync engine
- **Offline**: Limited (read-only offline, writes queue)
- **Platforms**: Web, desktop (Electron), mobile

### 3. Todoist

- **Sync**: Event sourcing + sync tokens
- **Offline**: Full offline, background sync
- **Platforms**: Web, native iOS/Android/macOS/Windows

### 4. Height (height.app)

- **Sync**: Real-time via WebSocket + Yjs (CRDT)
- **Offline**: Full offline-first
- **Unique**: GitHub-style command palette, keyboard-first

### 5. Plane (plane.so) - Open Source

- **Sync**: WebSocket + custom sync
- **Self-hostable**: Yes
- **Architecture**: Django + React + WebSocket

### 6. AppFlowy / Affine - Open Source

- **Sync**: CRDT (Yjs) or custom
- **Self-hostable**: Yes
- **Local-first**: Core philosophy

### 7. Superlist

- **Sync**: Real-time via WebSocket
- **Offline**: Full offline
- **Platforms**: macOS, iOS, Web, Windows

## Sync Patterns Summary

| Approach                         | Pros                                  | Cons                       | Best For                     |
| -------------------------------- | ------------------------------------- | -------------------------- | ---------------------------- |
| **WebSocket + Server Authority** | Simple, consistent                    | Server bottleneck, latency | Small teams, simple apps     |
| **CRDT (Yjs/Automerge)**         | True P2P, offline-first, no conflicts | Complex, larger bundles    | Collaborative, offline-first |
| **Event Sourcing + Sync Tokens** | Audit trail, reliable                 | Complex                    | Task managers, audit needs   |
| **Event Sourcing + CRDT**        | Best of both                          | Very complex               | Mission-critical sync        |

## For Our App: Recommended Approach

### Phase 1: Local-First + Server Sync (Current → Enhanced)

- Keep localStorage as source of truth
- Add Supabase/Firebase for cloud sync
- WebSocket for real-time updates
- Background sync queue for offline

### Phase 2: CRDT (Yjs) - True Multi-Device

- Yjs for conflict-free sync
- WebRTC for P2P + WebSocket relay
- Full offline, true P2P sync

### Phase 3: Self-Hostable + E2E Encryption

- Self-host option
- End-to-end encryption
- Custom sync server

## Key Features for Cross-Platform Sync

1. **Universal Link/Deep Link** - Open same item on any device
2. **Presence Indicators** - Who's viewing/editing
3. **Conflict Resolution UI** - Visual merge for conflicts
4. **Sync Status Indicator** - Online/offline/syncing/pending
5. **Selective Sync** - Choose what syncs (large attachments)
6. **Version History** - Per-item change log
7. **Offline Queue** - Visual pending changes counter

## Shortcuts & Full Screen (Your Requirements)

| Shortcut               | Action                       |
| ---------------------- | ---------------------------- |
| `F` / `F11`            | Toggle fullscreen            |
| `Cmd/Ctrl + K`         | Command palette / search     |
| `Cmd/Ctrl + N`         | New issue                    |
| `Cmd/Ctrl + Shift + N` | New epic                     |
| `Cmd/Ctrl + Shift + S` | New sprint                   |
| `/`                    | Focus search                 |
| `?`                    | Show shortcuts help          |
| `1-4`                  | Switch views                 |
| `F` (in board)         | Toggle fullscreen board      |
| `Esc`                  | Close modals/exit fullscreen |

## Local Memory + Sync Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser / App                          │
├─────────────────────────────────────────────────────────────┤
│  Zustand Store (In-Memory State)                           │
│       │              │              │                       │
│       ▼              ▼              ▼                       │
│  IndexedDB      LocalStorage   SessionStorage              │
│  (Large data)   (Settings)    (Session)                    │
│       │              │              │                       │
│       └──────────────┼──────────────┘                       │
│                      ▼                                      │
│           ┌─────────────────────┐                          │
│           │   Sync Engine       │                          │
│           │  - Queue mutations  │                          │
│           │  - Conflict resolve │                          │
│           │  - Retry logic      │                          │
│           └─────────┬───────────┘                          │
│                     │                                       │
│         ┌───────────┼───────────┐                          │
│         ▼           ▼           ▼                          │
│    WebSocket    Background    Service                     │
│   (Real-time)   Sync API      Worker                       │
└─────────────────────────────────────────────────────────────┘
```
