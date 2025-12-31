import { describe, it, expect, beforeEach } from 'vitest'
import {
  matchesBreakpoint,
  getCurrentBreakpoint,
} from '../responsive'

describe('responsive', () => {
  beforeEach(() => {
    // Reset window.innerWidth before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
  })

  describe('matchesBreakpoint', () => {
    it('returns true when viewport matches breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      expect(matchesBreakpoint('lg')).toBe(true)
    })

    it('returns false when viewport is smaller than breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      expect(matchesBreakpoint('md')).toBe(false)
    })

    it('returns true when viewport is larger than breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1400,
      })
      expect(matchesBreakpoint('lg')).toBe(true)
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
