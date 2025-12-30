import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test-utils/test-utils'
import { LazyImage } from '../LazyImage'

describe('LazyImage', () => {
  beforeEach(() => {
    // Reset IntersectionObserver instances
    if (typeof (global.IntersectionObserver as any).reset === 'function') {
      ;(global.IntersectionObserver as any).reset()
    }
  })

  it('renders placeholder initially', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />)

    const placeholder = screen.getByRole('img', { name: /loading image/i })
    expect(placeholder).toBeInTheDocument()
  })

  it('has correct alt text', async () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />)

    // Trigger intersection to load image
    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    if (container && typeof (global.IntersectionObserver as any).triggerIntersection === 'function') {
      ;(global.IntersectionObserver as any).triggerIntersection(container, true)
    }

    await waitFor(() => {
      const img = screen.queryByAltText('Test image')
      expect(img).toBeInTheDocument()
    })
  })

  it('applies custom className', () => {
    render(<LazyImage src="/test.jpg" alt="Test" className="custom-class" />)

    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    expect(container?.className).toContain('custom-class')
  })
})
