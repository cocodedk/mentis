import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAriaLive } from '../useAriaLive'

describe('useAriaLive', () => {
  beforeEach(() => {
    // Clean up any existing live regions
    document.querySelectorAll('[role="status"]').forEach((el) => el.remove())
  })

  it('creates live region when message is provided', async () => {
    renderHook(() => useAriaLive('Test message'))

    await waitFor(() => {
      const liveRegion = document.querySelector('[role="status"]')
      expect(liveRegion).toBeTruthy()
      expect(liveRegion?.getAttribute('aria-live')).toBe('polite')
      expect(liveRegion?.getAttribute('aria-atomic')).toBe('true')
    })
  })

  it('uses assertive priority when specified', async () => {
    renderHook(() => useAriaLive('Test message', 'assertive'))

    await waitFor(() => {
      const liveRegion = document.querySelector('[role="status"]')
      expect(liveRegion?.getAttribute('aria-live')).toBe('assertive')
    })
  })

  it('creates live region on mount even when message is empty', async () => {
    renderHook(() => useAriaLive(''))

    // Live region is created on mount regardless of message
    await waitFor(() => {
      const liveRegion = document.querySelector('[role="status"]')
      expect(liveRegion).toBeTruthy()
      // But textContent should be empty
      expect(liveRegion?.textContent).toBe('')
    })
  })

  it('updates message when it changes', async () => {
    const { rerender } = renderHook(
      ({ message }) => useAriaLive(message),
      {
        initialProps: { message: 'First message' },
      }
    )

    await waitFor(() => {
      const liveRegion = document.querySelector('[role="status"]')
      expect(liveRegion?.textContent).toBe('First message')
    })

    rerender({ message: 'Second message' })

    await waitFor(() => {
      const liveRegion = document.querySelector('[role="status"]')
      expect(liveRegion?.textContent).toBe('Second message')
    })
  })
})
