import { Link } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { Grid, Container, Section } from '@/components/layout'
import { practicalInfoItems } from '@/data/practicalInfo'
import { useSEO } from '@/hooks/useSEO'
import {
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
} from '@/utils/structuredData'

/**
 * Main practical information page
 * List of all practical info topics
 */
export default function PracticalInfoPage() {
  const infoItems = practicalInfoItems.map((item) => ({
    name: item.title,
    url: `/praktisk-information/${item.slug}`,
  }))

  useSEO({
    metadata: {
      title: 'Praktisk Information - Mentis Neuropsykiatrisk Klinik',
      description:
        'Her finder du praktisk information om konsultationer, kontakt, afbud, tolkebistand, akut hjælp og meget mere.',
      ogTitle: 'Praktisk Information - Mentis Neuropsykiatrisk Klinik',
      ogDescription:
        'Praktisk information om konsultationer, kontakt, afbud og meget mere',
      ogType: 'website',
      ogLocale: 'da_DK',
      twitterCard: 'summary_large_image',
    },
    structuredData: [
      generateCollectionPageSchema(
        'Praktisk Information',
        'Praktisk information om konsultationer, kontakt, afbud og meget mere',
        '/praktisk-information',
        infoItems
      ),
      generateBreadcrumbSchema('/praktisk-information'),
    ],
  })

  return (
    <Section background="neutral-100" padding="lg">
      <Container>
        <h1 className="text-h1 text-primary-500 mb-4 text-center">
          Praktisk information
        </h1>
        <p className="text-body-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
          Her finder du praktisk information om konsultationer, kontakt,
          afbud og meget mere.
        </p>
        <Grid cols={{ default: 1, md: 2 }} gap="md">
          {practicalInfoItems.map((item) => (
            <Card key={item.id} variant="info">
              <h2 className="text-h2 text-neutral-900 mb-3">{item.title}</h2>
              <p className="text-body text-neutral-600 mb-4 line-clamp-3">
                {item.content}
              </p>
              <Link to={`/praktisk-information/${item.slug}`}>
                <Button variant="text" size="sm">
                  Læs mere
                </Button>
              </Link>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
