import { NavigationItem } from '@/types/components'

export const navigationItems: NavigationItem[] = [
  {
    label: 'Forside',
    path: '/',
  },
  {
    label: 'Behandlinger',
    path: '/behandlinger',
    children: [
      {
        label: 'TMS',
        path: '/behandlinger/tms',
      },
      {
        label: 'Udredning',
        path: '/behandlinger/udredning',
      },
      {
        label: 'Korte forløb',
        path: '/behandlinger/korte-forloeb',
      },
      {
        label: 'Mindfulness',
        path: '/behandlinger/mindfulness',
      },
      {
        label: 'Compassion Focused Therapy',
        path: '/behandlinger/compassion-focused-therapy',
      },
      {
        label: 'Kurser',
        path: '/behandlinger/kurser',
      },
    ],
  },
  {
    label: 'Praktisk information',
    path: '/praktisk-information',
    children: [
      {
        label: 'Konsultation',
        path: '/praktisk-information/konsultation',
      },
      {
        label: 'Telefonisk kontakt',
        path: '/praktisk-information/telefonisk-kontakt',
      },
      {
        label: 'Kontakt via e-login',
        path: '/praktisk-information/kontakt-via-e-login',
      },
      {
        label: 'Afbud',
        path: '/praktisk-information/afbud',
      },
      {
        label: 'Tolkebistand',
        path: '/praktisk-information/tolkebistand',
      },
      {
        label: 'Akut hjælp',
        path: '/praktisk-information/akut-hjaelp',
      },
      {
        label: 'Cookiepolitik',
        path: '/praktisk-information/cookiepolitik',
      },
      {
        label: 'Privatlivspolitik',
        path: '/praktisk-information/privatlivspolitik',
      },
    ],
  },
  {
    label: 'Personale',
    path: '/personale',
  },
  {
    label: 'Priser',
    path: '/priser',
  },
  {
    label: 'Find os',
    path: '/find-os',
  },
]
