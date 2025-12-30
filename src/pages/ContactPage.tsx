import { useState } from 'react'
import { Button, Input, Textarea, Alert } from '@/components/ui'
import { Container, Section } from '@/components/layout'

/**
 * Contact page/form
 * Contact form using Input and Textarea components
 */
export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Navn er påkrævet'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email er påkrævet'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ugyldig email-adresse'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Besked er påkrævet'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  return (
    <Section background="neutral-100" padding="lg">
      <Container>
        <h1 className="text-h1 text-primary-500 mb-4 text-center">Kontakt</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-h2 text-neutral-900 mb-4">Kontaktinformation</h2>
            <div className="space-y-3 text-body text-neutral-600">
              <p>
                <strong>Telefon:</strong>{' '}
                <a
                  href="tel:81409333"
                  className="text-primary-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  81 40 93 33
                </a>
              </p>
              <p>
                <strong>Telefontid:</strong> Mandag, tirsdag, torsdag og fredag
                09:00–10:30
              </p>
              <p>
                <strong>Konsultation:</strong> Efter aftale
              </p>
            </div>
          </div>

          {submitted ? (
            <Alert variant="info" title="Tak for din besked">
              Vi har modtaget din besked og vender tilbage så hurtigt som
              muligt.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8">
              <h2 className="text-h2 text-neutral-900 mb-6">
                Send os en besked
              </h2>
              <div className="space-y-6">
                <Input
                  label="Navn"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
                <Input
                  label="Telefon"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                <Textarea
                  label="Besked"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                  rows={6}
                />
                <Button type="submit" variant="primary" size="lg">
                  Send besked
                </Button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </Section>
  )
}
