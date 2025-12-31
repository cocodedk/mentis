import { useParams } from 'react-router-dom'
import { Container, Section } from '@/components/layout'
import { Accordion } from '@/components/ui'
import { getPracticalInfoBySlug } from '@/data/practicalInfo'
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
              {item.accordionItems.map((accordionItem, index) => (
                <Accordion
                  key={index}
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
