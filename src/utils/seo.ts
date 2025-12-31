/**
 * SEO utility functions
 * Handles meta tags, canonical URLs, and absolute URL construction
 */

export interface SEOMetadata {
  title: string
  description: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  ogLocale?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  noindex?: boolean
  nofollow?: boolean
}

/**
 * Get the base URL from environment or default to production URL
 */
export function getBaseUrl(): string {
  const basePath = import.meta.env.BASE_URL || '/'
  // In production, use the actual domain
  if (import.meta.env.PROD) {
    return 'https://mentis.dk'
  }
  // In development, construct from window location
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    return `${protocol}//${host}${basePath}`
  }
  return 'https://mentis.dk'
}

/**
 * Construct an absolute URL from a path
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = getBaseUrl()
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const basePath = import.meta.env.BASE_URL || '/'
  const fullPath = basePath === '/' ? cleanPath : `${basePath}${cleanPath}`
  return `${baseUrl}${fullPath}`
}

/**
 * Generate canonical URL from path
 */
export function getCanonicalUrl(path: string): string {
  return getAbsoluteUrl(path)
}

/**
 * Update or create a meta tag in the document head
 */
export function setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
  if (typeof document === 'undefined') return

  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

/**
 * Remove a meta tag from the document head
 */
export function removeMetaTag(name: string, attribute: 'name' | 'property' = 'name'): void {
  if (typeof document === 'undefined') return

  const element = document.querySelector(`meta[${attribute}="${name}"]`)
  if (element) {
    element.remove()
  }
}

/**
 * Update the document title
 */
export function setDocumentTitle(title: string): void {
  if (typeof document === 'undefined') return
  document.title = title
}

/**
 * Set canonical link tag
 */
export function setCanonicalLink(url: string): void {
  if (typeof document === 'undefined') return

  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', url)
}

/**
 * Remove canonical link tag
 */
export function removeCanonicalLink(): void {
  if (typeof document === 'undefined') return

  const link = document.querySelector('link[rel="canonical"]')
  if (link) {
    link.remove()
  }
}

/**
 * Apply SEO metadata to the document
 */
export function applySEOMetadata(metadata: SEOMetadata): void {
  if (typeof document === 'undefined') return

  // Set document title
  setDocumentTitle(metadata.title)

  // Set meta description
  setMetaTag('description', metadata.description)

  // Set canonical URL
  if (metadata.canonical) {
    setCanonicalLink(metadata.canonical)
  } else {
    removeCanonicalLink()
  }

  // Open Graph tags
  setMetaTag('og:title', metadata.ogTitle || metadata.title, 'property')
  setMetaTag('og:description', metadata.ogDescription || metadata.description, 'property')
  setMetaTag('og:type', metadata.ogType || 'website', 'property')
  setMetaTag('og:locale', metadata.ogLocale || 'da_DK', 'property')

  if (metadata.ogImage) {
    setMetaTag('og:image', getAbsoluteUrl(metadata.ogImage), 'property')
  }

  // Twitter Card tags
  const twitterCard = metadata.twitterCard || 'summary_large_image'
  setMetaTag('twitter:card', twitterCard)
  setMetaTag('twitter:title', metadata.twitterTitle || metadata.title)
  setMetaTag('twitter:description', metadata.twitterDescription || metadata.description)

  if (metadata.twitterImage) {
    setMetaTag('twitter:image', getAbsoluteUrl(metadata.twitterImage))
  } else if (metadata.ogImage) {
    setMetaTag('twitter:image', getAbsoluteUrl(metadata.ogImage))
  }

  // Robots meta tags
  if (metadata.noindex || metadata.nofollow) {
    const robotsContent = [
      metadata.noindex ? 'noindex' : 'index',
      metadata.nofollow ? 'nofollow' : 'follow',
    ].join(', ')
    setMetaTag('robots', robotsContent)
  } else {
    removeMetaTag('robots')
  }

  // Author/Creator attribution
  setMetaTag('author', 'Babak Bandpey - cocode.dk')
  setMetaTag('designer', 'Babak Bandpey - cocode.dk')
}

/**
 * Clean up SEO metadata (for cleanup on unmount)
 */
export function cleanupSEO(): void {
  // Note: We don't remove all meta tags as some are in index.html
  // We only remove canonical link if needed
  removeCanonicalLink()
}
