import { Card } from '@/components/ui'
import { StaffMember } from '@/data/staff'

interface StaffCardProps {
  staff: StaffMember
  onClick: () => void
}

/**
 * Staff card component
 * Displays photo, name, role
 * Clickable to open modal
 */
export function StaffCard({ staff, onClick }: StaffCardProps) {
  return (
    <Card variant="staff" onClick={onClick}>
      <div className="text-center">
        {staff.photo ? (
          <img
            src={staff.photo}
            alt={`${staff.name}, ${staff.role}`}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        ) : (
          <div
            className="w-32 h-32 rounded-full mx-auto mb-4 bg-neutral-200 flex items-center justify-center"
            aria-label={`${staff.name}, ${staff.role}`}
          >
            <span className="text-4xl text-neutral-400" aria-hidden="true">
              {staff.name.charAt(0)}
            </span>
          </div>
        )}
        <h3 className="text-h3 text-neutral-900 mb-2">{staff.name}</h3>
        <p className="text-body text-primary-500 mb-4">{staff.role}</p>
        <p className="text-body-sm text-neutral-600">Klik for at se profil</p>
      </div>
    </Card>
  )
}
