import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applySEOMetadata, cleanupSEO, getCanonicalUrl, type SEOMetadata } from '@/utils/seo'
import { injectStructuredData } from '@/utils/structuredData'

/**
 * Type for structured data schemas
 */
export type StructuredDataSchema = object | null

/**
 * Hook options for SEO
 */
export interface UseSEOOptions {
  metadata: SEOMetadata
  structuredData?: StructuredDataSchema | StructuredDataSchema[]
}

/**
 * React hook to manage SEO metadata and structured data
 * Updates document title, meta tags, canonical URLs, and injects JSON-LD
 */
export function useSEO({ metadata, structuredData }: UseSEOOptions): void {
  const location = useLocation()

  useEffect(() => {
    // Apply SEO metadata
    const canonicalUrl = metadata.canonical || getCanonicalUrl(location.pathname)
    applySEOMetadata({
      ...metadata,
      canonical: canonicalUrl,
    })

    // Inject structured data
    const cleanupFunctions: Array<() => void> = []

    if (structuredData) {
      const schemas = Array.isArray(structuredData) ? structuredData : [structuredData]
      schemas.forEach((schema) => {
        if (schema) {
          const cleanup = injectStructuredData(schema)
          cleanupFunctions.push(cleanup)
        }
      })
    }

    // Cleanup function
    return () => {
      cleanupSEO()
      cleanupFunctions.forEach((cleanup) => cleanup())
    }
  }, [location.pathname, metadata, structuredData])
}
