import { useState, useMemo } from 'react'
import {
  getCookieConsent,
  saveCookieConsent,
  hasCookieConsent,
  CookiePreferences,
} from '@/utils/cookies'

/**
 * Custom hook for cookie consent management
 * LocalStorage persistence
 * Consent state management
 */
export function useCookieConsent() {
  const initialConsent = useMemo(() => getCookieConsent(), [])
  const initialHasConsented = useMemo(() => hasCookieConsent(), [])

  const [consent, setConsent] = useState<CookiePreferences | null>(initialConsent)
  const [hasConsented, setHasConsented] = useState(initialHasConsented)

  const acceptAll = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      functional: true,
      statistical: true,
      marketing: true,
    }
    saveCookieConsent(preferences)
    setConsent(preferences)
    setHasConsented(true)
  }

  const rejectAll = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      functional: false,
      statistical: false,
      marketing: false,
    }
    saveCookieConsent(preferences)
    setConsent(preferences)
    setHasConsented(true)
  }

  const savePreferences = (preferences: CookiePreferences) => {
    saveCookieConsent(preferences)
    setConsent(preferences)
    setHasConsented(true)
  }

  return {
    consent,
    hasConsented,
    acceptAll,
    rejectAll,
    savePreferences,
  }
}
