import { useState } from 'react'
import { Modal } from '@/components/ui'
import { Grid, Container, Section } from '@/components/layout'
import { StaffCard } from '@/components/sections/StaffCard'
import { StaffDetail } from '@/components/sections/StaffDetail'
import { staffMembers } from '@/data/staff'
import type { StaffMember } from '@/data/staff'
import { useSEO } from '@/hooks/useSEO'
import {
  generateCollectionPageSchema,
  generatePersonSchema,
  generateBreadcrumbSchema,
} from '@/utils/structuredData'
import { getAbsoluteUrl } from '@/utils/seo'

/**
 * Staff overview page
 * Grid of staff cards
 * Click opens Modal with full bio
 */
export default function StaffPage() {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)

  const organizationUrl = getAbsoluteUrl('/')
  const staffItems = staffMembers.map((staff) => ({
    name: staff.name,
    url: '/personale',
  }))

  // Generate Person schemas for all staff members
  const personSchemas = staffMembers.map((staff) =>
    generatePersonSchema(staff, organizationUrl)
  )

  useSEO({
    metadata: {
      title: 'Personale - Mentis Neuropsykiatrisk Klinik',
      description:
        'Vores tværfaglige team består af erfarne psykiatere, psykologer og specialister. Se vores eksperter inden for neuropsykiatri, TMS-behandling, psykoterapi og mere.',
      ogTitle: 'Personale - Mentis Neuropsykiatrisk Klinik',
      ogDescription:
        'Tværfagligt team af erfarne psykiatere, psykologer og specialister',
      ogType: 'website',
      ogLocale: 'da_DK',
      twitterCard: 'summary_large_image',
    },
    structuredData: [
      generateCollectionPageSchema(
        'Personale',
        'Tværfagligt team af erfarne psykiatere, psykologer og specialister',
        '/personale',
        staffItems
      ),
      ...personSchemas,
      generateBreadcrumbSchema('/personale'),
    ],
  })

  return (
    <>
      <Section background="neutral-100" padding="lg">
        <Container>
          <h1 className="text-h1 text-primary-500 mb-4 text-center">
            Personale
          </h1>
          <p className="text-body-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
            Vores tværfaglige team består af erfarne psykiatere, psykologer og
            specialister.
          </p>
          <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="lg">
            {staffMembers.map((staff) => (
              <StaffCard
                key={staff.id}
                staff={staff}
                onClick={() => setSelectedStaff(staff)}
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {selectedStaff && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedStaff(null)}
          title={selectedStaff.name}
          size="lg"
        >
          <StaffDetail staff={selectedStaff} />
        </Modal>
      )}
    </>
  )
}
