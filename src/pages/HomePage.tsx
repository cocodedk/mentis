import { Hero } from '@/components/sections/Hero'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { PracticalInfoPreview } from '@/components/sections/PracticalInfoPreview'
import { OpeningHours } from '@/components/sections/OpeningHours'

/**
 * Main homepage component
 * Includes all homepage sections
 */
export function HomePage() {
  return (
    <>
      <Hero
        headline="Specialiseret neuropsykiatrisk udredning og behandling"
        subheadline="Tværfagligt team af psykiatere, psykologer og specialister i Jylland og på Sjælland."
        primaryCTA={{
          label: 'Kontakt klinikken',
          path: '/kontakt',
        }}
        secondaryCTA={{
          label: 'Se behandlinger',
          path: '/behandlinger',
        }}
      />
      <ServicesOverview />
      <PracticalInfoPreview />
      <OpeningHours />
    </>
  )
}
