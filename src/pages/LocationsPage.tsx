import { Card } from '@/components/ui'
import { Grid, Container, Section } from '@/components/layout'
import { locations } from '@/data/locations'

/**
 * Normalizes a phone number for use in tel: links.
 * Removes all non-digit characters while preserving a leading '+' if present.
 * Returns null if the input is invalid or would produce an empty result.
 */
function normalizePhoneNumber(phone: string | null | undefined): string | null {
  if (!phone) {
    return null
  }

  const trimmed = phone.trim()
  if (!trimmed) {
    return null
  }

  const hasLeadingPlus = trimmed.startsWith('+')
  const digitsOnly = trimmed.replace(/\D/g, '')

  if (!digitsOnly) {
    return null
  }

  return hasLeadingPlus ? `+${digitsOnly}` : digitsOnly
}

/**
 * Generates a Google Maps search URL from location data.
 * Combines address, postal code, and city into a full address string,
 * then URL-encodes it for use in Google Maps search.
 */
function generateGoogleMapsUrl(
  address: string,
  postalCode: string,
  city: string
): string {
  const fullAddress = `${address}, ${postalCode} ${city}, Denmark`
  const encodedAddress = encodeURIComponent(fullAddress)
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
}

/**
 * Find os (locations) page
 * Lists all clinic locations
 */
export default function LocationsPage() {
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
          {locations.map((location) => {
            const normalizedPhone = normalizePhoneNumber(location.phone)
            const googleMapsUrl = generateGoogleMapsUrl(
              location.address,
              location.postalCode,
              location.city
            )
            return (
              <Card key={location.id} variant="default">
                <h2 className="text-h2 text-neutral-900 mb-4">
                  {location.name}
                </h2>
                <div className="space-y-2 text-body text-neutral-600">
                  <p>{location.address}</p>
                  <p>
                    {location.postalCode} {location.city}
                  </p>
                  {location.phone && normalizedPhone && (
                    <p>
                      <a
                        href={`tel:${normalizedPhone}`}
                        className="text-primary-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                      >
                        {location.phone}
                      </a>
                    </p>
                  )}
                  <p>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                      aria-label={`Se ${location.name} på Google Maps`}
                    >
                      Se på Google Maps
                    </a>
                  </p>
                </div>
              </Card>
            )
          })}
        </Grid>
      </Container>
    </Section>
  )
}
