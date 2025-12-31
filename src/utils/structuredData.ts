/**
 * Structured data (JSON-LD) schema generators
 * Follows Schema.org standards for better SEO and AI readability
 */

import { getAbsoluteUrl } from './seo'
import type { Treatment } from '@/data/treatments'
import type { StaffMember } from '@/data/staff'
import type { PracticalInfoItem } from '@/data/practicalInfo'
import type { Location } from '@/data/locations'

/**
 * Generate MedicalOrganization schema for homepage
 */
export function generateMedicalOrganizationSchema() {
  const baseUrl = getAbsoluteUrl('/')

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Mentis Neuropsykiatrisk Klinik',
    description: 'Specialiseret neuropsykiatrisk udredning og behandling. Tværfagligt team af psykiatere, psykologer og specialister i Jylland og på Sjælland.',
    url: baseUrl,
    telephone: '+4581409333',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Vejlbjergvej 8A',
        addressLocality: 'Risskov',
        postalCode: '8240',
        addressCountry: 'DK',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Olaf Ryes Gade 7T, st. – lokale 5',
        addressLocality: 'Kolding',
        postalCode: '6000',
        addressCountry: 'DK',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Borgergade 40, st. th.',
        addressLocality: 'København K',
        postalCode: '1300',
        addressCountry: 'DK',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Denmark',
    },
    medicalSpecialty: [
      'Neuropsykiatri',
      'Psykiatri',
      'Psykologi',
      'TMS-behandling',
      'ADHD-udredning',
    ],
    serviceType: [
      'Neuropsykiatrisk udredning',
      'TMS-behandling',
      'Psykiatrisk konsultation',
      'Psykologisk behandling',
      'Mindfulness',
      'Compassion Focused Therapy',
    ],
  }
}

/**
 * Generate MedicalProcedure schema for treatment pages
 */
export function generateMedicalProcedureSchema(treatment: Treatment) {
  const baseUrl = getAbsoluteUrl(`/behandlinger/${treatment.slug}`)

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatment.title,
    description: treatment.whatIsIt,
    url: baseUrl,
    procedureType: treatment.title,
    preparation: treatment.whoIsItFor.join(' '),
    followup: treatment.howItWorks.join(' '),
  }

  // Add cost information if available
  if (treatment.practicalDetails?.price) {
    schema.cost = {
      '@type': 'MonetaryAmount',
      currency: 'DKK',
      value: treatment.practicalDetails.price,
    }
  }

  // Add duration if available
  if (treatment.practicalDetails?.duration) {
    schema.duration = treatment.practicalDetails.duration
  }

  // Add medical code for specific treatments
  if (treatment.id === 'tms') {
    schema.code = {
      '@type': 'MedicalCode',
      codingSystem: 'ICD-10',
      code: 'F32-F33', // Depression codes
    }
  }

  return schema
}

/**
 * Generate Person schema for staff members
 */
export function generatePersonSchema(staff: StaffMember, organizationUrl?: string) {
  const baseUrl = getAbsoluteUrl('/personale')

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: staff.name,
    jobTitle: staff.role,
    description: staff.bio,
    url: baseUrl,
  }

  // Add image if available
  if (staff.photo) {
    schema.image = getAbsoluteUrl(staff.photo)
  }

  // Add worksFor if organization URL provided
  if (organizationUrl) {
    schema.worksFor = {
      '@type': 'MedicalOrganization',
      name: 'Mentis Neuropsykiatrisk Klinik',
      url: organizationUrl,
    }
  }

  // Add knowsAbout (specialisations)
  if (staff.specialisations.length > 0) {
    schema.knowsAbout = staff.specialisations
  }

  // Add speaks (languages)
  if (staff.languages.length > 0) {
    schema.speaks = staff.languages.map((lang) => ({
      '@type': 'Language',
      name: lang,
    }))
  }

  // Add credentials (certifications)
  if (staff.certifications && staff.certifications.length > 0) {
    schema.hasCredential = staff.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Certification',
      name: cert,
    }))
  }

  return schema
}

/**
 * Generate FAQPage schema for practical info pages with accordions
 */
export function generateFAQPageSchema(item: PracticalInfoItem) {
  const baseUrl = getAbsoluteUrl(`/praktisk-information/${item.slug}`)

  if (!item.hasAccordion || !item.accordionItems || item.accordionItems.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: item.accordionItems.map((accordionItem) => ({
      '@type': 'Question',
      name: accordionItem.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: accordionItem.content,
      },
    })),
    url: baseUrl,
  }
}

/**
 * Generate Article schema for informational pages
 */
