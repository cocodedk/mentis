import { Link } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { Grid, Container, Section } from '@/components/layout'
import { treatments } from '@/data/treatments'

/**
 * Treatments overview page
 * Grid of all treatment cards
 */
export function TreatmentsPage() {
  return (
    <Section background="neutral-100" padding="lg">
      <Container>
        <h1 className="text-h1 text-primary-500 mb-4 text-center">
          Behandlinger
        </h1>
        <p className="text-body-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
          Vi tilbyder en række specialiserede behandlinger og evalueringer
          inden for neuropsykiatri og psykiatri.
        </p>
        <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg">
          {treatments.map((treatment) => (
            <Card key={treatment.id} variant="treatment">
              <h2 className="text-h2 text-neutral-900 mb-3">
                {treatment.title}
              </h2>
              <p className="text-body text-neutral-600 mb-4">
                {treatment.shortDescription}
              </p>
              <Link to={`/behandlinger/${treatment.slug}`}>
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
