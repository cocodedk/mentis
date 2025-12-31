import { describe, it, expect } from 'vitest'
import {
  isFocusable,
  getFocusableElements,
  announceToScreenReader,
} from '../accessibility'

describe('accessibility', () => {
  describe('isFocusable', () => {
    it('returns true for focusable elements', () => {
      const button = document.createElement('button')
      expect(isFocusable(button)).toBe(true)

      const link = document.createElement('a')
      link.href = '#'
      expect(isFocusable(link)).toBe(true)

      const input = document.createElement('input')
      expect(isFocusable(input)).toBe(true)
    })

    it('returns false for non-focusable elements', () => {
      const div = document.createElement('div')
      expect(isFocusable(div)).toBe(false)

      const span = document.createElement('span')
      expect(isFocusable(span)).toBe(false)
    })

    it('returns false for disabled elements', () => {
      const button = document.createElement('button')
      button.disabled = true
      expect(isFocusable(button)).toBe(false)
    })

    it('returns true for elements with tabindex', () => {
      const div = document.createElement('div')
      div.tabIndex = 0
      expect(isFocusable(div)).toBe(true)
    })

    it('returns false for elements with tabindex -1', () => {
      const div = document.createElement('div')
      div.tabIndex = -1
      expect(isFocusable(div)).toBe(false)
    })
  })

  describe('getFocusableElements', () => {
    it('finds all focusable elements in container', () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <button>Button 1</button>
        <a href="#">Link</a>
        <input type="text" />
        <div>Not focusable</div>
      `
      const focusable = getFocusableElements(container)
      expect(focusable).toHaveLength(3)
    })

    it('returns empty array when no focusable elements', () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <div>Not focusable</div>
        <span>Also not focusable</span>
      `
      const focusable = getFocusableElements(container)
      expect(focusable).toHaveLength(0)
    })
  })

  describe('announceToScreenReader', () => {
    it('creates and removes announcement element', async () => {
      announceToScreenReader('Test announcement')

      // Element should be added
      const announcements = document.querySelectorAll('[role="status"]')
      expect(announcements.length).toBeGreaterThan(0)

      // Wait for cleanup (1 second timeout in implementation)
      await new Promise((resolve) => setTimeout(resolve, 1100))
      const afterCleanup = document.querySelectorAll('[role="status"]')
      expect(afterCleanup.length).toBe(0)
    })

  it('uses correct ARIA attributes', async () => {
    announceToScreenReader('Test', 'assertive')
    // Wait a bit for the element to be created
    await new Promise((resolve) => setTimeout(resolve, 10))
    const announcement = document.querySelector('[role="status"][aria-live="assertive"]')
    expect(announcement).toBeTruthy()
    expect(announcement?.getAttribute('aria-live')).toBe('assertive')
    expect(announcement?.getAttribute('aria-atomic')).toBe('true')
  })
  })
})
