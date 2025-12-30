export interface Treatment {
  id: string
  title: string
  slug: string
  shortDescription: string
  whatIsIt: string
  whoIsItFor: string[]
  howItWorks: string[]
  practicalDetails: {
    duration?: string
    sessions?: string
    sideEffects?: string
    frequency?: string
    price?: string
  }
}

export const treatments: Treatment[] = [
  {
    id: 'tms',
    title: 'TMS (Transkraniel magnetisk stimulation)',
    slug: 'tms',
    shortDescription:
      'En godkendt behandling mod depression, OCD og nogle angstlidelser. Ikke-invasiv magnetisk stimulation af nerveceller.',
    whatIsIt:
      'TMS er en godkendt behandling mod depression, OCD og nogle angstlidelser. En ikke-invasiv magnetisk spole stimulerer nerveceller i frontallappen. Behandlingen er mere effektiv end antidepressiva for mange patienter, og bivirkninger er minimale (mild ubehag eller hovedpine). Patienter kan genoptage daglige aktiviteter umiddelbart efter behandling.',
    whoIsItFor: [
      'Personer med depression, der ikke har haft tilstrækkelig effekt af medicin',
      'Patienter med OCD',
      'Personer med visse angstlidelser',
      'Patienter, der ønsker en ikke-medicinsk behandling',
    ],
    howItWorks: [
      'Behandlingen gives to gange dagligt i 15 dage',
      'Inkluderer for- og efterkonsultationer',
      'Magnetisk spole stimulerer nerveceller i frontallappen',
      'Patienter sidder komfortabelt under behandlingen',
      'Typisk kræver én 3-ugers kursus',
      'Vedligeholdelsessessioner hver 4-6 måneder',
    ],
    practicalDetails: {
      duration: '15 dage (to behandlinger dagligt)',
      sessions: '30 sessioner inkl. psykiatrisk konsultation',
      sideEffects: 'Minimale - mild ubehag eller hovedpine',
      frequency: 'Vedligeholdelse hver 4-6 måneder',
      price: '35.000 kr for fuldt forløb',
    },
  },
  {
    id: 'udredning',
    title: 'Undersøgelse/udredning',
    slug: 'udredning',
    shortDescription:
      'Specialistiske lægeerklæringer, neuropsykiatriske vurderinger og psykiatriske evalueringer.',
    whatIsIt:
      'Vi tilbyder tre typer evalueringsydelser: (1) Specialistiske lægeerklæringer baseret på psykiatriske undersøgelser, (2) Neuropsykiatriske vurderinger for at afgøre, om adfærdsændringer har en underliggende hjerne-organisk årsag (kræver ofte neuropsykologiske tests og scanninger), og (3) Psykiatriske evalueringer for specifikke eller generelle diagnoser.',
    whoIsItFor: [
      'Personer, der har brug for en specialistisk vurdering',
      'Patienter med komplekse symptomer',
      'Personer, der skal have en lægeerklæring',
      'Patienter med mistanke om neuropsykiatriske tilstande',
    ],
    howItWorks: [
      'Indledende konsultation og anamnese',
      'Klinisk undersøgelse',
      'Neuropsykologiske tests (hvis nødvendigt)',
      'Scanninger (hvis nødvendigt)',
      'Tværfaglig konference',
      'Udarbejdelse af rapport',
    ],
    practicalDetails: {
      duration: 'Varierer efter kompleksitet',
      sessions: 'Efter behov',
      price: 'Fra 10.000 kr',
    },
  },
  {
    id: 'korte-forloeb',
    title: 'Korte forløb',
    slug: 'korte-forloeb',
    shortDescription:
      'Korte diagnostiske og behandlingsforløb. Efter bekræftelse af diagnose tilbydes behandlingsstart og kort opfølgning.',
    whatIsIt:
      'Korte diagnostiske og behandlingsforløb. Efter bekræftelse af en diagnose (fx ADHD) tilbyder klinikken en behandlingsstart og en kort opfølgning, før patienten overføres tilbage til egen læge.',
    whoIsItFor: [
      'Personer, der har brug for en hurtig diagnose',
      'Patienter med ADHD eller lignende tilstande',
      'Personer, der skal have behandling startet',
      'Patienter, der skal overføres til egen læge efter start',
    ],
    howItWorks: [
      'Diagnostisk vurdering',
      'Bekræftelse af diagnose',
      'Behandlingsstart',
      'Kort opfølgning',
      'Overførsel til egen læge',
    ],
    practicalDetails: {
      duration: 'Kort forløb',
      sessions: 'Efter behov',
    },
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    slug: 'mindfulness',
    shortDescription:
      'Mindfulnesstræning til at hjælpe patienter med at blive til stede, reducere grubleri og håndtere stress, angst og depression.',
    whatIsIt:
      'Mindfulness træning hjælper patienter med at blive til stede, reducere grubleri og håndtere stress, angst og depression. Kurset kombinerer meditation og yogaøvelser og anbefales til personer med stress og humørproblemer.',
    whoIsItFor: [
      'Personer med stress',
      'Patienter med angst',
      'Personer med depression',
      'Alle, der ønsker at forbedre deres mentale velvære',
    ],
    howItWorks: [
      'Gruppetræning med meditation',
      'Yogaøvelser',
      'Praktiske teknikker til hverdagen',
      'Opfølgning og support',
    ],
    practicalDetails: {
      duration: 'Kursusforløb',
      sessions: '800 kr pr. session',
    },
  },
  {
    id: 'cft',
    title: 'Compassion Focused Therapy (CFT)',
    slug: 'compassion-focused-therapy',
    shortDescription:
      'Afledt af kognitiv adfærdsterapi, CFT retter sig mod personer med lav selvtillid og dårlig følelsesregulering.',
    whatIsIt:
      'Compassion Focused Therapy (CFT) er afledt af kognitiv adfærdsterapi og retter sig mod personer med lav selvtillid og dårlig følelsesregulering. Det hjælper med at bygge selvmedfølelse og balancere hjernens trussel-, drive- og beroligende systemer. Terapien fremmer selvrefleksion og erstatter selvkritik med velvære og sundere relationer.',
    whoIsItFor: [
      'Personer med lav selvtillid',
      'Patienter med dårlig følelsesregulering',
      'Personer med selvkritik',
      'Patienter, der har brug for at bygge selvmedfølelse',
    ],
    howItWorks: [
      'Individuel terapi',
      'Fokus på selvmedfølelse',
      'Balancering af hjernens systemer',
      'Selvrefleksion og værdiudvikling',
      'Opfølgning og support',
    ],
    practicalDetails: {
      duration: 'Efter behov',
      sessions: '1.200 kr pr. session',
    },
  },
  {
    id: 'kurser',
    title: 'Kurser',
    slug: 'kurser',
    shortDescription:
      'Kurser og supervision i psykiatriske og neuropsykiatriske emner. Klinikken har eget undervisningslokale til ca. 40 deltagere.',
    whatIsIt:
      'Mentis afholder kurser og supervision i psykiatriske og neuropsykiatriske emner. Klinikken har eget undervisningslokale til ca. 40 deltagere.',
    whoIsItFor: [
      'Professionelle i sundhedssektoren',
      'Læger og sygeplejersker',
      'Psykologer og terapeuter',
      'Alle med interesse for psykiatri og neuropsykiatri',
    ],
    howItWorks: [
      'Undervisning i klinikkens lokaler',
      'Gruppesupervision',
      'Faglige foredrag',
      'Praktiske øvelser',
    ],
    practicalDetails: {
      duration: 'Varierer',
      sessions: 'Efter aftale',
    },
  },
]

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug)
}
