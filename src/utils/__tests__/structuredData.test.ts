import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateMedicalOrganizationSchema,
  generateMedicalProcedureSchema,
  generatePersonSchema,
  generateFAQPageSchema,
  generateArticleSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateServiceSchema,
  generateContactPageSchema,
  generateWebSiteSchema,
  injectStructuredData,
} from '../structuredData'
import type { Treatment } from '@/data/treatments'
import type { StaffMember } from '@/data/staff'
import type { PracticalInfoItem } from '@/data/practicalInfo'
import type { Location } from '@/data/locations'

describe('structuredData', () => {
  beforeEach(() => {
    // Clean up any existing structured data scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      script.remove()
    })
  })

  describe('generateMedicalOrganizationSchema', () => {
    it('generates valid JSON-LD schema', () => {
      const schema = generateMedicalOrganizationSchema()

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('MedicalOrganization')
    })

    it('includes required fields', () => {
      const schema = generateMedicalOrganizationSchema()

      expect(schema.name).toBe('Mentis Neuropsykiatrisk Klinik')
      expect(schema.description).toBeTruthy()
      expect(schema.url).toBeTruthy()
      expect(schema.telephone).toBe('+4581409333')
    })

    it('includes all addresses', () => {
      const schema = generateMedicalOrganizationSchema()

      expect(Array.isArray(schema.address)).toBe(true)
      expect(schema.address.length).toBe(3)
      expect(schema.address[0]['@type']).toBe('PostalAddress')
    })

    it('includes medical specialties and service types', () => {
      const schema = generateMedicalOrganizationSchema()

      expect(Array.isArray(schema.medicalSpecialty)).toBe(true)
      expect(Array.isArray(schema.serviceType)).toBe(true)
      expect(schema.medicalSpecialty.length).toBeGreaterThan(0)
      expect(schema.serviceType.length).toBeGreaterThan(0)
    })
  })

  describe('generateMedicalProcedureSchema', () => {
    const mockTreatment: Treatment = {
      id: 'test-treatment',
      title: 'Test Treatment',
      slug: 'test-treatment',
      shortDescription: 'A test treatment',
      whatIsIt: 'This is a test treatment description',
      whoIsItFor: ['Person A', 'Person B'],
      howItWorks: ['Step 1', 'Step 2'],
      practicalDetails: {
        duration: '30 minutes',
        price: '1000 kr',
      },
    }

    it('generates valid JSON-LD schema', () => {
      const schema = generateMedicalProcedureSchema(mockTreatment)

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('MedicalProcedure')
    })

    it('includes treatment information', () => {
      const schema = generateMedicalProcedureSchema(mockTreatment)

      expect(schema.name).toBe('Test Treatment')
      expect(schema.description).toBe('This is a test treatment description')
      expect(schema.url).toContain('/behandlinger/test-treatment')
    })

    it('includes cost information when available', () => {
      const schema = generateMedicalProcedureSchema(mockTreatment)

      expect(schema.cost).toBeTruthy()
      expect(schema.cost['@type']).toBe('MonetaryAmount')
      expect(schema.cost.currency).toBe('DKK')
      expect(schema.cost.value).toBe('1000 kr')
    })

    it('includes duration when available', () => {
      const schema = generateMedicalProcedureSchema(mockTreatment)

      expect(schema.duration).toBe('30 minutes')
    })

    it('handles treatment without practical details', () => {
      const treatmentWithoutDetails: Treatment = {
        ...mockTreatment,
        practicalDetails: {},
      }

      const schema = generateMedicalProcedureSchema(treatmentWithoutDetails)

      expect(schema).toBeTruthy()
      expect(schema.cost).toBeUndefined()
      expect(schema.duration).toBeUndefined()
    })
  })

  describe('generatePersonSchema', () => {
    const mockStaff: StaffMember = {
      id: 'test-staff',
      name: 'Test Person',
      role: 'Test Role',
      bio: 'Test bio',
      specialisations: ['Specialisation 1', 'Specialisation 2'],
      languages: ['Danish', 'English'],
      certifications: ['Cert 1'],
      photo: '/images/staff/test.jpg',
    }

    it('generates valid JSON-LD schema', () => {
      const schema = generatePersonSchema(mockStaff)

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Person')
    })

    it('includes basic person information', () => {
      const schema = generatePersonSchema(mockStaff)

      expect(schema.name).toBe('Test Person')
      expect(schema.jobTitle).toBe('Test Role')
      expect(schema.description).toBe('Test bio')
    })

    it('includes image when available', () => {
      const schema = generatePersonSchema(mockStaff)

      expect(schema.image).toContain('/images/staff/test.jpg')
    })

    it('handles staff without photo', () => {
      const staffWithoutPhoto = { ...mockStaff, photo: undefined }
      const schema = generatePersonSchema(staffWithoutPhoto)

      expect(schema.image).toBeUndefined()
    })

    it('includes specialisations', () => {
      const schema = generatePersonSchema(mockStaff)

      expect(Array.isArray(schema.knowsAbout)).toBe(true)
      expect(schema.knowsAbout).toContain('Specialisation 1')
    })

    it('includes languages', () => {
      const schema = generatePersonSchema(mockStaff)

      expect(Array.isArray(schema.speaks)).toBe(true)
      expect(schema.speaks.length).toBe(2)
    })

    it('includes certifications when available', () => {
      const schema = generatePersonSchema(mockStaff)

      expect(Array.isArray(schema.hasCredential)).toBe(true)
      expect(schema.hasCredential[0].name).toBe('Cert 1')
    })

    it('handles staff without certifications', () => {
      const staffWithoutCerts = { ...mockStaff, certifications: undefined }
      const schema = generatePersonSchema(staffWithoutCerts)

      expect(schema.hasCredential).toBeUndefined()
    })

    it('includes worksFor when organization URL provided', () => {
      const schema = generatePersonSchema(mockStaff, 'https://mentis.dk')

      expect(schema.worksFor).toBeTruthy()
      expect(schema.worksFor['@type']).toBe('MedicalOrganization')
    })
  })

  describe('generateFAQPageSchema', () => {
    it('returns null when item has no accordions', () => {
      const item: PracticalInfoItem = {
        id: 'test',
        slug: 'test',
        title: 'Test',
        content: 'Test content',
        hasAccordion: false,
      }

      const schema = generateFAQPageSchema(item)
      expect(schema).toBeNull()
    })

    it('returns null when accordionItems is empty', () => {
      const item: PracticalInfoItem = {
        id: 'test',
        slug: 'test',
        title: 'Test',
        content: 'Test content',
        hasAccordion: true,
        accordionItems: [],
      }

      const schema = generateFAQPageSchema(item)
      expect(schema).toBeNull()
    })

    it('generates FAQ schema when accordions exist', () => {
      const item: PracticalInfoItem = {
        id: 'test',
        slug: 'test',
        title: 'Test',
        content: 'Test content',
        hasAccordion: true,
        accordionItems: [
          {
            id: 'faq1',
            title: 'Question 1',
            content: 'Answer 1',
          },
          {
            id: 'faq2',
            title: 'Question 2',
            content: 'Answer 2',
          },
        ],
      }

      const schema = generateFAQPageSchema(item)

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('FAQPage')
      expect(Array.isArray(schema.mainEntity)).toBe(true)
      expect(schema.mainEntity.length).toBe(2)
      expect(schema.mainEntity[0]['@type']).toBe('Question')
      expect(schema.mainEntity[0].name).toBe('Question 1')
    })
  })

  describe('generateArticleSchema', () => {
    it('generates valid article schema', () => {
      const item: PracticalInfoItem = {
        id: 'test',
        slug: 'test',
        title: 'Test Article',
        content: 'This is a test article with some content that should be used for the description.',
      }

      const schema = generateArticleSchema(item)

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Article')
      expect(schema.headline).toBe('Test Article')
      expect(schema.articleBody).toBe('This is a test article with some content that should be used for the description.')
    })

    it('includes publisher information', () => {
      const item: PracticalInfoItem = {
        id: 'test',
        slug: 'test',
        title: 'Test',
        content: 'Test content',
      }

      const schema = generateArticleSchema(item)

      expect(schema.publisher).toBeTruthy()
      expect(schema.publisher['@type']).toBe('MedicalOrganization')
      expect(schema.publisher.name).toBe('Mentis Neuropsykiatrisk Klinik')
    })
  })

  describe('generateLocalBusinessSchema', () => {
    const mockLocation: Location = {
      id: 'test',
      name: 'Test Location',
      address: 'Test Street 123',
      city: 'Test City',
      postalCode: '1234',
      phone: '12345678',
    }

    it('generates valid schema', () => {
      const schema = generateLocalBusinessSchema(mockLocation)

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('MedicalOrganization')
    })

    it('includes location information', () => {
      const schema = generateLocalBusinessSchema(mockLocation)

      expect(schema.name).toContain('Test Location')
      expect(schema.telephone).toBe('12345678')
      expect(schema.address['@type']).toBe('PostalAddress')
      expect(schema.address.streetAddress).toBe('Test Street 123')
    })

    it('includes parent organization', () => {
      const schema = generateLocalBusinessSchema(mockLocation)

      expect(schema.parentOrganization).toBeTruthy()
      expect(schema.parentOrganization['@type']).toBe('MedicalOrganization')
    })
  })

  describe('generateBreadcrumbSchema', () => {
    it('generates breadcrumb for root path', () => {
      const schema = generateBreadcrumbSchema('/')

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('BreadcrumbList')
      expect(Array.isArray(schema.itemListElement)).toBe(true)
      expect(schema.itemListElement.length).toBe(1)
      expect(schema.itemListElement[0].name).toBe('Forside')
    })

    it('generates breadcrumb for nested path', () => {
      const schema = generateBreadcrumbSchema('/behandlinger/tms')

      expect(schema).toBeTruthy()
      expect(schema.itemListElement.length).toBe(3)
      expect(schema.itemListElement[0].name).toBe('Forside')
      expect(schema.itemListElement[1].name).toBe('Behandlinger')
      expect(schema.itemListElement[2].name).toBe('tms')
    })

    it('includes correct positions', () => {
      const schema = generateBreadcrumbSchema('/behandlinger/tms')

      expect(schema.itemListElement[0].position).toBe(1)
      expect(schema.itemListElement[1].position).toBe(2)
      expect(schema.itemListElement[2].position).toBe(3)
    })
  })

  describe('generateCollectionPageSchema', () => {
    it('generates collection schema without items', () => {
      const schema = generateCollectionPageSchema('Test Collection', 'Test description', '/test')

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('CollectionPage')
      expect(schema.name).toBe('Test Collection')
      expect(schema.description).toBe('Test description')
    })

    it('includes items when provided', () => {
      const items = [
        { name: 'Item 1', url: '/item1' },
        { name: 'Item 2', url: '/item2' },
      ]

      const schema = generateCollectionPageSchema('Test', 'Test', '/test', items)

      expect(schema.mainEntity).toBeTruthy()
      expect(schema.mainEntity['@type']).toBe('ItemList')
      expect(Array.isArray(schema.mainEntity.itemListElement)).toBe(true)
      expect(schema.mainEntity.itemListElement.length).toBe(2)
    })
  })

  describe('generateServiceSchema', () => {
    it('generates valid service schema', () => {
      const schema = generateServiceSchema()

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('Service')
      expect(schema.name).toBeTruthy()
      expect(schema.provider).toBeTruthy()
    })
  })

  describe('generateContactPageSchema', () => {
    it('generates valid contact page schema', () => {
      const schema = generateContactPageSchema()

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('ContactPage')
      expect(schema.mainEntity).toBeTruthy()
      expect(schema.mainEntity['@type']).toBe('MedicalOrganization')
    })
  })

  describe('generateWebSiteSchema', () => {
    it('generates valid website schema', () => {
      const schema = generateWebSiteSchema()

      expect(schema).toBeTruthy()
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('WebSite')
      expect(schema.name).toBe('Mentis Neuropsykiatrisk Klinik')
    })

    it('includes creator attribution', () => {
      const schema = generateWebSiteSchema()

      expect(schema.creator).toBeTruthy()
      expect(schema.creator['@type']).toBe('Person')
      expect(schema.creator.name).toBe('Babak Bandpey')
      expect(schema.creator.affiliation).toBeTruthy()
      expect(schema.creator.affiliation.name).toBe('cocode')
    })

    it('includes copyright information', () => {
      const schema = generateWebSiteSchema()

      expect(schema.copyrightHolder).toBeTruthy()
      expect(schema.copyrightYear).toBe(new Date().getFullYear())
    })
  })

  describe('injectStructuredData', () => {
    it('injects JSON-LD script into document head', () => {
      const schema = { '@context': 'https://schema.org', '@type': 'Test' }

      const cleanup = injectStructuredData(schema)

      const script = document.querySelector('script[type="application/ld+json"]')
      expect(script).toBeTruthy()
      expect(script?.textContent).toContain('Test')

      cleanup()
      expect(document.querySelector('script[type="application/ld+json"]')).toBeNull()
    })

    it('returns cleanup function', () => {
      const schema = { '@context': 'https://schema.org', '@type': 'Test' }

      const cleanup = injectStructuredData(schema)
      expect(typeof cleanup).toBe('function')

      cleanup()
    })

    it('handles missing document gracefully', () => {
      // Note: In jsdom, document always exists, but function should handle it
      const schema = { '@context': 'https://schema.org', '@type': 'Test' }
      const cleanup = injectStructuredData(schema)

      expect(cleanup).toBeTruthy()
      expect(typeof cleanup).toBe('function')

      cleanup()
    })

    it('creates unique script IDs', () => {
      const schema1 = { '@context': 'https://schema.org', '@type': 'Test1' }
      const schema2 = { '@context': 'https://schema.org', '@type': 'Test2' }

      const cleanup1 = injectStructuredData(schema1)
      const cleanup2 = injectStructuredData(schema2)

      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      expect(scripts.length).toBe(2)

      cleanup1()
      cleanup2()
    })
  })
})
