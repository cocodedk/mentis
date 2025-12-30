export interface Location {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  phone?: string
}

export const locations: Location[] = [
  {
    id: 'risskov',
    name: 'Risskov',
    address: 'Vejlbjergvej 8A',
    city: 'Risskov',
    postalCode: '8240',
    phone: '81 40 93 33',
  },
  {
    id: 'kolding',
    name: 'Kolding',
    address: 'Olaf Ryes Gade 7T, st. – lokale 5',
    city: 'Kolding',
    postalCode: '6000',
    phone: '81 40 93 33',
  },
  {
    id: 'copenhagen',
    name: 'København',
    address: 'Borgergade 40, st. th.',
    city: 'København K',
    postalCode: '1300',
    phone: '81 40 93 33',
  },
]
