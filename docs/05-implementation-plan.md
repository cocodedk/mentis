# Implementation Plan - Mentis.dk Redesign

## Project Overview

Modern redesign of Mentis Neuropsykiatrisk Klinik website (mentis.dk) - a Danish neuropsychiatric clinic website.

**Tech Stack**: Node.js, React, TypeScript, Tailwind CSS, Vite

**Design Principles**: Calm · Human · Clinical · Trust · Clarity · Accessibility

---

## Phase 1: Project Setup & Foundation

### 1.1 Initialize Project
- [x] Initialize git repository
- [ ] Create GitHub repository (cocodedk/mentis)
- [ ] Set up Vite + React + TypeScript project
- [ ] Configure Tailwind CSS
- [ ] Set up ESLint and Prettier
- [ ] Configure path aliases (@/components, @/utils, etc.)

### 1.2 Design System Setup
- [ ] Configure Tailwind with color system:
  - Primary: #1F4E5F (Deep desaturated teal-blue)
  - Primary Dark: #163E4D
  - Accent: #5FA8A1 (Muted green-teal)
  - Neutral 100: #FAFAFA (Off-white)
  - Neutral 200: #F2F6F8 (Light blue-grey)
  - Neutral 600: #5B6B73 (Secondary text)
  - Neutral 900: #1E2930 (Primary text)
- [ ] Set up typography (Inter font family)
- [ ] Configure spacing system (4, 8, 16, 24, 32, 48, 64)
- [ ] Create base component styles

---

## Phase 2: Core Components

### 2.1 Navigation Components
- [ ] Header component (sticky, responsive)
- [ ] Desktop navigation with dropdowns
- [ ] Mobile navigation (hamburger menu)
- [ ] Active state indicators
- [ ] CTA button in header

### 2.2 UI Components
- [ ] Button variants (Primary, Secondary, Text)
- [ ] Card components (Treatment, Staff, Pricing, Info)
- [ ] Accordion component
- [ ] Alert/Info components
- [ ] Form components (Input, Textarea)
- [ ] Modal component

### 2.3 Layout Components
- [ ] Footer component
- [ ] Section wrapper components
- [ ] Container component
- [ ] Grid layout components

---

## Phase 3: Pages Implementation

### 3.1 Homepage (Forside)
- [ ] Hero section with headline and CTAs
- [ ] Services overview grid (TMS, Udredning, Psykoterapi, etc.)
- [ ] Practical information section (condensed)
- [ ] Opening hours & contact section
- [ ] Footer

### 3.2 Treatments Pages
- [ ] Treatments overview page (Behandlinger)
- [ ] Individual treatment pages:
  - TMS treatment page
  - Udredning page
  - Korte forløb page
  - Mindfulness page
  - Compassion Focused Therapy page
- [ ] Treatment page structure:
  - What is it?
  - Who is it for?
  - How does it work?
  - Practical details
  - Contact/next step

### 3.3 Staff Page (Personale)
- [ ] Staff overview grid
- [ ] Staff detail modal/page
- [ ] Staff cards with photos, names, roles
- [ ] Bio sections (Specialisations, Experience, Languages)

### 3.4 Pricing Page (Priser)
- [ ] Grouped pricing tables:
  - Behandlinger
  - Udredning
  - Konsultationer
  - Kurser
- [ ] Clear labels and formatting
- [ ] "Efter aftale" visual distinction

### 3.5 Practical Information (Praktisk information)
- [ ] Sub-pages:
  - Konsultation
  - Telefonisk kontakt
  - Kontakt via e-login
  - Afbud (with accordion)
  - Tolkebistand
  - Akut hjælp
  - Cookiepolitik
  - Privatlivspolitik

### 3.6 Other Pages
- [ ] Find os (locations page)
- [ ] Links page
- [ ] Contact page/form

---

## Phase 4: Features & Enhancements

### 4.1 Accessibility
- [ ] WCAG AA compliance
- [ ] Keyboard navigation
- [ ] Focus states (visible outlines)
- [ ] ARIA labels
- [ ] Screen reader support
- [ ] Color contrast validation (≥4.5:1 for text, ≥3:1 for buttons)
- [ ] No information conveyed by color alone

### 4.2 Responsive Design
- [ ] Mobile-first approach
- [ ] Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- [ ] Mobile navigation
- [ ] Responsive typography
- [ ] Touch-friendly targets (min 44x44px)

### 4.3 Cookie Consent
- [ ] Non-blocking banner (bottom placement)
- [ ] Cookie categories (necessary, functional, statistical, marketing)
- [ ] Consent management
- [ ] LocalStorage persistence

### 4.4 Performance
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Font optimization

---

## Phase 5: Content & Data

### 5.1 Content Structure
- [ ] Create content/data files:
  - Treatments data
  - Staff data
  - Pricing data
  - Locations data
  - Contact information
- [ ] Danish language content
- [ ] Consider i18n setup for future English version

### 5.2 Images & Assets
- [ ] Hero images
- [ ] Treatment illustrations
- [ ] Staff photos
- [ ] Icons (treatment icons, location icons)
- [ ] Logo assets

---

## Phase 6: Testing & Quality

### 6.1 Testing
- [ ] Unit tests for components
- [ ] Integration tests for pages
- [ ] Accessibility testing (axe-core, Lighthouse)
- [ ] Cross-browser testing
- [ ] Mobile device testing

### 6.2 Code Quality
- [ ] ESLint configuration
- [ ] Prettier configuration
- [ ] TypeScript strict mode
- [ ] Component documentation
- [ ] Code review checklist

---

## Phase 7: Deployment

### 7.1 Build & Deploy
- [ ] Production build configuration
- [ ] Environment variables setup
- [ ] Deployment pipeline
- [ ] Domain configuration
- [ ] SSL certificate

### 7.2 Post-Launch
- [ ] Analytics setup
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] User feedback collection

---

## File Structure

```
mentis/
├── docs/                    # Documentation
├── public/                  # Static assets
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Layout components
│   │   └── sections/       # Page sections
│   ├── pages/              # Page components
│   ├── data/               # Content/data files
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   ├── styles/             # Global styles
│   └── App.tsx
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## Key Design Decisions

1. **Color System**: Soft blue (#1F4E5F) + muted green accent (#5FA8A1) for calm, clinical feel
2. **Typography**: Inter font for modern, readable, medical-friendly appearance
3. **Layout**: Card-based, whitespace-heavy, mobile-first
4. **Navigation**: Simplified header with dropdowns, clear CTA
5. **Content**: Chunked text, progressive disclosure, scannable sections
6. **Accessibility**: WCAG AA minimum, keyboard navigation, high contrast

---

## Next Steps

1. Initialize git and create GitHub repo
2. Set up Vite + React + TypeScript project
3. Configure Tailwind with design system
4. Build core components
5. Implement homepage
6. Build remaining pages incrementally
