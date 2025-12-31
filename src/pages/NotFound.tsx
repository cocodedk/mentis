import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Container, Section } from '@/components/layout'

/**
 * 404 error page component
 */
export default function NotFound() {
  return (
    <Section background="neutral-100" padding="lg">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-h1 text-primary-500 mb-4">404</h1>
          <h2 className="text-h2 text-neutral-900 mb-4">
            Siden blev ikke fundet
          </h2>
          <p className="text-body-lg text-neutral-600 mb-8">
            Den side, du leder efter, eksisterer ikke eller er blevet flyttet.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Tilbage til forsiden
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
