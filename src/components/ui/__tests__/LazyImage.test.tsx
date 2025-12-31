import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test-utils/test-utils'
import { LazyImage } from '../LazyImage'

describe('LazyImage', () => {
  beforeEach(() => {
    // Reset IntersectionObserver instances
    if (typeof (globalThis.IntersectionObserver as any).reset === 'function') {
      ;(globalThis.IntersectionObserver as any).reset()
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
    if (container && typeof (globalThis.IntersectionObserver as any).triggerIntersection === 'function') {
      ;(globalThis.IntersectionObserver as any).triggerIntersection(container, true)
    }

    await waitFor(() => {
      const img = screen.queryByAltText('Test image')
      expect(img).toBeInTheDocument()
    })
  })

  it('applies custom className (backward compatibility)', async () => {
    render(<LazyImage src="/test.jpg" alt="Test" className="custom-class" />)

    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    expect(container?.className).toContain('custom-class')

    // Trigger intersection to load image
    if (container && typeof (globalThis.IntersectionObserver as any).triggerIntersection === 'function') {
      ;(globalThis.IntersectionObserver as any).triggerIntersection(container, true)
    }

    await waitFor(() => {
      const img = screen.queryByAltText('Test')
      expect(img).toBeInTheDocument()
      // Verify className is applied to img for backward compatibility
      expect(img?.className).toContain('custom-class')
    })
  })

  it('applies wrapperClassName only to wrapper div', () => {
    render(<LazyImage src="/test.jpg" alt="Test" wrapperClassName="wrapper-class" />)

    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    expect(container?.className).toContain('wrapper-class')
    expect(container?.className).toContain('relative')
  })

  it('applies imgClassName only to img element', async () => {
    render(<LazyImage src="/test.jpg" alt="Test" imgClassName="img-class" />)

    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    // Wrapper should not have img-class
    expect(container?.className).not.toContain('img-class')

    // Trigger intersection to load image
    if (container && typeof (globalThis.IntersectionObserver as any).triggerIntersection === 'function') {
      ;(globalThis.IntersectionObserver as any).triggerIntersection(container, true)
    }

    await waitFor(() => {
      const img = screen.queryByAltText('Test')
      expect(img).toBeInTheDocument()
      // Verify imgClassName is applied to img
      expect(img?.className).toContain('img-class')
    })
  })

  it('imgClassName takes precedence over className when both are provided', async () => {
    render(<LazyImage src="/test.jpg" alt="Test" className="old-class" imgClassName="new-class" />)

    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    // Wrapper should still get className when wrapperClassName is not provided (backward compatibility)
    expect(container?.className).toContain('old-class')
    expect(container?.className).not.toContain('new-class')

    // Trigger intersection to load image
    if (container && typeof (globalThis.IntersectionObserver as any).triggerIntersection === 'function') {
      ;(globalThis.IntersectionObserver as any).triggerIntersection(container, true)
    }

    await waitFor(() => {
      const img = screen.queryByAltText('Test')
      expect(img).toBeInTheDocument()
      // Verify imgClassName takes precedence
      expect(img?.className).toContain('new-class')
      expect(img?.className).not.toContain('old-class')
    })
  })

  it('preserves transition/opacity classes when using imgClassName', async () => {
    render(<LazyImage src="/test.jpg" alt="Test" imgClassName="custom-img" />)

    const container = screen.getByRole('img', { name: /loading image/i }).parentElement
    // Trigger intersection to load image
    if (container && typeof (globalThis.IntersectionObserver as any).triggerIntersection === 'function') {
      ;(globalThis.IntersectionObserver as any).triggerIntersection(container, true)
    }

    await waitFor(() => {
      const img = screen.queryByAltText('Test')
      expect(img).toBeInTheDocument()
    })

    // Trigger load event to change opacity from 0 to 100
    const img = screen.queryByAltText('Test')
    if (img) {
      const loadEvent = new Event('load', { bubbles: true })
      img.dispatchEvent(loadEvent)
    }

    await waitFor(() => {
      const loadedImg = screen.queryByAltText('Test')
      expect(loadedImg).toBeInTheDocument()
      // Verify transition classes are preserved
      expect(loadedImg?.className).toContain('custom-img')
      expect(loadedImg?.className).toContain('transition-opacity')
      expect(loadedImg?.className).toContain('duration-300')
      expect(loadedImg?.className).toContain('opacity-100') // Image should be loaded
    })
  })
})
