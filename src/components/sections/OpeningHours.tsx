import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

/**
 * Opening hours and contact section
 * Displays phone number, hours, consultation info
 */
export function OpeningHours() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-h2 text-primary-500 mb-8 text-center">Kontakt</h2>
        <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-sm">
          <div className="space-y-4 text-body text-neutral-900">
            <div>
              <strong className="text-neutral-900">Konsultation:</strong>{' '}
              Efter aftale
            </div>
            <div>
              <strong className="text-neutral-900">Telefon:</strong> Man–Fre
              09:00–10:30
            </div>
            <div>
              <strong className="text-neutral-900">Tlf:</strong>{' '}
              <a
                href="tel:81409333"
                className="text-primary-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                81 40 93 33
              </a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/kontakt">
              <Button variant="primary">Kontaktformular</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
