import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { useFocusTrap } from '../useFocusTrap'

describe('useFocusTrap', () => {
  let containerRef: React.RefObject<HTMLDivElement>
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = `
      <button>First</button>
      <input type="text" />
      <button>Last</button>
    `
    document.body.appendChild(container)
    containerRef = { current: container }
  })

  it('focuses first element when active', () => {
    const firstButton = container.querySelector('button') as HTMLButtonElement
    renderHook(() => useFocusTrap(containerRef, true))

    // Focus should be on first element
    expect(document.activeElement).toBe(firstButton)
  })

  it('does not trap focus when inactive', () => {
    const firstButton = container.querySelector('button') as HTMLButtonElement
    renderHook(() => useFocusTrap(containerRef, false))

    // Focus should not be trapped
    expect(document.activeElement).not.toBe(firstButton)
  })

  it('cycles focus with Tab key', () => {
    const buttons = container.querySelectorAll('button')
    const input = container.querySelector('input') as HTMLInputElement
    const firstButton = buttons[0] as HTMLButtonElement
    const lastButton = buttons[1] as HTMLButtonElement

    renderHook(() => useFocusTrap(containerRef, true))
    firstButton.focus()

    // Simulate Tab key
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
    })
    container.dispatchEvent(tabEvent)

    // Should move to next focusable element
    expect(document.activeElement).toBe(input)
  })

  it('cycles focus back to first with Shift+Tab on first element', () => {
    const buttons = container.querySelectorAll('button')
    const lastButton = buttons[1] as HTMLButtonElement

    renderHook(() => useFocusTrap(containerRef, true))
    const firstButton = buttons[0] as HTMLButtonElement
    firstButton.focus()

    // Simulate Shift+Tab
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
    })
    container.dispatchEvent(shiftTabEvent)

    // Should wrap to last element
    expect(document.activeElement).toBe(lastButton)
  })
})
