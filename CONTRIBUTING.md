# Contributing to mentis

## Local Setup
1. Install Node.js 20+.
2. Clone the repository and run `npm install`.

## Install Git Hooks
```
./scripts/install-hooks.sh
```

## Local Git Setup
```bash
git config pull.rebase true
git config core.autocrlf input
git config push.autoSetupRemote true
git config init.defaultBranch main
```

## Build and Test Commands
```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run lint          # Lint
npm test              # Run unit tests (vitest run)
npm run test:coverage # Test with coverage
```

## Coding Style
- TypeScript strict mode — no implicit `any`
- React functional components with hooks
- Keep files under 200 lines — extract when approaching the limit

## Branch Naming
| Prefix | Type | Example |
|---|---|---|
| `feature/` | `feat:` | `feature/add-dashboard` |
| `fix/` | `fix:` | `fix/session-timeout` |
| `chore/` | `chore:` | `chore/update-deps` |
| `docs/` | `docs:` | `docs/update-readme` |

## PR Checklist
- [ ] Smoke check passes (`npm run lint && npm test`)
- [ ] Manual test completed for changed functionality
- [ ] Updated docs if behavior changed
- [ ] Commit messages follow Conventional Commits
