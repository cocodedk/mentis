import { Link } from 'react-router-dom'
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui'

/**
 * Condensed practical information section for homepage
 * List of key topics with icons
 */
export function PracticalInfoPreview() {
  const topics = [
    {
      icon: MapPinIcon,
      label: 'Hvor foregår behandlingen?',
      path: '/find-os',
    },
    {
      icon: PhoneIcon,
      label: 'Telefon & kontakt',
      path: '/praktisk-information/telefonisk-kontakt',
    },
    {
      icon: ClockIcon,
      label: 'Åbningstider',
      path: '/praktisk-information/konsultation',
    },
    {
      icon: XCircleIcon,
      label: 'Afbud & regler',
      path: '/praktisk-information/afbud',
    },
  ]

  return (
    <section className="py-16 bg-neutral-200">
      <div className="container mx-auto px-4">
        <h2 className="text-h2 text-primary-500 mb-8 text-center">
          Praktisk information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {topics.map((topic) => {
            const IconComponent = topic.icon
            return (
              <Link
                key={topic.path}
                to={topic.path}
                className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <IconComponent
                  className="w-6 h-6 mr-4 text-primary-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-body text-neutral-900">{topic.label}</span>
              </Link>
            )
          })}
        </div>
        <div className="text-center">
          <Link to="/praktisk-information">
            <Button variant="secondary">Se alle praktiske oplysninger</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
