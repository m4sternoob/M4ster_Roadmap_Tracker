# Contributing to m4ster-tracker

Thank you for contributing! 🎉

## Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/m4ster-tracker.git`
3. **Install**: `npm install`
4. **Branch**: `git checkout -b feat/your-feature-name`
5. **Code** with tests
6. **Test**: `npm run test && npm run lint && npm run typecheck`
7. **Commit**: `git commit -m 'feat: your descriptive message'`
8. **Push**: `git push origin feat/your-feature-name`
9. **PR**: Open Pull Request against `main`

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type        | Example                                  |
| ----------- | ---------------------------------------- |
| `feat:`     | `feat: add sprint burndown export`       |
| `fix:`      | `fix: drag-drop not working on mobile`   |
| `docs:`     | `docs: update README deployment section` |
| `refactor:` | `refactor: extract IssueCard component`  |
| `test:`     | `test: add helpers test coverage`        |
| `chore:`    | `chore: update dependencies`             |
| `perf:`     | `perf: virtualize column rendering`      |
| `ci:`       | `ci: add Docker build step`              |

**Breaking changes**: Add `!` after type: `feat!: rename Project.key to Project.prefix`

## Code Standards

### TypeScript

- Strict mode enabled — no `any` unless absolutely necessary
- Use type imports: `import type { Issue } from '@/types'`
- Prefer interfaces over type aliases for objects
- Export types from `src/types/index.ts`

### React

- Functional components with hooks
- `React.FC` discouraged — use plain functions
- Props interface named `ComponentNameProps`
- Memoize with `React.memo` / `useMemo` / `useCallback` when needed

### Styling (Tailwind v4)

- Utility-first — avoid custom CSS
- Use design tokens from `tailwind.config.js`
- Dark mode via `dark:` prefix
- Responsive: `md:`, `lg:`, `xl:`

### Testing

- Unit tests for pure functions (`src/utils/`)
- Component tests for UI logic (`src/components/**/*.test.tsx`)
- Integration tests for store (`src/store/*.test.ts`)
- Aim for >80% coverage on new code

### Accessibility

- Semantic HTML (`<main>`, `<nav>`, `<button>`, `<dialog>`)
- ARIA labels on icon-only buttons
- Focus visible styles (`focus-visible:`)
- Keyboard navigation for all interactive elements
- Test with screen reader

## Pull Request Checklist

- [ ] Tests pass (`npm run test`)
- [ ] Lint clean (`npm run lint`)
- [ ] Types valid (`npm run typecheck`)
- [ ] Format correct (`npm run format:check`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in dev
- [ ] Manual test in browser (light + dark mode)
- [ ] Documentation updated if needed
- [ ] CHANGELOG.md entry added (for feat/fix)

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── modals/       # Modal dialogs
│   ├── providers/    # Context providers
│   ├── ui/           # Atomic UI (Button, Card, etc.)
│   └── views/        # Page-level views
├── store/            # Zustand store (single source of truth)
├── types/            # All TypeScript interfaces
├── utils/            # Pure helper functions
├── styles/           # Global CSS + Tailwind
├── test/             # Test setup + utilities
└── main.tsx          # Entry point
```

## Adding a New Feature

1. **Types first**: Add interfaces to `src/types/index.ts`
2. **Store actions**: Add to `projectStore.ts` with persistence
3. **UI components**: Create in `components/ui/` or `components/views/`
4. **Wire up**: Import in `App.tsx` or relevant view
5. **Test**: Add tests for new logic
6. **Document**: Update README/ROADMAP if user-facing

## Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml) with:

- Clear reproduction steps
- Expected vs actual behavior
- Browser/OS/device
- Screenshots/video
- Console errors

## Feature Requests

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.yml):

- Problem statement
- Proposed solution
- Alternatives considered
- Mockups/wireframes if UI

## Code of Conduct

Be respectful, inclusive, and constructive. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Questions?

Open a [Discussion](https://github.com/YOUR_USERNAME/m4ster-tracker/discussions) or check existing [Issues](https://github.com/YOUR_USERNAME/m4ster-tracker/issues).
