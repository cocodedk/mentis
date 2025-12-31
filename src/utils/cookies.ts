/**
 * Cookie utility functions
 * Handle cookie setting/getting based on consent
 */

export type CookieCategory = 'necessary' | 'functional' | 'statistical' | 'marketing'

export interface CookiePreferences {
  necessary: boolean
  functional: boolean
  statistical: boolean
  marketing: boolean
}

const COOKIE_CONSENT_KEY = 'mentis_cookie_consent'

/**
 * Get cookie consent preferences from localStorage
 */
export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as CookiePreferences
  } catch {
    return null
  }
}

/**
 * Save cookie consent preferences to localStorage
 */
export function saveCookieConsent(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences))
}

/**
 * Check if user has given consent
 */
export function hasCookieConsent(): boolean {
  return getCookieConsent() !== null
}

/**
 * Set a cookie (only if consent is given for the category)
 */
export function setCookie(
  name: string,
  value: string,
  category: CookieCategory,
  days = 365
): void {
  const consent = getCookieConsent()
  if (!consent) return

  if (category === 'necessary' || consent[category]) {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    // Check for production build or HTTPS connection
    // import.meta.env.PROD is Vite's equivalent to process.env.NODE_ENV === 'production'
    const isSecure =
      import.meta.env.PROD || (typeof window !== 'undefined' && window.location.protocol === 'https:')
    const secureFlag = isSecure ? ';Secure' : ''
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax${secureFlag}`
  }
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const nameEQ = name + '='
  const ca = document.cookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }

  return null
}

/**
 * Remove a cookie
 */
export function removeCookie(name: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}
