/**
 * Accessibility utility functions
 */

/**
 * CSS selector string for focusable elements
 * Used by both isFocusable and getFocusableElements to ensure consistency
 */
export const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Check if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  return element.matches(FOCUSABLE_SELECTORS)
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(
  container: HTMLElement
): HTMLElement[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS))
}

/**
 * Announce a message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  document.body.appendChild(announcement)

  setTimeout(() => {
    try {
      if (document.body && document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    } catch {
      // Silently ignore errors if element or document.body is gone
    }
  }, 1000)
}
