import { describe, it, expect, beforeEach } from 'vitest'
import {
  matchesBreakpoint,
  getCurrentBreakpoint,
} from '../responsive'

describe('responsive', () => {
  const setViewportWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
  }

  beforeEach(() => {
    // Reset window.innerWidth before each test
    setViewportWidth(1024)
  })

  describe('matchesBreakpoint', () => {
    it('returns true when viewport matches breakpoint', () => {
      setViewportWidth(1024)
      expect(matchesBreakpoint('lg')).toBe(true)
    })

    it('returns false when viewport is smaller than breakpoint', () => {
      setViewportWidth(500)
      expect(matchesBreakpoint('md')).toBe(false)
    })

    it('returns true when viewport is larger than breakpoint', () => {
      setViewportWidth(1400)
      expect(matchesBreakpoint('lg')).toBe(true)
    })

    it('returns false when window is undefined (SSR)', () => {
      const savedWindow = globalThis.window
      // @ts-expect-error - Intentionally deleting window for SSR test
      delete globalThis.window
      expect(matchesBreakpoint('lg')).toBe(false)
      globalThis.window = savedWindow
    })

    it('returns false when viewport is just below sm breakpoint', () => {
      setViewportWidth(639)
      expect(matchesBreakpoint('sm')).toBe(false)
    })

    it('returns true when viewport is exactly at sm breakpoint', () => {
      setViewportWidth(640)
      expect(matchesBreakpoint('sm')).toBe(true)
    })

    it('returns false when viewport is just below md breakpoint', () => {
      setViewportWidth(767)
      expect(matchesBreakpoint('md')).toBe(false)
    })

    it('returns true when viewport is exactly at md breakpoint', () => {
      setViewportWidth(768)
      expect(matchesBreakpoint('md')).toBe(true)
    })

    it('returns false when viewport is just below lg breakpoint', () => {
      setViewportWidth(1023)
      expect(matchesBreakpoint('lg')).toBe(false)
    })

    it('returns true when viewport is exactly at lg breakpoint', () => {
      setViewportWidth(1024)
      expect(matchesBreakpoint('lg')).toBe(true)
    })

    it('returns false when viewport is just below xl breakpoint', () => {
      setViewportWidth(1279)
      expect(matchesBreakpoint('xl')).toBe(false)
    })

    it('returns true when viewport is exactly at xl breakpoint', () => {
      setViewportWidth(1280)
      expect(matchesBreakpoint('xl')).toBe(true)
    })
  })

  describe('getCurrentBreakpoint', () => {
    it('returns mobile for small screens', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      expect(getCurrentBreakpoint()).toBe('mobile')
    })

    it('returns sm for small breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 640,
      })
      expect(getCurrentBreakpoint()).toBe('sm')
    })

    it('returns md for medium breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      expect(getCurrentBreakpoint()).toBe('md')
    })

    it('returns lg for large breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      expect(getCurrentBreakpoint()).toBe('lg')
    })

    it('returns xl for extra large breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      })
      expect(getCurrentBreakpoint()).toBe('xl')
    })
  })
})
