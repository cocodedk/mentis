export interface PracticalInfoItem {
  id: string
  slug: string
  title: string
  content: string
  hasAccordion?: boolean
  accordionItems?: {
    id: string
    title: string
    content: string
  }[]
}

export const practicalInfoItems: PracticalInfoItem[] = [
  {
    id: 'konsultation',
    slug: 'konsultation',
    title: 'Konsultation',
    content:
      'Konsultationer foregår efter aftale. Du modtager et brev med tiden og stedet for din konsultation.',
  },
  {
    id: 'telefonisk-kontakt',
    slug: 'telefonisk-kontakt',
    title: 'Telefonisk kontakt',
    content:
      'Telefonnummeret 81 40 93 33 er tilgængeligt mandag, tirsdag, torsdag og fredag kl. 09:00–10:30. Det er ikke muligt at sende SMS til dette nummer.',
  },
  {
    id: 'kontakt-via-e-login',
    slug: 'kontakt-via-e-login',
    title: 'Kontakt via e-login',
    content:
      'Patienter kan anmode om e-login-oplysninger fra forsiden for at sende korte beskeder uden for telefonens åbningstider.',
  },
  {
    id: 'afbud',
    slug: 'afbud',
    title: 'Afbud',
    content:
      'Afbud skal ske senest to arbejdsdage før konsultationen. Sene afbud eller udeblivelse medfører et gebyr på 2.500 kr og 6-sessionsgebyr for TMS-programmer.',
    hasAccordion: true,
    accordionItems: [
      {
        id: 'afbud-afbudsregler',
        title: 'Afbudsregler',
        content:
          'Afbud skal ske senest to arbejdsdage før konsultationen. Ved sene afbud eller udeblivelse opkræves et gebyr på 2.500 kr. For TMS-programmer opkræves et gebyr svarende til 6 sessioner.',
      },
      {
        id: 'afbud-hvordan-afmelder-jeg',
        title: 'Hvordan afmelder jeg?',
        content:
          'Du kan afmelde ved at ringe på telefonnummeret 81 40 93 33 i telefonens åbningstider (mandag, tirsdag, torsdag og fredag kl. 09:00–10:30) eller via e-login.',
      },
    ],
  },
  {
    id: 'tolkebistand',
    slug: 'tolkebistand',
    title: 'Tolkebistand',
    content:
      'Tolke skal arrangeres af den henvisende instans. Kontakt venligst din henvisende læge eller instans for at arrangere tolkebistand.',
  },
  {
    id: 'akut-hjaelp',
    slug: 'akut-hjaelp',
    title: 'Akut hjælp',
    content:
      'Ved akutte psykiatriske problemer kan du kontakte følgende numre:',
    hasAccordion: true,
    accordionItems: [
      {
        id: 'akut-hjaelp-region-midtjylland',
        title: 'Region Midtjylland psykiatrisk rådgivning',
        content: 'Telefon: 78 47 04 70',
      },
      {
        id: 'akut-hjaelp-laegevagten',
        title: 'Lægevagten',
        content: 'Telefon: 70 11 31 31',
      },
      {
        id: 'akut-hjaelp-livslinjen',
        title: 'Livslinjen',
        content: 'Telefon: 70 20 12 01',
      },
    ],
  },
  {
    id: 'cookiepolitik',
    slug: 'cookiepolitik',
    title: 'Cookiepolitik',
    content:
      'Vi bruger cookies på vores hjemmeside for at forbedre brugeroplevelsen og analysere trafikken. Cookies er små tekstfiler, der gemmes på din enhed.',
    hasAccordion: true,
    accordionItems: [
      {
        id: 'cookiepolitik-noedvendige',
        title: 'Nødvendige cookies',
        content:
          'Disse cookies er nødvendige for, at hjemmesiden kan fungere korrekt. De kan ikke deaktiveres.',
      },
      {
        id: 'cookiepolitik-funktionelle',
        title: 'Funktionelle cookies',
        content:
          'Disse cookies gør det muligt for hjemmesiden at huske dine valg og forbedre funktionaliteten.',
      },
      {
        id: 'cookiepolitik-statistiske',
        title: 'Statistiske cookies',
        content:
          'Disse cookies hjælper os med at forstå, hvordan besøgende bruger hjemmesiden ved at indsamle anonymiseret information.',
      },
      {
        id: 'cookiepolitik-marketing',
        title: 'Marketing cookies',
        content:
          'Disse cookies bruges til at vise relevante annoncer baseret på dine interesser.',
      },
    ],
  },
  {
    id: 'privatlivspolitik',
    slug: 'privatlivspolitik',
    title: 'Privatlivspolitik',
    content:
      'Vi behandler personoplysninger i overensstemmelse med gældende databeskyttelseslovgivning. Vi indsamler følgende oplysninger: navn, kontaktoplysninger, CPR-nummer og sundhedshistorik.',
    hasAccordion: true,
    accordionItems: [
      {
        id: 'privatlivspolitik-hvilke-oplysninger',
        title: 'Hvilke oplysninger indsamler vi?',
        content:
          'Vi indsamler navn, kontaktoplysninger, CPR-nummer og sundhedshistorik. Disse oplysninger bruges til diagnose, behandling og juridisk overholdelse.',
      },
      {
        id: 'privatlivspolitik-hvordan-bruger-vi',
        title: 'Hvordan bruger vi oplysningerne?',
        content:
          'Oplysningerne bruges til diagnose, behandling, juridisk overholdelse og kommunikation med patienter.',
      },
      {
        id: 'privatlivspolitik-dine-rettigheder',
        title: 'Dine rettigheder',
        content:
          'Du har ret til at få indsigt i, rette og slette dine personoplysninger. Kontakt os for at udøve dine rettigheder.',
      },
    ],
  },
]

export function getPracticalInfoBySlug(
  slug: string
): PracticalInfoItem | undefined {
  return practicalInfoItems.find((item) => item.slug === slug)
}
