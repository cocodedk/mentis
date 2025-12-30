import { Card } from '@/components/ui'
import { Grid, Container, Section } from '@/components/layout'

interface LinkCategory {
  category: string
  links: {
    name: string
    url: string
    description?: string
  }[]
}

const linkCategories: LinkCategory[] = [
  {
    category: 'Sundhedsportaler',
    links: [
      {
        name: 'min.medicin.dk',
        url: 'https://min.medicin.dk',
        description: 'Lægemiddelinformation',
      },
      {
        name: 'sundhed.dk',
        url: 'https://www.sundhed.dk',
        description: 'Sundhedsportal',
      },
    ],
  },
  {
    category: 'Akutte tjenester',
    links: [
      {
        name: 'lægevagten.dk',
        url: 'https://www.laegevagten.dk',
        description: 'Lægevagt',
      },
    ],
  },
  {
    category: 'Psykisk sundhed',
    links: [
      {
        name: 'psykiatrifonden.dk',
        url: 'https://www.psykiatrifonden.dk',
        description: 'Psykiatrifonden',
      },
      {
        name: 'psykinfo.dk',
        url: 'https://www.psykinfo.dk',
        description: 'Psykinfo',
      },
    ],
  },
  {
    category: 'Patientrettigheder',
    links: [
      {
        name: 'forbrug.dk',
        url: 'https://www.forbrug.dk',
        description: 'Forbrugerrådet',
      },
    ],
  },
  {
    category: 'Transport',
    links: [
      {
        name: 'midttrafik.dk',
        url: 'https://www.midttrafik.dk',
        description: 'Midttrafik',
      },
    ],
  },
  {
    category: 'Faglige organisationer',
    links: [
      {
        name: 'Dansk Psykiatrisk Selskab',
        url: 'https://www.psykiatrisk-selskab.dk',
        description: 'Dansk Psykiatrisk Selskab',
      },
    ],
  },
]

/**
 * Links page
 * Organized by category
 * External links with proper attributes
 */
export function LinksPage() {
  return (
    <Section background="neutral-100" padding="lg">
      <Container>
        <h1 className="text-h1 text-primary-500 mb-4 text-center">Links</h1>
        <p className="text-body-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
          Nyttige links til relevante ressourcer for patienter og
          fagfolk.
        </p>
        <div className="space-y-12">
          {linkCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-h2 text-primary-500 mb-6">
                {category.category}
              </h2>
              <Grid cols={{ default: 1, md: 2, lg: 3 }} gap="md">
                {category.links.map((link) => (
                  <Card key={link.url} variant="default">
                    <h3 className="text-h3 text-neutral-900 mb-2">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                      >
                        {link.name}
                      </a>
                    </h3>
                    {link.description && (
                      <p className="text-body-sm text-neutral-600">
                        {link.description}
                      </p>
                    )}
                  </Card>
                ))}
              </Grid>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
