import type { Treatment } from '@/data/treatments'
import { Section } from '@/components/layout'

/**
 * Treatment detail sections component
 * Structured sections: What is it, Who is it for, How it works, Practical details
 */
export function TreatmentDetail({ treatment }: { treatment: Treatment }) {
  return (
    <div className="space-y-12">
      <Section background="white" padding="md">
        <div className="container mx-auto px-4">
          <h2 className="text-h2 text-primary-500 mb-4">Hvad er {treatment.title}?</h2>
          <p className="text-body-lg text-neutral-900">{treatment.whatIsIt}</p>
        </div>
      </Section>

      <Section background="neutral-100" padding="md">
        <div className="container mx-auto px-4">
          <h2 className="text-h2 text-primary-500 mb-4">
            Hvem egner behandlingen sig til?
          </h2>
          <ul className="space-y-2">
            {treatment.whoIsItFor.map((item, index) => (
              <li key={index} className="text-body text-neutral-900 flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section background="white" padding="md">
        <div className="container mx-auto px-4">
          <h2 className="text-h2 text-primary-500 mb-4">
            Hvordan foregår behandlingen?
          </h2>
          <div className="space-y-4">
            {treatment.howItWorks.map((step, index) => (
              <div key={index} className="flex items-start">
                <span className="text-primary-500 font-semibold mr-4 min-w-[2rem]">
                  {index + 1}.
                </span>
                <p className="text-body text-neutral-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {treatment.practicalDetails && (
        <Section background="neutral-200" padding="md">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 text-primary-500 mb-4">
              Praktisk information
            </h2>
            <div className="space-y-3">
              {treatment.practicalDetails.duration && (
                <div>
                  <strong className="text-neutral-900">Varighed:</strong>{' '}
                  <span className="text-neutral-600">
                    {treatment.practicalDetails.duration}
                  </span>
                </div>
              )}
              {treatment.practicalDetails.sessions && (
                <div>
                  <strong className="text-neutral-900">Sessioner:</strong>{' '}
                  <span className="text-neutral-600">
                    {treatment.practicalDetails.sessions}
                  </span>
                </div>
              )}
              {treatment.practicalDetails.sideEffects && (
                <div>
                  <strong className="text-neutral-900">Bivirkninger:</strong>{' '}
                  <span className="text-neutral-600">
                    {treatment.practicalDetails.sideEffects}
                  </span>
                </div>
              )}
              {treatment.practicalDetails.frequency && (
                <div>
                  <strong className="text-neutral-900">Frekvens:</strong>{' '}
                  <span className="text-neutral-600">
                    {treatment.practicalDetails.frequency}
                  </span>
                </div>
              )}
              {treatment.practicalDetails.price && (
                <div>
                  <strong className="text-neutral-900">Pris:</strong>{' '}
                  <span className="text-neutral-600">
                    {treatment.practicalDetails.price}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}
    </div>
  )
}
