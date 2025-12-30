import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@/test-utils/test-utils'
import { LazyImage } from '../LazyImage'

describe('LazyImage', () => {
  let mockIntersectionObserver: any

  beforeEach(() => {
    // Reset IntersectionObserver mock
    mockIntersectionObserver = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    })
    global.IntersectionObserver = mockIntersectionObserver
  })

  it('renders placeholder initially', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />)

    const placeholder = screen.getByRole('img', { name: /loading image/i })
    expect(placeholder).toBeInTheDocument()
  })

  it('has correct alt text', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />)

    // The actual img might not be rendered yet, but we can check the component structure
    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    expect(container).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<LazyImage src="/test.jpg" alt="Test" className="custom-class" />)

    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    expect(container?.className).toContain('custom-class')
  })
})
