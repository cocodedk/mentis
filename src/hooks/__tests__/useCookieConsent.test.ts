import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCookieConsent } from '../useCookieConsent'
import * as cookies from '@/utils/cookies'

// Mock the cookies module
vi.mock('@/utils/cookies', () => ({
  getCookieConsent: vi.fn(),
  saveCookieConsent: vi.fn(),
  hasCookieConsent: vi.fn(),
}))

describe('useCookieConsent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('initializes with no consent when localStorage is empty', () => {
    vi.mocked(cookies.getCookieConsent).mockReturnValue(null)
    vi.mocked(cookies.hasCookieConsent).mockReturnValue(false)

    const { result } = renderHook(() => useCookieConsent())

    expect(result.current.hasConsented).toBe(false)
    expect(result.current.consent).toBeNull()
  })

  it('initializes with stored consent', () => {
    const storedConsent = {
      necessary: true,
      functional: true,
      statistical: false,
      marketing: false,
    }
    vi.mocked(cookies.getCookieConsent).mockReturnValue(storedConsent)
    vi.mocked(cookies.hasCookieConsent).mockReturnValue(true)

    const { result } = renderHook(() => useCookieConsent())

    expect(result.current.hasConsented).toBe(true)
    expect(result.current.consent).toEqual(storedConsent)
  })

  it('acceptAll sets all preferences to true', () => {
    vi.mocked(cookies.getCookieConsent).mockReturnValue(null)
    vi.mocked(cookies.hasCookieConsent).mockReturnValue(false)

    const { result } = renderHook(() => useCookieConsent())

    act(() => {
      result.current.acceptAll()
    })

    expect(cookies.saveCookieConsent).toHaveBeenCalledWith({
      necessary: true,
      functional: true,
      statistical: true,
      marketing: true,
    })
    expect(result.current.hasConsented).toBe(true)
    expect(result.current.consent).toEqual({
      necessary: true,
      functional: true,
      statistical: true,
      marketing: true,
    })
  })

  it('rejectAll sets only necessary to true', () => {
    vi.mocked(cookies.getCookieConsent).mockReturnValue(null)
    vi.mocked(cookies.hasCookieConsent).mockReturnValue(false)

    const { result } = renderHook(() => useCookieConsent())

    act(() => {
      result.current.rejectAll()
    })

    expect(cookies.saveCookieConsent).toHaveBeenCalledWith({
      necessary: true,
      functional: false,
      statistical: false,
      marketing: false,
    })
    expect(result.current.hasConsented).toBe(true)
    expect(result.current.consent).toEqual({
      necessary: true,
      functional: false,
      statistical: false,
      marketing: false,
    })
  })

  it('savePreferences saves custom preferences', () => {
    vi.mocked(cookies.getCookieConsent).mockReturnValue(null)
    vi.mocked(cookies.hasCookieConsent).mockReturnValue(false)

    const { result } = renderHook(() => useCookieConsent())

    const customPreferences = {
      necessary: true,
      functional: true,
      statistical: true,
      marketing: false,
    }

    act(() => {
      result.current.savePreferences(customPreferences)
    })

    expect(cookies.saveCookieConsent).toHaveBeenCalledWith(customPreferences)
    expect(result.current.hasConsented).toBe(true)
    expect(result.current.consent).toEqual(customPreferences)
  })
})
