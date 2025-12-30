import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useIntersectionObserver } from '../useIntersectionObserver'

describe('useIntersectionObserver', () => {
  let mockIntersectionObserver: any
  let observe: ReturnType<typeof vi.fn>
  let unobserve: ReturnType<typeof vi.fn>
  let disconnect: ReturnType<typeof vi.fn>

  beforeEach(() => {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()

    mockIntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => {
      return {
        observe,
        unobserve,
        disconnect,
        // Store callback for manual triggering
        _callback: callback,
      }
    })

    global.IntersectionObserver = mockIntersectionObserver as any
  })

  it('returns ref and isIntersecting state', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    expect(result.current[0]).toBeDefined()
    expect(typeof result.current[1]).toBe('boolean')
    expect(result.current[1]).toBe(false)
  })

  it('observes element when ref is attached', () => {
    const { result } = renderHook(() => useIntersectionObserver())
    const [ref] = result.current

    const element = document.createElement('div')
    if (typeof ref === 'function') {
      ref(element)
    } else if (ref.current) {
      ref.current = element
    }

    expect(observe).toHaveBeenCalled()
  })

  it('sets isIntersecting to true when element enters viewport', async () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({ triggerOnce: false })
    )

    const element = document.createElement('div')
    const [ref] = result.current

    if (typeof ref === 'function') {
      ref(element)
    } else if (ref.current) {
      ref.current = element
    }

    // Get the callback from the observer
    const observerInstance = mockIntersectionObserver.mock.results[0].value
    const callback = observerInstance._callback

    // Simulate intersection
    callback([
      {
        isIntersecting: true,
        target: element,
      } as IntersectionObserverEntry,
    ])

    await waitFor(() => {
      expect(result.current[1]).toBe(true)
    })
  })

  it('unobserves element when triggerOnce is true', async () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({ triggerOnce: true })
    )

    const element = document.createElement('div')
    const [ref] = result.current

    if (typeof ref === 'function') {
      ref(element)
    } else if (ref.current) {
      ref.current = element
    }

    const observerInstance = mockIntersectionObserver.mock.results[0].value
    const callback = observerInstance._callback

    // Simulate intersection
    callback([
      {
        isIntersecting: true,
        target: element,
      } as IntersectionObserverEntry,
    ])

    await waitFor(() => {
      expect(unobserve).toHaveBeenCalledWith(element)
    })
  })

  it('cleans up observer on unmount', () => {
    const { unmount } = renderHook(() => useIntersectionObserver())

    unmount()

    expect(disconnect).toHaveBeenCalled()
  })
})
