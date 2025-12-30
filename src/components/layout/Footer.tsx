/**
 * Footer component with 4-column layout
 * Responsive: stacks on mobile
 * Dark background with light text
 */
export function Footer() {
  return (
    <footer
      className="bg-neutral-900 text-neutral-100"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-h3 font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-body text-neutral-300">
              <li>Telefon: 81 40 93 33</li>
              <li>
                Man–Fre: 09:00–10:30
              </li>
              <li>
                Vejlbjergvej 8A<br />
                8240 Risskov
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-h3 font-semibold mb-4">Klinikker</h3>
            <ul className="space-y-2 text-body text-neutral-300">
              <li>
                <strong>Risskov</strong>
                <br />
                Vejlbjergvej 8A, 8240 Risskov
              </li>
              <li>
                <strong>Kolding</strong>
                <br />
                Olaf Ryes Gade 7T, st. – lokale 5, 6000 Kolding
              </li>
              <li>
                <strong>København</strong>
                <br />
                Borgergade 40, st. th., 1300 København K
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-h3 font-semibold mb-4">Praktisk info</h3>
            <ul className="space-y-2 text-body text-neutral-300">
              <li>
                <a
                  href="/praktisk-information/afbud"
                  className="hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors"
                >
                  Afbud
                </a>
              </li>
              <li>
                <a
                  href="/praktisk-information/tolkebistand"
                  className="hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors"
                >
                  Tolkebistand
                </a>
              </li>
              <li>
                <a
                  href="/praktisk-information/akut-hjaelp"
                  className="hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors"
                >
                  Akut hjælp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-h3 font-semibold mb-4">Juridisk</h3>
            <ul className="space-y-2 text-body text-neutral-300">
              <li>
                <a
                  href="/praktisk-information/privatlivspolitik"
                  className="hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors"
                >
                  Privatlivspolitik
                </a>
              </li>
              <li>
                <a
                  href="/praktisk-information/cookiepolitik"
                  className="hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors"
                >
                  Cookiepolitik
                </a>
              </li>
              <li className="pt-4 text-body-sm text-neutral-400">
                CVR: 38744429
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-700 text-center text-body-sm text-neutral-400">
          <p>© {new Date().getFullYear()} Mentis Neuropsykiatrisk Klinik</p>
        </div>
      </div>
    </footer>
  )
}
