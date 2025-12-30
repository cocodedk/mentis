import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAriaLive } from '../useAriaLive'

describe('useAriaLive', () => {
  beforeEach(() => {
    // Clean up any existing live regions
    document.querySelectorAll('[role="status"]').forEach((el) => el.remove())
  })

  it('creates live region when message is provided', () => {
    renderHook(() => useAriaLive('Test message'))

    const liveRegion = document.querySelector('[role="status"]')
    expect(liveRegion).toBeTruthy()
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite')
    expect(liveRegion?.getAttribute('aria-atomic')).toBe('true')
  })

  it('uses assertive priority when specified', () => {
    renderHook(() => useAriaLive('Test message', 'assertive'))

    const liveRegion = document.querySelector('[role="status"]')
    expect(liveRegion?.getAttribute('aria-live')).toBe('assertive')
  })

  it('does not create live region when message is empty', () => {
    renderHook(() => useAriaLive(''))

    const liveRegion = document.querySelector('[role="status"]')
    expect(liveRegion).toBeNull()
  })

  it('updates message when it changes', () => {
    const { rerender } = renderHook(
      ({ message }) => useAriaLive(message),
      {
        initialProps: { message: 'First message' },
      }
    )

    let liveRegion = document.querySelector('[role="status"]')
    expect(liveRegion?.textContent).toBe('First message')

    rerender({ message: 'Second message' })

    liveRegion = document.querySelector('[role="status"]')
    expect(liveRegion?.textContent).toBe('Second message')
  })
})
