import { useParams } from 'react-router-dom'
import { Container, Section } from '@/components/layout'
import { Accordion } from '@/components/ui'
import { getPracticalInfoBySlug } from '@/data/practicalInfo'
import { useSEO } from '@/hooks/useSEO'
import {
  generateFAQPageSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/utils/structuredData'
import NotFound from './NotFound'

/**
 * Individual practical info page
 * Dynamic route: /praktisk-information/:slug
 * Uses Accordion for collapsible sections
 */
export default function PracticalInfoDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getPracticalInfoBySlug(slug) : undefined

  if (!item) {
    return <NotFound />
  }

  // Use FAQPage schema if item has accordions, otherwise Article schema
  const faqSchema = generateFAQPageSchema(item)
  const articleSchema = !faqSchema ? generateArticleSchema(item) : null

  const structuredData = [
    faqSchema || articleSchema,
    generateBreadcrumbSchema(`/praktisk-information/${item.slug}`),
  ].filter(Boolean)

  useSEO({
    metadata: {
      title: `${item.title} - Praktisk Information - Mentis`,
      description: item.content.substring(0, 160),
      ogTitle: item.title,
      ogDescription: item.content.substring(0, 160),
      ogType: 'article',
      ogLocale: 'da_DK',
      twitterCard: 'summary_large_image',
    },
    structuredData,
  })

  return (
    <Section background="neutral-100" padding="lg">
      <Container>
        <h1 className="text-h1 text-primary-500 mb-8">{item.title}</h1>
        <div className="max-w-3xl">
          <div className="bg-white rounded-lg p-8 mb-8">
            <p className="text-body-lg text-neutral-900">{item.content}</p>
          </div>

          {item.hasAccordion && item.accordionItems && (
            <div className="space-y-4">
              {item.accordionItems.map((accordionItem) => (
                <Accordion
                  key={accordionItem.id}
                  title={accordionItem.title}
                  defaultOpen={false}
                >
                  <p className="text-body text-neutral-600">
                    {accordionItem.content}
                  </p>
                </Accordion>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
