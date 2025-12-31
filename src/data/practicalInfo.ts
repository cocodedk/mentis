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
      'Mentis Neuropsykiatrisk Klinik (CVR: 38744429) er dataansvarlig for behandlingen af dine personoplysninger. Vi behandler personoplysninger i overensstemmelse med GDPR (Generel Forordning om Databeskyttelse) og gældende dansk databeskyttelseslovgivning, herunder sundhedsloven. Denne privatlivspolitik beskriver, hvordan vi indsamler, behandler og beskytter dine personoplysninger. Sidst opdateret: januar 2025.',
    hasAccordion: true,
    accordionItems: [
      {
        id: 'privatlivspolitik-dataansvarlig',
        title: 'Dataansvarlig',
        content:
          'Dataansvarlig er Mentis Neuropsykiatrisk Klinik, CVR-nr.: 38744429. Vi har klinikker på følgende adresser: Vejlbjergvej 8A, 8240 Risskov; Olaf Ryes Gade 7T, st. – lokale 5, 6000 Kolding; og Borgergade 40, st. th., 1300 København K. For henvendelser vedrørende databeskyttelse kan du kontakte os på telefon 81 40 93 33 (mandag, tirsdag, torsdag og fredag kl. 09:00–10:30) eller via kontaktformularen på vores hjemmeside.',
      },
      {
        id: 'privatlivspolitik-hvilke-oplysninger',
        title: 'Hvilke personoplysninger indsamler vi?',
        content:
          'Vi indsamler og behandler følgende kategorier af personoplysninger: Grundlæggende personoplysninger: navn, adresse, telefonnummer, e-mailadresse og CPR-nummer. Sundhedsoplysninger: medicinsk historie, diagnoser, behandlingsjournaler, resultater fra udredninger og behandlinger, medicinoplysninger og andre relevante sundhedsoplysninger. Tekniske data: IP-adresser, cookies og lignende teknisk information ved besøg på vores hjemmeside (se vores cookiepolitik for yderligere oplysninger). Kommunikationsdata: beskeder sendt via kontaktformular, e-login eller telefon. Vi behandler kun de personoplysninger, der er nødvendige for at opfylde de formål, som oplysningerne indsamles til.',
      },
      {
        id: 'privatlivspolitik-formaal',
        title: 'Formål med databehandlingen',
        content:
          'Vi behandler dine personoplysninger til følgende formål: Patientbehandling og pleje: for at kunne yde medicinsk behandling, udredning og opfølgning. Medicinsk diagnose og vurdering: for at stille diagnoser og vurdere behandlingsbehov. Juridiske forpligtelser: for at opfylde krav i sundhedsloven og anden gældende lovgivning om journalføring og rapportering. Kommunikation med patienter: for at kunne kontakte dig vedrørende aftaler, behandling og vigtige oplysninger. Kvalitetssikring og forbedring: for at sikre og forbedre kvaliteten af vores behandlingstilbud. Hjemmesidefunktionalitet: for at sikre, at vores hjemmeside fungerer korrekt og for at forbedre brugeroplevelsen.',
      },
      {
        id: 'privatlivspolitik-retsgrundlag',
        title: 'Retsgrundlag for behandlingen',
        content:
          'Vi behandler dine personoplysninger på følgende retsgrundlag: Artikel 6(1)(c) i GDPR: Opfyldelse af en juridisk forpligtelse – vi er forpligtet til at føre journaler og opbevare sundhedsoplysninger i henhold til sundhedsloven. Artikel 6(1)(f) i GDPR: Legitim interesse – for hjemmesidefunktionalitet og tekniske formål. Artikel 9(2)(h) i GDPR: Behandling af særlige kategorier af personoplysninger (sundhedsoplysninger) til formål af forebyggende eller arbejdsmedicinsk medicin, vurdering af arbejdsevnen, medicinsk diagnose, tilbud om sundhedsbehandling eller sundhedspleje eller behandling eller styring af sundhedsydelser. Artikel 9(2)(c) i GDPR: Beskyttelse af registreredes eller en anden fysisk persons vitale interesser.',
      },
      {
        id: 'privatlivspolitik-deling',
        title: 'Hvem deler vi oplysninger med?',
        content:
          'Vi deler kun dine personoplysninger med tredjeparter i følgende tilfælde: Sundhedspersonale inden for klinikken: relevante medarbejdere har adgang til de oplysninger, der er nødvendige for at udføre deres arbejde. Henvisende læger og speciallæger: med dit samtykke eller når det er nødvendigt for din behandling. Offentlige myndigheder: når vi er juridisk forpligtet til at dele oplysninger, f.eks. til Sundhedsstyrelsen eller politiet i særlige tilfælde. Databehandlere: vi bruger tredjeparter til databehandling, herunder YouTube (ved indlejring af videoer på vores hjemmeside) og andre indholdshostingudbydere. Disse virksomheder behandler data på vores vegne og er forpligtet til at beskytte dine oplysninger gennem databehandleraftaler. IT-udbydere: virksomheder, der leverer IT-tjenester, herunder hosting og vedligeholdelse, under databehandleraftaler. Vi sælger aldrig personoplysninger til tredjeparter.',
      },
      {
        id: 'privatlivspolitik-tredjeland',
        title: 'Overførsel til tredjelande',
        content:
          'Nogle af vores databehandlere kan være placeret uden for EU/EØS. Dette gælder især YouTube/Google (USA), når vi indlejrer videoer på vores hjemmeside. Ved overførsel til tredjelande sikrer vi passende garantier gennem Standard Contractual Clauses (SCC) godkendt af EU-Kommissionen eller andre relevante sikkerhedsforanstaltninger i overensstemmelse med GDPR. YouTube/Google har også implementeret passende garantier for databeskyttelse. Du kan læse mere om Googles behandling af personoplysninger i deres privatlivspolitik. Hvis du ønsker yderligere oplysninger om de specifikke garantier, vi har på plads, kan du kontakte os.',
      },
      {
        id: 'privatlivspolitik-opbevaring',
        title: 'Opbevaring af personoplysninger',
        content:
          'Vi opbevarer dine personoplysninger i overensstemmelse med gældende lovgivning: Sundhedsjournaler: ifølge sundhedsloven skal journaler typisk opbevares i mindst 10 år efter sidste kontakt, eller længere for visse tilstande eller i særlige tilfælde. For børn og unge opbevares journaler typisk indtil patienten fylder 23 år. Kontaktformulardata: oplysninger fra kontaktformularen slettes, når henvendelsen er behandlet, medmindre oplysningerne er relevant for din patientjournal. Tekniske data fra hjemmesiden: opbevares i henhold til vores cookiepolitik. Opbevaringsperioderne er fastsat ud fra juridiske krav, medicinske hensyn og nødvendigheden af at kunne yde kontinuerlig behandling.',
      },
      {
        id: 'privatlivspolitik-rettigheder',
        title: 'Dine rettigheder',
        content:
          'Du har følgende rettigheder vedrørende dine personoplysninger: Indsigtsret (artikel 15): du har ret til at få oplyst, hvilke personoplysninger vi behandler om dig, og få en kopi af dem. Ret til berigtigelse (artikel 16): du har ret til at få rettet forkerte eller ufuldstændige oplysninger. Ret til sletning (artikel 17): du har ret til at få slettet dine personoplysninger under visse betingelser. For sundhedsjournaler gælder der dog særlige regler, da vi er forpligtet til at opbevare dem i henhold til lovgivningen. Ret til begrænsning af behandling (artikel 18): du har ret til at få begrænset behandlingen af dine personoplysninger under visse omstændigheder. Ret til dataportabilitet (artikel 20): hvor behandlingen er baseret på samtykke eller kontrakt, har du ret til at modtage dine personoplysninger i et struktureret format. Ret til indsigelse (artikel 21): du har ret til at gøre indsigelse mod behandling baseret på legitim interesse. Ret til at trække samtykke tilbage: hvor behandlingen er baseret på samtykke, kan du til enhver tid trække det tilbage. For at udøve dine rettigheder, kontakt os på telefon 81 40 93 33 eller via kontaktformularen. Vi vil behandle din anmodning inden for en måned.',
      },
      {
        id: 'privatlivspolitik-sikkerhed',
        title: 'Sikkerhed',
        content:
          'Vi har implementeret passende tekniske og organisatoriske foranstaltninger for at beskytte dine personoplysninger mod utilsigtet eller ulovlig behandling, tab, ødelæggelse eller skade: Tekniske foranstaltninger: kryptering af data, adgangskontrol, sikre netværksforbindelser og regelmæssige sikkerhedsopdateringer. Organisatoriske foranstaltninger: tjenestemandstilsagn for alle medarbejdere, begrænset adgang til personoplysninger baseret på "need-to-know"-princippet, og regelmæssig træning i databeskyttelse. Alle medarbejdere er forpligtet til tavshedspligt i henhold til sundhedsloven. Vi gennemfører regelmæssige vurderinger af vores sikkerhedsforanstaltninger for at sikre, at de er opdaterede og effektive.',
      },
      {
        id: 'privatlivspolitik-klage',
        title: 'Klageadgang',
        content:
          'Hvis du mener, at vi behandler dine personoplysninger i strid med GDPR eller anden gældende databeskyttelseslovgivning, har du ret til at indgive en klage til Datatilsynet. Du kan kontakte Datatilsynet på: Adresse: Borgergade 28, 5., 1300 København K. Telefon: 33 19 32 00. Hjemmeside: www.datatilsynet.dk. E-mail: dt@datatilsynet.dk. Vi opfordrer dig dog til først at kontakte os, så vi kan forsøge at løse eventuelle problemer.',
      },
      {
        id: 'privatlivspolitik-aendringer',
        title: 'Ændringer i privatlivspolitikken',
        content:
          'Vi kan opdatere denne privatlivspolitik fra tid til anden for at afspejle ændringer i vores praksis eller i gældende lovgivning. Væsentlige ændringer vil blive kommunikeret til dig via vores hjemmeside eller direkte, hvis det er relevant. Vi opfordrer dig til at gennemse privatlivspolitikken jævnligt for at holde dig opdateret. Sidst opdateret: januar 2025.',
      },
    ],
  },
]

export function getPracticalInfoBySlug(
  slug: string
): PracticalInfoItem | undefined {
  return practicalInfoItems.find((item) => item.slug === slug)
}
