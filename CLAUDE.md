# CLAUDE.md — mentis

## Project Overview

Mentis — a React/TypeScript web application built with Vite. Mental wellness or productivity platform with a component-based architecture.

- **Language / Runtime**: TypeScript, Node.js 20+
- **Framework**: React 18 with Vite
- **Architecture**: React SPA with hooks and Vitest for testing
- **Package manager**: npm

---

## Required Skills — ALWAYS Invoke These

These skills **must** be invoked when the relevant situation arises. Never skip them.

| Situation | Skill |
|-----------|-------|
| Before any new feature or screen | `superpowers:brainstorming` |
| Planning multi-step changes | `superpowers:writing-plans` |
| Writing or fixing core logic | `superpowers:test-driven-development` |
| First sign of a bug or failure | `superpowers:systematic-debugging` |
| Before completing a feature branch | `superpowers:requesting-code-review` |
| Before claiming any task done | `superpowers:verification-before-completion` |
| Working on UI / frontend | `frontend-design:frontend-design` |
| After implementing — reviewing quality | `simplify` |

---

## Architecture

```
mentis/
├── src/
│   ├── components/   <- Reusable React components
│   ├── pages/        <- Page-level components
│   ├── hooks/        <- Custom React hooks
│   ├── data/         <- Static data
│   └── styles/       <- Global styles
└── public/           <- Static assets
```

### Layer Rules
- `pages/` must not contain business logic — delegate to hooks or utilities
- `components/` must be pure UI — no side effects
- Custom state and logic in `hooks/`

---

## Coding Conventions

- TypeScript strict mode — no implicit `any`
- React functional components with hooks only
- Immutable state updates — use spread
- No hardcoded strings — use constants

---

## Engineering Principles

### File Size
- **200-line maximum per file** — extract when approaching the limit

### DRY · SOLID · KISS · YAGNI
- Extract shared logic into hooks; never copy-paste
- Single Responsibility: one component does one thing
- Don't add features not yet needed
- Delete dead code immediately

### TDD
- Write the failing test first, make it pass, then refactor
- One assertion per test

### Commit hygiene
- Follow Conventional Commits: `feat: ...` / `fix: ...` / `chore: ...`

---

## Build Commands

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run lint          # Lint
npm test              # Run unit tests (vitest run)
npm run test:coverage # Test with coverage
```

---

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file |
| `version.txt` | Semantic version |
| `.github/workflows/` | CI, release, Pages automation |
| `.githooks/` | Pre-commit and commit-msg hooks |
| `scripts/install-hooks.sh` | One-time hook installer |

---

## Starting a New Session

1. Read this file
2. Run `npm run lint && npm test` to confirm everything passes
3. Invoke `superpowers:brainstorming` before touching any feature
4. Follow the Required Skills table — every skill is mandatory, not optional