export function generateArticleSchema(item: PracticalInfoItem) {
  const baseUrl = getAbsoluteUrl(`/praktisk-information/${item.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.content.substring(0, 200), // First 200 chars as description
    articleBody: item.content,
    url: baseUrl,
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Mentis Neuropsykiatrisk Klinik',
      url: getAbsoluteUrl('/'),
    },
    datePublished: '2025-01-01', // Update with actual date if available
    inLanguage: 'da',
  }
}

/**
 * Generate LocalBusiness schema for locations
 */
export function generateLocalBusinessSchema(location: Location) {
  const baseUrl = getAbsoluteUrl('/find-os')

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: `Mentis Neuropsykiatrisk Klinik - ${location.name}`,
    url: baseUrl,
    telephone: location.phone || '+4581409333',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      postalCode: location.postalCode,
      addressCountry: 'DK',
    },
    parentOrganization: {
      '@type': 'MedicalOrganization',
      name: 'Mentis Neuropsykiatrisk Klinik',
      url: getAbsoluteUrl('/'),
    },
  }

  return schema
}

/**
 * Generate BreadcrumbList schema from path
 */
export function generateBreadcrumbSchema(path: string) {
  const baseUrl = getAbsoluteUrl('/')

  // Map route segments to readable labels
  const routeLabels: Record<string, string> = {
    '': 'Forside',
    behandlinger: 'Behandlinger',
    personale: 'Personale',
    priser: 'Priser',
    'praktisk-information': 'Praktisk Information',
    'find-os': 'Find os',
    kontakt: 'Kontakt',
    links: 'Links',
  }

  // Split path and build breadcrumb items
  const segments = path.split('/').filter(Boolean)
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Forside',
      item: baseUrl,
    },
  ]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const label = routeLabels[segment] || segment
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: label,
      item: getAbsoluteUrl(currentPath),
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

/**
 * Generate CollectionPage schema for listing pages
 */
export function generateCollectionPageSchema(
  title: string,
  description: string,
  url: string,
  items?: Array<{ name: string; url: string }>
) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: getAbsoluteUrl(url),
  }

  if (items && items.length > 0) {
    schema.mainEntity = {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: getAbsoluteUrl(item.url),
      })),
    }
  }

  return schema
}

/**
 * Generate Service schema with offers for pricing page
 */
export function generateServiceSchema() {
  const baseUrl = getAbsoluteUrl('/priser')

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Neuropsykiatrisk behandling og udredning',
    description: 'Specialiseret neuropsykiatrisk udredning og behandling',
    provider: {
      '@type': 'MedicalOrganization',
      name: 'Mentis Neuropsykiatrisk Klinik',
      url: getAbsoluteUrl('/'),
    },
    areaServed: {
      '@type': 'Country',
      name: 'Denmark',
    },
    url: baseUrl,
  }
}

/**
 * Generate ContactPage schema
 */
export function generateContactPageSchema() {
  const baseUrl = getAbsoluteUrl('/kontakt')

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Kontakt - Mentis Neuropsykiatrisk Klinik',
    description: 'Kontakt Mentis Neuropsykiatrisk Klinik for at booke en konsultation eller få mere information',
    url: baseUrl,
    mainEntity: {
      '@type': 'MedicalOrganization',
      name: 'Mentis Neuropsykiatrisk Klinik',
      telephone: '+4581409333',
      email: 'info@mentis.dk', // Update if email is available
      url: getAbsoluteUrl('/'),
    },
  }
}

/**
 * Generate WebSite schema with creator attribution
 */
export function generateWebSiteSchema() {
  const baseUrl = getAbsoluteUrl('/')

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mentis Neuropsykiatrisk Klinik',
    url: baseUrl,
    creator: {
      '@type': 'Person',
      name: 'Babak Bandpey',
      affiliation: {
        '@type': 'Organization',
        name: 'cocode',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mentis Neuropsykiatrisk Klinik',
      url: baseUrl,
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Mentis Neuropsykiatrisk Klinik',
    },
    copyrightYear: new Date().getFullYear(),
    description: 'Website designed, developed and implemented by Babak Bandpey at cocode',
  }
}

/**
 * Inject JSON-LD script into document head
 */
export function injectStructuredData(schema: object, id?: string): () => void {
  if (typeof document === 'undefined') {
    return () => {}
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(schema, null, 2)
  const scriptId = id || `structured-data-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  script.id = scriptId
  document.head.appendChild(script)

  // Return cleanup function
  return () => {
    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      existingScript.remove()
    }
  }
}
