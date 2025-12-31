import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Container, Section } from '@/components/layout'
import { TreatmentDetail } from '@/components/sections/TreatmentDetail'
import { getTreatmentBySlug, type Slug } from '@/data/treatments'
import { useSEO } from '@/hooks/useSEO'
import {
  generateMedicalProcedureSchema,
  generateBreadcrumbSchema,
} from '@/utils/structuredData'
import NotFound from './NotFound'

/**
 * Individual treatment page
 * Dynamic route: /behandlinger/:slug
 */
export default function TreatmentDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const treatment = slug ? getTreatmentBySlug(slug as Slug) : undefined

  if (!treatment) {
    return <NotFound />
  }

  useSEO({
    metadata: {
      title: `${treatment.title} - Mentis Neuropsykiatrisk Klinik`,
      description: treatment.shortDescription,
      ogTitle: treatment.title,
      ogDescription: treatment.shortDescription,
      ogType: 'website',
      ogLocale: 'da_DK',
      twitterCard: 'summary_large_image',
    },
    structuredData: [
      generateMedicalProcedureSchema(treatment),
      generateBreadcrumbSchema(`/behandlinger/${treatment.slug}`),
    ],
  })

  return (
    <>
      <Section background="white" padding="lg">
        <Container>
          <h1 className="text-h1 text-primary-500 mb-4">{treatment.title}</h1>
          <p className="text-body-lg text-neutral-600 mb-8">
            {treatment.shortDescription}
          </p>
        </Container>
      </Section>
      <TreatmentDetail treatment={treatment} />
      <Section background="neutral-200" padding="lg">
        <Container>
          <div className="text-center">
            <Link to="/kontakt">
              <Button variant="primary" size="lg">
                Kontakt os om behandling
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
