import { Link } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { Grid } from '@/components/layout'
import { treatments } from '@/data/treatments'

interface ServicesOverviewProps {
  maxVisibleTreatments?: number
}

/**
 * Services overview grid section
 * Displays treatment cards in a grid layout
 */
export function ServicesOverview({
  maxVisibleTreatments = 5,
}: ServicesOverviewProps = {}) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-h2 text-primary-500 mb-8 text-center">
          Vores behandlinger
        </h2>
        <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg">
          {treatments.slice(0, maxVisibleTreatments).map((treatment) => (
            <Card key={treatment.id} variant="treatment">
              <h3 className="text-h3 text-neutral-900 mb-3">
                {treatment.title}
              </h3>
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
      </div>
    </section>
  )
}
