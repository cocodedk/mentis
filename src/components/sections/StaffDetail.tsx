import type { StaffMember } from '@/data/staff'

/**
 * Staff detail content for modal
 * Shows: bio, specialisations, languages, certifications
 */
export function StaffDetail({ staff }: { staff: StaffMember }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        {staff.photo ? (
          <img
            src={staff.photo}
            alt={`${staff.name}, ${staff.role}`}
            className="w-32 h-32 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="w-32 h-32 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0"
            aria-label={`${staff.name}, ${staff.role}`}
          >
            <span className="text-4xl text-neutral-400" aria-hidden="true">
              {staff.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h3 className="text-h2 text-neutral-900 mb-2">{staff.name}</h3>
          <p className="text-body-lg text-primary-500 mb-4">{staff.role}</p>
        </div>
      </div>

      <div>
        <h4 className="text-h3 text-neutral-900 mb-2">Om</h4>
        <p className="text-body text-neutral-600">{staff.bio}</p>
      </div>

      {staff.specialisations.length > 0 && (
        <div>
          <h4 className="text-h3 text-neutral-900 mb-2">Specialer</h4>
          <ul className="space-y-1">
            {staff.specialisations.map((spec, index) => (
              <li key={index} className="text-body text-neutral-600">
                • {spec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {staff.languages.length > 0 && (
        <div>
          <h4 className="text-h3 text-neutral-900 mb-2">Sprog</h4>
          <p className="text-body text-neutral-600">
            {staff.languages.join(', ')}
          </p>
        </div>
      )}

      {staff.certifications && staff.certifications.length > 0 && (
        <div>
          <h4 className="text-h3 text-neutral-900 mb-2">Certificeringer</h4>
          <ul className="space-y-1">
            {staff.certifications.map((cert, index) => (
              <li key={index} className="text-body text-neutral-600">
                • {cert}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
