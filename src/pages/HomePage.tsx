import { Hero } from '@/components/sections/Hero'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { PracticalInfoPreview } from '@/components/sections/PracticalInfoPreview'
import { OpeningHours } from '@/components/sections/OpeningHours'
import { useSEO } from '@/hooks/useSEO'
import {
  generateMedicalOrganizationSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
} from '@/utils/structuredData'

/**
 * Main homepage component
 * Includes all homepage sections
 */
export default function HomePage() {
  useSEO({
    metadata: {
      title: 'Mentis Neuropsykiatrisk Klinik - Specialiseret udredning og behandling',
      description:
        'Mentis Neuropsykiatrisk Klinik - Specialiseret neuropsykiatrisk udredning og behandling. Tværfagligt team af psykiatere, psykologer og specialister i Jylland og på Sjælland.',
      ogTitle: 'Mentis Neuropsykiatrisk Klinik',
      ogDescription:
        'Specialiseret neuropsykiatrisk udredning og behandling. Tværfagligt team af psykiatere, psykologer og specialister i Jylland og på Sjælland.',
      ogType: 'website',
      ogLocale: 'da_DK',
      ogImage: '/vite.svg', // TODO: Replace with actual clinic logo/hero image (recommended: 1200x630px)
      twitterCard: 'summary_large_image',
      twitterTitle: 'Mentis Neuropsykiatrisk Klinik',
      twitterDescription:
        'Specialiseret neuropsykiatrisk udredning og behandling. Tværfagligt team af psykiatere, psykologer og specialister i Jylland og på Sjælland.',
    },
    structuredData: [
      generateMedicalOrganizationSchema(),
      generateWebSiteSchema(),
      generateBreadcrumbSchema('/'),
    ],
  })

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
