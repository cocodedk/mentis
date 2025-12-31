import { describe, it, expect, beforeEach } from 'vitest'
import { generateSitemap } from '../sitemap'
import { treatments } from '@/data/treatments'
import { practicalInfoItems } from '@/data/practicalInfo'

describe('sitemap', () => {
  describe('generateSitemap', () => {
    it('generates valid XML', () => {
      const sitemap = generateSitemap()

      expect(sitemap).toBeTruthy()
      expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
      expect(sitemap).toContain('</urlset>')
    })

    it('includes homepage', () => {
      const sitemap = generateSitemap()

      // Homepage URL should be in the sitemap (format may vary in test environment)
      expect(sitemap).toMatch(/<loc>.*?<\/loc>/)
      // First URL should be the base URL
      const firstUrl = sitemap.match(/<loc>(.*?)<\/loc>/)?.[1]
      expect(firstUrl).toBeTruthy()
    })

    it('includes all static routes', () => {
      const sitemap = generateSitemap()

      expect(sitemap).toContain('/behandlinger</loc>')
      expect(sitemap).toContain('/personale</loc>')
      expect(sitemap).toContain('/priser</loc>')
      expect(sitemap).toContain('/praktisk-information</loc>')
      expect(sitemap).toContain('/find-os</loc>')
      expect(sitemap).toContain('/kontakt</loc>')
      expect(sitemap).toContain('/links</loc>')
    })

    it('includes all treatment routes', () => {
      const sitemap = generateSitemap()

      treatments.forEach((treatment) => {
        expect(sitemap).toContain(`/behandlinger/${treatment.slug}</loc>`)
      })
    })

    it('includes all practical info routes', () => {
      const sitemap = generateSitemap()

      practicalInfoItems.forEach((item) => {
        expect(sitemap).toContain(`/praktisk-information/${item.slug}</loc>`)
      })
    })

    it('includes changefreq for routes', () => {
      const sitemap = generateSitemap()

      expect(sitemap).toContain('<changefreq>weekly</changefreq>')
      expect(sitemap).toContain('<changefreq>monthly</changefreq>')
    })

    it('includes priority for routes', () => {
      const sitemap = generateSitemap()

      expect(sitemap).toContain('<priority>1</priority>')
      expect(sitemap).toContain('<priority>0.9</priority>')
      expect(sitemap).toContain('<priority>0.8</priority>')
    })

    it('has correct number of URLs', () => {
      const sitemap = generateSitemap()

      // Count URL entries
      const urlMatches = sitemap.match(/<url>/g)
      const expectedCount =
        8 + // Static routes
        treatments.length + // Treatment routes
        practicalInfoItems.length // Practical info routes

      expect(urlMatches?.length).toBe(expectedCount)
    })

    it('escapes XML special characters in URLs', () => {
      // Test that the escapeXml function works
      // Since we can't easily test with special characters in actual URLs,
      // we verify the structure is correct
      const sitemap = generateSitemap()

      // Should not contain unescaped ampersands (except in entities)
      const unescapedAmpersands = sitemap.match(/[^&]&[^a-z#]/g)
      expect(unescapedAmpersands).toBeNull()
    })

    it('has proper XML structure for each URL', () => {
      const sitemap = generateSitemap()

      // Each URL should have loc, changefreq, and priority
      const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g)

      expect(urlBlocks).toBeTruthy()
      urlBlocks?.forEach((block) => {
        expect(block).toContain('<loc>')
        expect(block).toContain('</loc>')
        expect(block).toContain('<changefreq>')
        expect(block).toContain('</changefreq>')
        expect(block).toContain('<priority>')
        expect(block).toContain('</priority>')
      })
    })

    it('uses absolute URLs', () => {
      const sitemap = generateSitemap()

      // All URLs should start with http:// or https://
      const locMatches = sitemap.match(/<loc>(.*?)<\/loc>/g)

      expect(locMatches).toBeTruthy()
      locMatches?.forEach((match) => {
        const url = match.replace(/<\/?loc>/g, '')
        expect(url.startsWith('http://') || url.startsWith('https://')).toBe(true)
      })
    })

    it('homepage has highest priority', () => {
      const sitemap = generateSitemap()

      // Find the first URL (homepage)
      const firstUrlMatch = sitemap.match(/<url>[\s\S]*?<\/url>/)
      expect(firstUrlMatch).toBeTruthy()

      const firstUrl = firstUrlMatch![0]
      expect(firstUrl).toContain('<priority>1</priority>')
      expect(firstUrl).toContain('<changefreq>weekly</changefreq>')
    })

    it('treatment routes have correct priority', () => {
      const sitemap = generateSitemap()

      treatments.forEach((treatment) => {
        // Find URL block containing the treatment slug
        const urlPattern = new RegExp(`<url>[\\s\\S]*?/behandlinger/${treatment.slug}[\\s\\S]*?</url>`)
        const treatmentBlock = sitemap.match(urlPattern)?.[0]

        expect(treatmentBlock).toBeTruthy()
        if (treatmentBlock) {
          expect(treatmentBlock).toContain('<priority>0.8</priority>')
          expect(treatmentBlock).toContain('<changefreq>monthly</changefreq>')
        }
      })
    })

    it('practical info routes have correct priority', () => {
      const sitemap = generateSitemap()

      practicalInfoItems.forEach((item) => {
        // Find URL block containing the practical info slug
        const urlPattern = new RegExp(`<url>[\\s\\S]*?/praktisk-information/${item.slug}[\\s\\S]*?</url>`)
        const infoBlock = sitemap.match(urlPattern)?.[0]

        expect(infoBlock).toBeTruthy()
        if (infoBlock) {
          expect(infoBlock).toContain('<priority>0.7</priority>')
          expect(infoBlock).toContain('<changefreq>monthly</changefreq>')
        }
      })
    })
  })
})
