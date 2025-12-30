import { useEffect, useRef } from 'react'

/**
 * Custom hook for ARIA live regions
 * Announce dynamic content changes to screen readers
 */
export function useAriaLive(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  const liveRegionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!message) return

    if (!liveRegionRef.current) {
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('role', 'status')
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.className = 'sr-only'
      document.body.appendChild(liveRegion)
      liveRegionRef.current = liveRegion
    }

    const timer = setTimeout(() => {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = message
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (liveRegionRef.current && liveRegionRef.current.parentNode) {
        liveRegionRef.current.parentNode.removeChild(liveRegionRef.current)
        liveRegionRef.current = null
      }
    }
  }, [message, priority])

  return liveRegionRef
}
