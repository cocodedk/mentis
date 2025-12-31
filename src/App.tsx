import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Header, Footer } from '@/components/layout'
import {
  SkipLink,
  CookieBanner,
  LoadingSpinner,
  ErrorBoundary,
} from '@/components/ui'
import { navigationItems } from '@/data/navigation'

const HomePage = lazy(() => import('@/pages/HomePage'))
const TreatmentsPage = lazy(() => import('@/pages/TreatmentsPage'))
const TreatmentDetailPage = lazy(() => import('@/pages/TreatmentDetailPage'))
const StaffPage = lazy(() => import('@/pages/StaffPage'))
const PricingPage = lazy(() => import('@/pages/PricingPage'))
const PracticalInfoPage = lazy(() => import('@/pages/PracticalInfoPage'))
const PracticalInfoDetailPage = lazy(() =>
  import('@/pages/PracticalInfoDetailPage')
)
const LocationsPage = lazy(() => import('@/pages/LocationsPage'))
const LinksPage = lazy(() => import('@/pages/LinksPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  // Scroll to top when route changes
  useEffect(() => {
    // Scroll to top instantly on route change
    // This ensures users see new page content instead of staying at bottom
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [location.pathname])

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
  // Get base path from Vite (set via BASE_URL env var or defaults to '/')
  const basePath = import.meta.env.BASE_URL || '/'

  return (
    <ErrorBoundary>
      <BrowserRouter basename={basePath}>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
