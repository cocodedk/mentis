export interface StaffMember {
  id: string
  name: string
  role: string
  photo?: string
  bio: string
  specialisations: string[]
  languages: string[]
  certifications?: string[]
}

export const staffMembers: StaffMember[] = [
  {
    id: 'mahmoud-ashkanian',
    name: 'Mahmoud Ashkanian',
    role: 'Klinikejer og direktør',
    photo: '/images/staff/mahmoud-ashkanian.jpg',
    bio: 'Psykiater med ph.d. og speciale i neuropsykiatri. Har arbejdet som overlæge på Aarhus Universitetshospitals Neuropsykiatriske Enhed, hvor han har foretaget specialiserede vurderinger, TMS-behandlinger og produceret talrige lægeerklæringer.',
    specialisations: ['Neuropsykiatri', 'TMS-behandling', 'Lægeerklæringer'],
    languages: ['Dansk', 'Engelsk'],
    certifications: ['Ph.d. i neuropsykiatri'],
  },
  {
    id: 'mikkel-rune-vossen-rasmussen',
    name: 'Mikkel Rune Vossen Rasmussen',
    role: 'Psykiater',
    photo: '/images/staff/mikkel-rune-vossen-rasmussen.jpg',
    bio: 'Psykiater med erfaring fra almen praksis i Norge og hospitalsarbejde i ADHD-klinikker, akutpsykiatri og liaisonpsykiatri. Har været overlæge på psykiatrisk afdeling i Vejle og er næstformand for Dansk Psykiatrisk Selskab.',
    specialisations: ['ADHD', 'Akutpsykiatri', 'Liaisonpsykiatri'],
    languages: ['Dansk', 'Engelsk', 'Norsk'],
    certifications: ['Overlæge'],
  },
  {
    id: 'phuong-le-resinia',
    name: 'Phuong Le Resinia',
    role: 'Psykiater',
    photo: '/images/staff/phuong-le-resinia.png',
    bio: 'Psykiater og certificeret kognitiv adfærdsterapi supervisor med mange års klinisk erfaring fra både hospital og ambulatorium.',
    specialisations: ['Kognitiv adfærdsterapi', 'Supervision'],
    languages: ['Dansk', 'Engelsk'],
    certifications: ['Certificeret CBT supervisor'],
  },
  {
    id: 'bo-soendergaard-jensen',
    name: 'Bo Søndergaard Jensen',
    role: 'Psykolog',
    photo: '/images/staff/bo-soendergaard-jensen.jpg',
    bio: 'Psykolog med kandidatgrad fra Aarhus Universitet, specialist og supervisor i psykoterapi for voksne og 15 års erfaring fra både privat og psykiatrisk praksis.',
    specialisations: ['Psykoterapi', 'Supervision'],
    languages: ['Dansk', 'Engelsk'],
    certifications: ['Specialist i psykoterapi'],
  },
  {
    id: 'halil-oeztoprak',
    name: 'Halil Öztoprak',
    role: 'Psykolog',
    photo: '/images/staff/halil-oeztoprak.jpg',
    bio: 'Autoriseret psykolog (Aarhus Universitet 2011) flydende i dansk, tyrkisk og engelsk. Arbejder med kognitiv adfærdsterapi og mindfulness og studerer som specialist i børne- og ungdomspsykiatri.',
    specialisations: ['Kognitiv adfærdsterapi', 'Mindfulness', 'Børne- og ungdomspsykiatri'],
    languages: ['Dansk', 'Tyrkisk', 'Engelsk'],
  },
  {
    id: 'oezlem-mihladiz-ashkanian',
    name: 'Özlem Mihladiz Ashkanian',
    role: 'Social- og sundhedsassistent',
    photo: '/images/staff/oezlem-mihladiz-ashkanian.jpg',
    bio: 'Uddannet social- og sundhedsassistent med psykiatrisk erfaring. Certificeret TMS-praktiker, NADA øreakupunktur terapeut og registreret alternativ behandler. Yder psykouddannelse og kropsterapi inkl. zoned refleksologi og lymfedrænage.',
    specialisations: ['TMS-behandling', 'NADA øreakupunktur', 'Kropsterapi'],
    languages: ['Dansk', 'Tyrkisk', 'Engelsk'],
    certifications: ['Certificeret TMS-praktiker', 'NADA terapeut'],
  },
  {
    id: 'tanja-krogh-brandt',
    name: 'Tanja Krogh Brandt',
    role: 'Ergoterapeut',
    bio: 'Ergoterapeut med 20 års erfaring, uddannet MBSR (Mindfulness-Based Stress Reduction) og Mindful Self-Compassion lærer og kvalificeret til at lave sensoriske profiler.',
    specialisations: ['Mindfulness', 'MBSR', 'Sensoriske profiler'],
    languages: ['Dansk', 'Engelsk'],
    certifications: ['MBSR lærer', 'Mindful Self-Compassion lærer'],
  },
  {
    id: 'mohammed-soleimani',
    name: 'Mohammed Soleimani',
    role: 'Sygeplejerske',
    bio: 'Autoriseret sygeplejerske uddannet på Aarhus Sygeplejeskole (2007). NADA terapeut og certificeret TMS-praktiker. Erfaring med behandling af unipolar, bipolar, ADHD og psykosepatienter og arbejder som ambulatorisk sygeplejerske på Aarhus Universitetshospital.',
    specialisations: ['TMS-behandling', 'NADA øreakupunktur', 'Ambulatorisk sygepleje'],
    languages: ['Dansk', 'Engelsk'],
    certifications: ['Certificeret TMS-praktiker', 'NADA terapeut'],
  },
  {
    id: 'henriette-mark',
    name: 'Henriette Mark',
    role: 'Medicinsk sekretær',
    bio: 'Medicinsk sekretær, der har arbejdet 10 år på Aarhus Psykiatrisk Hospital og har været tilknyttet klinikken siden 2018.',
    specialisations: ['Administration', 'Patientkoordinering'],
    languages: ['Dansk', 'Engelsk'],
  },
]

export function getStaffMemberById(id: string): StaffMember | undefined {
  return staffMembers.find((s) => s.id === id)
}
