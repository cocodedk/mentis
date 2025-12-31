import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import { Container, Section } from '@/components/layout'
import { useSEO } from '@/hooks/useSEO'

/**
 * 404 error page component
 */
export default function NotFound() {
  useSEO({
    metadata: {
      title: '404 - Siden blev ikke fundet - Mentis',
      description:
        'Den side, du leder efter, eksisterer ikke eller er blevet flyttet.',
      ogTitle: '404 - Siden blev ikke fundet',
      ogDescription:
        'Den side, du leder efter, eksisterer ikke eller er blevet flyttet.',
      ogType: 'website',
      ogLocale: 'da_DK',
      twitterCard: 'summary_large_image',
      noindex: true, // Don't index 404 pages
    },
  })

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
