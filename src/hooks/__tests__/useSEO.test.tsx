import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useSEO } from '../useSEO'
import type { SEOMetadata } from '@/utils/seo'

// Mock the SEO utilities
vi.mock('@/utils/seo', async () => {
  const actual = await vi.importActual('@/utils/seo')
  return {
    ...actual,
    applySEOMetadata: vi.fn(),
    cleanupSEO: vi.fn(),
    getCanonicalUrl: vi.fn((path: string) => `https://mentis.dk${path}`),
  }
})

// Mock structured data injection
vi.mock('@/utils/structuredData', () => ({
  injectStructuredData: vi.fn(() => () => {}), // Returns cleanup function
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('useSEO', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.head.innerHTML = ''
    document.title = ''
  })

  it('applies metadata on mount', async () => {
    const { applySEOMetadata } = await import('@/utils/seo')

    const metadata: SEOMetadata = {
      title: 'Test Title',
      description: 'Test Description',
    }

    renderHook(() => useSEO({ metadata }), { wrapper })

    await waitFor(() => {
      expect(applySEOMetadata).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Title',
          description: 'Test Description',
        })
      )
    })
  })

  it('injects structured data when provided', async () => {
    const { injectStructuredData } = await import('@/utils/structuredData')

    const metadata: SEOMetadata = {
      title: 'Test',
      description: 'Test',
    }
    const structuredData = { '@context': 'https://schema.org', '@type': 'Test' }

    renderHook(() => useSEO({ metadata, structuredData }), { wrapper })

    await waitFor(() => {
      expect(injectStructuredData).toHaveBeenCalledWith(structuredData)
    })
  })

  it('handles array of structured data schemas', async () => {
    const { injectStructuredData } = await import('@/utils/structuredData')

    const metadata: SEOMetadata = {
      title: 'Test',
      description: 'Test',
    }
    const structuredData = [
      { '@context': 'https://schema.org', '@type': 'Test1' },
      { '@context': 'https://schema.org', '@type': 'Test2' },
    ]

    renderHook(() => useSEO({ metadata, structuredData }), { wrapper })

    await waitFor(() => {
      expect(injectStructuredData).toHaveBeenCalledTimes(2)
    })
  })

  it('handles null structured data', async () => {
    const { injectStructuredData } = await import('@/utils/structuredData')

    const metadata: SEOMetadata = {
      title: 'Test',
      description: 'Test',
    }

    renderHook(() => useSEO({ metadata, structuredData: null }), { wrapper })

    await waitFor(() => {
      expect(injectStructuredData).not.toHaveBeenCalled()
    })
  })

  it('generates canonical URL from current path', async () => {
    const { applySEOMetadata, getCanonicalUrl } = await import('@/utils/seo')

    const metadata: SEOMetadata = {
      title: 'Test',
      description: 'Test',
    }

    renderHook(() => useSEO({ metadata }), { wrapper })

    await waitFor(() => {
      expect(getCanonicalUrl).toHaveBeenCalled()
      expect(applySEOMetadata).toHaveBeenCalledWith(
        expect.objectContaining({
          canonical: expect.any(String),
        })
      )
    })
  })

  it('uses provided canonical URL when available', async () => {
    const { applySEOMetadata } = await import('@/utils/seo')

    const metadata: SEOMetadata = {
      title: 'Test',
      description: 'Test',
      canonical: 'https://mentis.dk/custom',
    }

    renderHook(() => useSEO({ metadata }), { wrapper })

    await waitFor(() => {
      expect(applySEOMetadata).toHaveBeenCalledWith(
        expect.objectContaining({
          canonical: 'https://mentis.dk/custom',
        })
      )
    })
  })

  it('cleans up on unmount', async () => {
    const { cleanupSEO } = await import('@/utils/seo')
    const { injectStructuredData } = await import('@/utils/structuredData')

    const metadata: SEOMetadata = {
      title: 'Test',
      description: 'Test',
    }
    const structuredData = { '@context': 'https://schema.org', '@type': 'Test' }
    const mockCleanup = vi.fn()

    vi.mocked(injectStructuredData).mockReturnValue(mockCleanup)

    const { unmount } = renderHook(() => useSEO({ metadata, structuredData }), { wrapper })

    await waitFor(() => {
      expect(injectStructuredData).toHaveBeenCalled()
    })

    unmount()

    await waitFor(() => {
      expect(cleanupSEO).toHaveBeenCalled()
      expect(mockCleanup).toHaveBeenCalled()
    })
  })

  it('updates when metadata changes', async () => {
    const { applySEOMetadata } = await import('@/utils/seo')

    const initialMetadata: SEOMetadata = {
      title: 'Initial Title',
      description: 'Initial Description',
    }

    const { rerender } = renderHook(
      ({ metadata }) => useSEO({ metadata }),
      {
        wrapper,
        initialProps: { metadata: initialMetadata },
      }
    )

    await waitFor(() => {
      expect(applySEOMetadata).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Initial Title',
        })
      )
    })

    const updatedMetadata: SEOMetadata = {
      title: 'Updated Title',
      description: 'Updated Description',
    }

    rerender({ metadata: updatedMetadata })

    await waitFor(() => {
      expect(applySEOMetadata).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Updated Title',
        })
      )
    })
  })

  it('filters out null structured data schemas', async () => {
    const { injectStructuredData } = await import('@/utils/structuredData')

    const metadata: SEOMetadata = {
      title: 'Test',
      description: 'Test',
    }
    const structuredData = [
      { '@context': 'https://schema.org', '@type': 'Test1' },
      null,
      { '@context': 'https://schema.org', '@type': 'Test2' },
    ]

    renderHook(() => useSEO({ metadata, structuredData }), { wrapper })

    await waitFor(() => {
      expect(injectStructuredData).toHaveBeenCalledTimes(2)
    })
  })
})
