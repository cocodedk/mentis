/**
 * Sitemap generation utility
 * Generates sitemap.xml content for all routes
 */

import { getAbsoluteUrl } from './seo'
import { treatments } from '@/data/treatments'
import { practicalInfoItems } from '@/data/practicalInfo'

export interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

/**
 * Generate sitemap.xml content
 */
export function generateSitemap(): string {
  const baseUrl = getAbsoluteUrl('/')
  const urls: SitemapUrl[] = []

  // Static routes
  urls.push({
    loc: baseUrl,
    changefreq: 'weekly',
    priority: 1.0,
  })

  urls.push({
    loc: `${baseUrl}behandlinger`,
    changefreq: 'monthly',
    priority: 0.9,
  })

  urls.push({
    loc: `${baseUrl}personale`,
    changefreq: 'monthly',
    priority: 0.8,
  })

  urls.push({
    loc: `${baseUrl}priser`,
    changefreq: 'monthly',
    priority: 0.7,
  })

  urls.push({
    loc: `${baseUrl}praktisk-information`,
    changefreq: 'monthly',
    priority: 0.8,
  })

  urls.push({
    loc: `${baseUrl}find-os`,
    changefreq: 'monthly',
    priority: 0.7,
  })

  urls.push({
    loc: `${baseUrl}kontakt`,
    changefreq: 'monthly',
    priority: 0.8,
  })

  urls.push({
    loc: `${baseUrl}links`,
    changefreq: 'monthly',
    priority: 0.5,
  })

  // Dynamic treatment routes
  treatments.forEach((treatment) => {
    urls.push({
      loc: `${baseUrl}behandlinger/${treatment.slug}`,
      changefreq: 'monthly',
      priority: 0.8,
    })
  })

  // Dynamic practical info routes
  practicalInfoItems.forEach((item) => {
    urls.push({
      loc: `${baseUrl}praktisk-information/${item.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
    })
  })

  // Generate XML
  const urlElements = urls
    .map((url) => {
      const loc = `    <loc>${escapeXml(url.loc)}</loc>`
      const lastmod = url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : ''
      const changefreq = url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>` : ''
      const priority = url.priority !== undefined ? `    <priority>${url.priority}</priority>` : ''

      const parts = [loc]
      if (lastmod) parts.push(lastmod)
      if (changefreq) parts.push(changefreq)
      if (priority) parts.push(priority)

      return `  <url>\n${parts.join('\n')}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
