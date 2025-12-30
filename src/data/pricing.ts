export interface PricingItem {
  name: string
  price: string
  description?: string
}

export interface PricingCategory {
  category: string
  items: PricingItem[]
}

export const pricingData: PricingCategory[] = [
  {
    category: 'Behandlinger',
    items: [
      {
        name: 'TMS enkeltbehandling',
        price: '1.000 kr',
      },
      {
        name: 'TMS fuldt forløb (30 sessioner inkl. psykiatrisk konsultation)',
        price: '35.000 kr',
      },
      {
        name: 'Compassion Focused Therapy session',
        price: '1.200 kr',
      },
      {
        name: 'Mindfulness session',
        price: '800 kr',
      },
    ],
  },
  {
    category: 'Udredning',
    items: [
      {
        name: 'Psykiatrisk specialistlægeerklæring (ekskl. moms)',
        price: '13.200 kr',
      },
      {
        name: 'Neuropsykologisk vurdering',
        price: '17.000 kr',
      },
      {
        name: 'Neuropsykiatrisk vurdering med tværfaglig konference og rapport',
        price: '30.000 kr',
      },
      {
        name: 'Udvidet neuropsykiatrisk vurdering med MR-scanning',
        price: 'Efter aftale',
      },
      {
        name: 'Psykologisk vurdering',
        price: '10.000 kr',
      },
      {
        name: 'Psykiatrisk vurdering for én diagnose',
        price: '15.000 kr',
      },
      {
        name: 'Psykiatrisk vurdering for flere diagnoser',
        price: 'Efter aftale',
      },
    ],
  },
  {
    category: 'Konsultationer',
    items: [
      {
        name: 'Psykiater konsultation',
        price: '2.500 kr',
      },
      {
        name: 'Psykolog konsultation',
        price: '1.200 kr',
      },
    ],
  },
  {
    category: 'Kurser',
    items: [
      {
        name: 'Undervisning/kurser/supervision',
        price: 'Efter aftale',
      },
    ],
  },
]
