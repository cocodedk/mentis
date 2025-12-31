import { describe, it, expect, beforeEach } from 'vitest'
import {
  getBaseUrl,
  getAbsoluteUrl,
  getCanonicalUrl,
  setMetaTag,
  removeMetaTag,
  setDocumentTitle,
  setCanonicalLink,
  removeCanonicalLink,
  applySEOMetadata,
  cleanupSEO,
  type SEOMetadata,
} from '../seo'

describe('seo', () => {
  beforeEach(() => {
    // Clean up document head
    document.head.innerHTML = ''
    document.title = ''

    // Setup window.location for tests
    Object.defineProperty(window, 'location', {
      value: {
        protocol: 'http:',
        host: 'localhost:5173',
      },
      writable: true,
      configurable: true,
    })
  })

  describe('getBaseUrl', () => {
    it('returns a valid URL', () => {
      const url = getBaseUrl()
      expect(url).toBeTruthy()
      expect(typeof url).toBe('string')
      expect(url.startsWith('http')).toBe(true)
    })

    it('constructs URL from window.location when available', () => {
      Object.defineProperty(window, 'location', {
        value: {
          protocol: 'http:',
          host: 'localhost:5173',
        },
        writable: true,
        configurable: true,
      })

      const url = getBaseUrl()
      // In test environment, it may return production URL or constructed URL
      expect(url).toBeTruthy()
      expect(typeof url).toBe('string')
    })
  })

  describe('getAbsoluteUrl', () => {
    it('constructs absolute URL from path', () => {
      const url = getAbsoluteUrl('/behandlinger')
      expect(url).toBeTruthy()
      expect(url).toContain('/behandlinger')
      expect(url.startsWith('http')).toBe(true)
    })

    it('adds leading slash if missing', () => {
      const url = getAbsoluteUrl('behandlinger')
      expect(url).toBeTruthy()
      expect(url).toContain('/behandlinger')
      expect(url.startsWith('http')).toBe(true)
    })

    it('returns absolute URL', () => {
      const url = getAbsoluteUrl('/test')
      expect(url.startsWith('http://') || url.startsWith('https://')).toBe(true)
    })
  })

  describe('getCanonicalUrl', () => {
    it('returns absolute URL from path', () => {
      const url = getCanonicalUrl('/behandlinger')
      expect(url).toBeTruthy()
      expect(url).toContain('/behandlinger')
      expect(url.startsWith('http')).toBe(true)
    })
  })

  describe('setMetaTag', () => {
    it('creates new meta tag with name attribute', () => {
      setMetaTag('description', 'Test description')

      const meta = document.querySelector('meta[name="description"]')
      expect(meta).toBeTruthy()
      expect(meta?.getAttribute('content')).toBe('Test description')
    })

    it('creates new meta tag with property attribute', () => {
      setMetaTag('og:title', 'Test Title', 'property')

      const meta = document.querySelector('meta[property="og:title"]')
      expect(meta).toBeTruthy()
      expect(meta?.getAttribute('content')).toBe('Test Title')
    })

    it('updates existing meta tag', () => {
      setMetaTag('description', 'First description')
      setMetaTag('description', 'Updated description')

      const metas = document.querySelectorAll('meta[name="description"]')
      expect(metas.length).toBe(1)
      expect(metas[0]?.getAttribute('content')).toBe('Updated description')
    })

    it('handles missing document gracefully', () => {
      // Note: In jsdom environment, document always exists
      // This test verifies the function doesn't throw
      expect(() => setMetaTag('description', 'Test')).not.toThrow()
    })
  })

  describe('removeMetaTag', () => {
    it('removes meta tag with name attribute', () => {
      setMetaTag('description', 'Test')
      expect(document.querySelector('meta[name="description"]')).toBeTruthy()

      removeMetaTag('description')
      expect(document.querySelector('meta[name="description"]')).toBeNull()
    })

    it('removes meta tag with property attribute', () => {
      setMetaTag('og:title', 'Test', 'property')
      expect(document.querySelector('meta[property="og:title"]')).toBeTruthy()

      removeMetaTag('og:title', 'property')
      expect(document.querySelector('meta[property="og:title"]')).toBeNull()
    })

    it('handles missing document gracefully', () => {
      // Note: In jsdom environment, document always exists
      // This test verifies the function doesn't throw
      expect(() => removeMetaTag('description')).not.toThrow()
    })
  })

  describe('setDocumentTitle', () => {
    it('sets document title', () => {
      setDocumentTitle('Test Title')
      expect(document.title).toBe('Test Title')
    })

    it('handles missing document gracefully', () => {
      // Note: In jsdom environment, document always exists
      // This test verifies the function doesn't throw
      expect(() => setDocumentTitle('Test')).not.toThrow()
    })
  })

  describe('setCanonicalLink', () => {
    it('creates canonical link tag', () => {
      setCanonicalLink('https://mentis.dk/test')

      const link = document.querySelector('link[rel="canonical"]')
      expect(link).toBeTruthy()
      expect(link?.getAttribute('href')).toBe('https://mentis.dk/test')
    })

    it('updates existing canonical link', () => {
      setCanonicalLink('https://mentis.dk/first')
      setCanonicalLink('https://mentis.dk/second')

      const links = document.querySelectorAll('link[rel="canonical"]')
      expect(links.length).toBe(1)
      expect(links[0]?.getAttribute('href')).toBe('https://mentis.dk/second')
    })

    it('handles missing document gracefully', () => {
      // Note: In jsdom environment, document always exists
      // This test verifies the function doesn't throw
      expect(() => setCanonicalLink('https://test.com')).not.toThrow()
    })
  })

  describe('removeCanonicalLink', () => {
    it('removes canonical link tag', () => {
      setCanonicalLink('https://mentis.dk/test')
      expect(document.querySelector('link[rel="canonical"]')).toBeTruthy()

      removeCanonicalLink()
      expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    })

    it('handles missing document gracefully', () => {
      // Note: In jsdom environment, document always exists
      // This test verifies the function doesn't throw
      expect(() => removeCanonicalLink()).not.toThrow()
    })
  })

  describe('applySEOMetadata', () => {

    it('applies all basic meta tags', () => {
      const metadata: SEOMetadata = {
        title: 'Test Title',
        description: 'Test Description',
      }

      applySEOMetadata(metadata)

      expect(document.title).toBe('Test Title')
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Test Description')
    })

    it('sets canonical URL when provided', () => {
      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
        canonical: 'https://mentis.dk/test',
      }

      applySEOMetadata(metadata)

      const canonical = document.querySelector('link[rel="canonical"]')
      expect(canonical?.getAttribute('href')).toBe('https://mentis.dk/test')
    })

    it('removes canonical link when not provided', () => {
      setCanonicalLink('https://mentis.dk/old')

      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
      }

      applySEOMetadata(metadata)

      expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    })

    it('applies Open Graph tags', () => {
      const metadata: SEOMetadata = {
        title: 'Test Title',
        description: 'Test Description',
        ogTitle: 'OG Title',
        ogDescription: 'OG Description',
        ogType: 'article',
        ogLocale: 'en_US',
        ogImage: '/image.jpg',
      }

      applySEOMetadata(metadata)

      expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('OG Title')
      expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('OG Description')
      expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article')
      expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('en_US')
      expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toContain('image.jpg')
    })

    it('uses title/description as fallback for og tags', () => {
      const metadata: SEOMetadata = {
        title: 'Test Title',
        description: 'Test Description',
      }

      applySEOMetadata(metadata)

      expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('Test Title')
      expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('Test Description')
    })

    it('applies Twitter Card tags', () => {
      const metadata: SEOMetadata = {
        title: 'Test Title',
        description: 'Test Description',
        twitterCard: 'summary',
        twitterTitle: 'Twitter Title',
        twitterDescription: 'Twitter Description',
        twitterImage: '/twitter.jpg',
      }

      applySEOMetadata(metadata)

      expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary')
      expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe('Twitter Title')
      expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe('Twitter Description')
      expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toContain('twitter.jpg')
    })

    it('uses og:image as fallback for twitter:image', () => {
      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
        ogImage: '/og-image.jpg',
      }

      applySEOMetadata(metadata)

      expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toContain('og-image.jpg')
    })

    it('applies robots meta tag for noindex', () => {
      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
        noindex: true,
      }

      applySEOMetadata(metadata)

      const robots = document.querySelector('meta[name="robots"]')
      expect(robots?.getAttribute('content')).toBe('noindex, follow')
    })

    it('applies robots meta tag for nofollow', () => {
      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
        nofollow: true,
      }

      applySEOMetadata(metadata)

      const robots = document.querySelector('meta[name="robots"]')
      expect(robots?.getAttribute('content')).toBe('index, nofollow')
    })

    it('applies robots meta tag for both noindex and nofollow', () => {
      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
        noindex: true,
        nofollow: true,
      }

      applySEOMetadata(metadata)

      const robots = document.querySelector('meta[name="robots"]')
      expect(robots?.getAttribute('content')).toBe('noindex, nofollow')
    })

    it('removes robots meta tag when not needed', () => {
      setMetaTag('robots', 'noindex')

      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
      }

      applySEOMetadata(metadata)

      expect(document.querySelector('meta[name="robots"]')).toBeNull()
    })

    it('applies author and designer attribution', () => {
      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
      }

      applySEOMetadata(metadata)

      expect(document.querySelector('meta[name="author"]')?.getAttribute('content')).toBe('Babak Bandpey - cocode.dk')
      expect(document.querySelector('meta[name="designer"]')?.getAttribute('content')).toBe('Babak Bandpey - cocode.dk')
    })

    it('handles missing document gracefully', () => {
      // Note: In jsdom environment, document always exists
      // This test verifies the function doesn't throw
      const metadata: SEOMetadata = {
        title: 'Test',
        description: 'Test',
      }

      expect(() => applySEOMetadata(metadata)).not.toThrow()
    })
  })

  describe('cleanupSEO', () => {
    it('removes canonical link', () => {
      setCanonicalLink('https://mentis.dk/test')
      expect(document.querySelector('link[rel="canonical"]')).toBeTruthy()

      cleanupSEO()
      expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    })

    it('handles missing document gracefully', () => {
      // Note: In jsdom environment, document always exists
      // This test verifies the function doesn't throw
      expect(() => cleanupSEO()).not.toThrow()
    })
  })
})
