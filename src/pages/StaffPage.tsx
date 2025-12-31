import { useState } from 'react'
import { Modal } from '@/components/ui'
import { Grid, Container, Section } from '@/components/layout'
import { StaffCard } from '@/components/sections/StaffCard'
import { StaffDetail } from '@/components/sections/StaffDetail'
import { staffMembers } from '@/data/staff'
import type { StaffMember } from '@/data/staff'

/**
 * Staff overview page
 * Grid of staff cards
 * Click opens Modal with full bio
 */
export default function StaffPage() {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)

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
          isOpen={!!selectedStaff}
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
