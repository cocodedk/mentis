import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer } from '@/components/layout'
import {
  SkipLink,
  CookieBanner,
  LoadingSpinner,
  ErrorBoundary,
} from '@/components/ui'
import { navigationItems } from '@/data/navigation'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage }))
)
const TreatmentsPage = lazy(() =>
  import('@/pages/TreatmentsPage').then((m) => ({ default: m.TreatmentsPage }))
)
const TreatmentDetailPage = lazy(() =>
  import('@/pages/TreatmentDetailPage').then((m) => ({
    default: m.TreatmentDetailPage,
  }))
)
const StaffPage = lazy(() =>
  import('@/pages/StaffPage').then((m) => ({ default: m.StaffPage }))
)
const PricingPage = lazy(() =>
  import('@/pages/PricingPage').then((m) => ({ default: m.PricingPage }))
)
const PracticalInfoPage = lazy(() =>
  import('@/pages/PracticalInfoPage').then((m) => ({
    default: m.PracticalInfoPage,
  }))
)
const PracticalInfoDetailPage = lazy(() =>
  import('@/pages/PracticalInfoDetailPage').then((m) => ({
    default: m.PracticalInfoDetailPage,
  }))
)
const LocationsPage = lazy(() =>
  import('@/pages/LocationsPage').then((m) => ({ default: m.LocationsPage }))
)
const LinksPage = lazy(() =>
  import('@/pages/LinksPage').then((m) => ({ default: m.LinksPage }))
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
)
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFound }))
)

function AppContent() {
  const location = useLocation()

  const handleNavigate = (path: string) => {
    window.location.href = path
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <SkipLink />
      <Header
        currentPath={location.pathname}
        navigationItems={navigationItems}
        onNavigate={handleNavigate}
      />
      <main id="main-content" className="flex-grow">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/behandlinger" element={<TreatmentsPage />} />
            <Route
              path="/behandlinger/:slug"
              element={<TreatmentDetailPage />}
            />
            <Route path="/personale" element={<StaffPage />} />
            <Route path="/priser" element={<PricingPage />} />
            <Route
              path="/praktisk-information"
              element={<PracticalInfoPage />}
            />
            <Route
              path="/praktisk-information/:slug"
              element={<PracticalInfoDetailPage />}
            />
            <Route path="/find-os" element={<LocationsPage />} />
            <Route path="/links" element={<LinksPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
