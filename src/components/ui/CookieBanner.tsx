import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { CookieSettings } from './CookieSettings'
import { useCookieConsent } from '@/hooks/useCookieConsent'

/**
 * Non-blocking cookie consent banner
 * Bottom placement (fixed position)
 * Cookie categories: necessary, functional, statistical, marketing
 * Accept all / Customize / Reject buttons
 */
export function CookieBanner() {
  const { hasConsented, acceptAll, rejectAll, savePreferences, consent } =
    useCookieConsent()
  const [showSettings, setShowSettings] = useState(false)

  if (hasConsented) return null

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-lg p-4 md:p-6"
        role="region"
        aria-label="Cookie-banner"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-h3 text-neutral-900 mb-2">
                Vi bruger cookies
              </h2>
              <p className="text-body text-neutral-600 mb-2">
                Vi bruger cookies til at forbedre din oplevelse på vores
                hjemmeside. Nogle cookies er nødvendige for, at hjemmesiden kan
                fungere, mens andre hjælper os med at analysere brugen.
              </p>
              <Link
                to="/praktisk-information/cookiepolitik"
                className="text-body-sm text-primary-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Læs mere om vores cookiepolitik
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button variant="secondary" onClick={() => setShowSettings(true)}>
                Tilpas
              </Button>
              <Button variant="text" onClick={rejectAll}>
                Afvis alle
              </Button>
              <Button variant="primary" onClick={acceptAll}>
                Accepter alle
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CookieSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={savePreferences}
        currentPreferences={consent}
      />
    </>
  )
}
