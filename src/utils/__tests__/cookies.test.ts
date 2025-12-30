import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getCookieConsent,
  saveCookieConsent,
  hasCookieConsent,
  setCookie,
  getCookie,
  removeCookie,
  CookiePreferences,
} from '../cookies'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('cookies', () => {
  beforeEach(() => {
    // Clear mocks and cookies before each test
    vi.clearAllMocks()
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
    })
  })

  describe('getCookieConsent', () => {
    it('returns null when no consent is stored', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)
      expect(getCookieConsent()).toBeNull()
    })

    it('returns preferences when stored', () => {
      const preferences: CookiePreferences = {
        necessary: true,
        functional: true,
        statistical: false,
        marketing: false,
      }
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(preferences))
      expect(getCookieConsent()).toEqual(preferences)
    })

    it('returns null when stored data is invalid JSON', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('invalid json')
      expect(getCookieConsent()).toBeNull()
    })
  })

  describe('saveCookieConsent', () => {
    it('saves preferences to localStorage', () => {
      const preferences: CookiePreferences = {
        necessary: true,
        functional: true,
        statistical: true,
        marketing: false,
      }
      saveCookieConsent(preferences)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mentis_cookie_consent',
        JSON.stringify(preferences)
      )
    })
  })

  describe('hasCookieConsent', () => {
    it('returns false when no consent is stored', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)
      expect(hasCookieConsent()).toBe(false)
    })

    it('returns true when consent is stored', () => {
      const preferences: CookiePreferences = {
        necessary: true,
        functional: false,
        statistical: false,
        marketing: false,
      }
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(preferences))
      expect(hasCookieConsent()).toBe(true)
    })
  })

  describe('setCookie', () => {
    it('does not set cookie when no consent is given', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)
      setCookie('test', 'value', 'functional')
      expect(getCookie('test')).toBeNull()
    })

    it('sets cookie when consent is given for category', () => {
      const preferences: CookiePreferences = {
        necessary: true,
        functional: true,
        statistical: false,
        marketing: false,
      }
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(preferences))
      setCookie('test', 'value', 'functional')
      expect(getCookie('test')).toBe('value')
    })

    it('sets necessary cookies with consent', () => {
      const preferences: CookiePreferences = {
        necessary: true,
        functional: false,
        statistical: false,
        marketing: false,
      }
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(preferences))
      setCookie('test2', 'value2', 'necessary')
      expect(getCookie('test2')).toBe('value2')
    })
  })

  describe('getCookie', () => {
    it('returns null when cookie does not exist', () => {
      expect(getCookie('nonexistent')).toBeNull()
    })

    it('returns cookie value when it exists', () => {
      document.cookie = 'test=value;path=/'
      expect(getCookie('test')).toBe('value')
    })

    it('handles cookies with spaces', () => {
      document.cookie = 'test=value with spaces;path=/'
      expect(getCookie('test')).toBe('value with spaces')
    })
  })

  describe('removeCookie', () => {
    it('removes cookie', () => {
      document.cookie = 'test=value;path=/'
      expect(getCookie('test')).toBe('value')
      removeCookie('test')
      expect(getCookie('test')).toBeNull()
    })
  })
})
