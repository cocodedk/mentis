# mentis

Mental wellness and productivity web application built with React 18, TypeScript, Vite, and Tailwind CSS.

## Website

- [English](https://cocodedk.github.io/mentis/)
- [فارسی (Persian)](https://cocodedk.github.io/mentis/fa/)

## Features

- Wellness and productivity tracking
- React 18 with hooks and functional components
- Full TypeScript support
- Vite for lightning fast development builds
- Tailwind CSS for utility-first styling
- Vitest unit tests

## Build from Source

**Prerequisites:** Node.js 20+, npm

```bash
git clone https://github.com/cocodedk/mentis.git
cd mentis
npm install
npm run dev
```

**Commands:**
```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run lint          # Lint
npm test              # Run unit tests (vitest run)
npm run test:coverage # Test with coverage
```

## Architecture

```
mentis/
├── src/
│   ├── components/   # Reusable React components
│   ├── pages/        # Page-level components
│   ├── hooks/        # Custom React hooks
│   ├── data/         # Static data
│   └── styles/       # Global styles
└── public/           # Static assets
```

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS |
| Testing | Vitest |
| Deployment | GitHub Pages |

## Docker

```bash
docker pull ghcr.io/cocodedk/mentis:latest
```

## Author

**Babak Bandpey** — [cocode.dk](https://cocode.dk) | [LinkedIn](https://linkedin.com/in/babakbandpey) | [GitHub](https://github.com/cocodedk)

Apache-2.0 | &copy; 2026 [Cocode](https://cocode.dk) | Created by [Babak Bandpey](https://linkedin.com/in/babakbandpey)
