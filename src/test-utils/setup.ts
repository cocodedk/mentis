import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
  // Reset IntersectionObserver instances
  if (typeof (global.IntersectionObserver as any).reset === 'function') {
    ;(global.IntersectionObserver as any).reset()
  }
})

// Mock IntersectionObserver
let intersectionObserverInstances: Array<{
  callback: IntersectionObserverCallback
  element: Element | null
  observe: (element: Element) => void
  unobserve: (element: Element) => void
  disconnect: () => void
}> = []

global.IntersectionObserver = class IntersectionObserver {
  callback: IntersectionObserverCallback
  element: Element | null = null
  observe: (element: Element) => void
  unobserve: (element: Element) => void
  disconnect: () => void

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    const instance = {
      callback,
      element: null as Element | null,
      observe: vi.fn((element: Element) => {
        instance.element = element
        // Store instance for manual triggering
        intersectionObserverInstances.push(instance)
      }),
      unobserve: vi.fn((element: Element) => {
        instance.element = null
      }),
      disconnect: vi.fn(),
    }
    this.observe = instance.observe
    this.unobserve = instance.unobserve
    this.disconnect = instance.disconnect
  }

  takeRecords() {
    return []
  }

  // Helper to trigger intersection manually in tests
  static triggerIntersection(element: Element, isIntersecting: boolean) {
    intersectionObserverInstances.forEach((instance) => {
      if (instance.element === element) {
        instance.callback(
          [
            {
              target: element,
              isIntersecting,
              intersectionRatio: isIntersecting ? 1 : 0,
              boundingClientRect: {} as DOMRectReadOnly,
              rootBounds: null,
              time: Date.now(),
            } as IntersectionObserverEntry,
          ],
          instance as any
        )
      }
    })
  }

  static reset() {
    intersectionObserverInstances = []
  }
} as any

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock as any
