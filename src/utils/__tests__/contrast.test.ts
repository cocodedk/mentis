import { describe, it, expect } from 'vitest'
import {
  getContrastRatio,
  meetsWCAGAA,
  meetsWCAGAAA,
  validateDesignSystemContrast,
} from '../contrast'

describe('contrast', () => {
  describe('getContrastRatio', () => {
    it('calculates contrast ratio correctly for black and white', () => {
      const ratio = getContrastRatio('#000000', '#FFFFFF')
      expect(ratio).toBeGreaterThan(20) // Black on white has very high contrast
    })

    it('calculates contrast ratio correctly for same colors', () => {
      const ratio = getContrastRatio('#FFFFFF', '#FFFFFF')
      expect(ratio).toBe(1)
    })

    it('calculates contrast ratio correctly for design system colors', () => {
      const ratio = getContrastRatio('#1E2930', '#FFFFFF')
      expect(ratio).toBeGreaterThan(4.5) // Should meet WCAG AA
    })
  })

  describe('meetsWCAGAA', () => {
    it('returns true for normal text meeting AA standard', () => {
      expect(meetsWCAGAA(4.5)).toBe(true)
      expect(meetsWCAGAA(7)).toBe(true)
    })

    it('returns false for normal text below AA standard', () => {
      expect(meetsWCAGAA(4.4)).toBe(false)
      expect(meetsWCAGAA(3)).toBe(false)
    })

    it('returns true for large text meeting AA standard', () => {
      expect(meetsWCAGAA(3, true)).toBe(true)
      expect(meetsWCAGAA(4.5, true)).toBe(true)
    })

    it('returns false for large text below AA standard', () => {
      expect(meetsWCAGAA(2.9, true)).toBe(false)
    })
  })

  describe('meetsWCAGAAA', () => {
    it('returns true for normal text meeting AAA standard', () => {
      expect(meetsWCAGAAA(7)).toBe(true)
      expect(meetsWCAGAAA(10)).toBe(true)
    })

    it('returns false for normal text below AAA standard', () => {
      expect(meetsWCAGAAA(6.9)).toBe(false)
    })

    it('returns true for large text meeting AAA standard', () => {
      expect(meetsWCAGAAA(4.5, true)).toBe(true)
      expect(meetsWCAGAAA(7, true)).toBe(true)
    })

    it('returns false for large text below AAA standard', () => {
      expect(meetsWCAGAAA(4.4, true)).toBe(false)
    })
  })

  describe('validateDesignSystemContrast', () => {
    it('validates all design system color combinations', () => {
      const validations = validateDesignSystemContrast()
      expect(validations).toHaveLength(4)

      validations.forEach((validation) => {
        expect(validation).toHaveProperty('name')
        expect(validation).toHaveProperty('foreground')
        expect(validation).toHaveProperty('background')
        expect(validation).toHaveProperty('ratio')
        expect(validation).toHaveProperty('passes')
      })
    })

    it('validates primary text on white meets WCAG AA', () => {
      const validations = validateDesignSystemContrast()
      const primaryText = validations.find(
        (v) => v.name === 'Primary text on white'
      )
      expect(primaryText?.passes).toBe(true)
      expect(primaryText?.ratio).toBeGreaterThanOrEqual(4.5)
    })

    it('validates button contrast meets WCAG AA', () => {
      const validations = validateDesignSystemContrast()
      const button = validations.find(
        (v) => v.name === 'Primary button text'
      )
      expect(button?.passes).toBe(true)
      expect(button?.ratio).toBeGreaterThanOrEqual(3)
    })
  })
})
