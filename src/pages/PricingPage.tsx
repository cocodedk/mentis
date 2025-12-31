import { Container, Section } from '@/components/layout'
import { PricingTable } from '@/components/sections/PricingTable'

/**
 * Pricing page
 * Uses PricingTable component
 * Groups prices by category
 */
export default function PricingPage() {
  return (
    <Section background="neutral-100" padding="lg">
      <Container>
        <h1 className="text-h1 text-primary-500 mb-4 text-center">Priser</h1>
        <p className="text-body-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
          Alle priser er i DKK. Kontakt os ved spørgsmål om priser eller
          tilbud.
        </p>
        <PricingTable />
      </Container>
    </Section>
  )
}
