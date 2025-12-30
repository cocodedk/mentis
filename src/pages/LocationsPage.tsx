import { Card } from '@/components/ui'
import { Grid, Container, Section } from '@/components/layout'
import { locations } from '@/data/locations'

/**
 * Find os (locations) page
 * Lists all clinic locations
 */
export function LocationsPage() {
  return (
    <Section background="neutral-100" padding="lg">
      <Container>
        <h1 className="text-h1 text-primary-500 mb-4 text-center">
          Find os
        </h1>
        <p className="text-body-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
          Du modtager et brev med tiden og stedet for din konsultation. Her er
          vores klinikker:
        </p>
        <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg">
          {locations.map((location) => (
            <Card key={location.id} variant="default">
              <h2 className="text-h2 text-neutral-900 mb-4">
                {location.name}
              </h2>
              <div className="space-y-2 text-body text-neutral-600">
                <p>{location.address}</p>
                <p>
                  {location.postalCode} {location.city}
                </p>
                {location.phone && (
                  <p>
                    <a
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      className="text-primary-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    >
                      {location.phone}
                    </a>
                  </p>
                )}
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
