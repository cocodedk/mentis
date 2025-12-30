import { useState } from 'react'
import type { CookiePreferences } from '@/utils/cookies'
import { Button } from '@/components/ui'
import { Modal } from '@/components/ui'

interface CookieSettingsProps {
  isOpen: boolean
  onClose: () => void
  onSave: (preferences: CookiePreferences) => void
  currentPreferences?: CookiePreferences | null
}

/**
 * Cookie settings modal/accordion
 * Toggle for each cookie category
 * Save preferences button
 */
export function CookieSettings({
  isOpen,
  onClose,
  onSave,
  currentPreferences,
}: CookieSettingsProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(
    currentPreferences || {
      necessary: true,
      functional: false,
      statistical: false,
      marketing: false,
    }
  )

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleSave = () => {
    onSave(preferences)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cookie-indstillinger" size="lg">
      <div className="space-y-6">
        <p className="text-body text-neutral-600">
          Vælg hvilke cookies du vil acceptere. Nødvendige cookies kan ikke
          deaktiveres, da de er påkrævet for, at hjemmesiden kan fungere.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg">
            <div>
              <h3 className="text-h3 text-neutral-900 mb-1">
                Nødvendige cookies
              </h3>
              <p className="text-body-sm text-neutral-600">
                Disse cookies er nødvendige for, at hjemmesiden kan fungere
                korrekt.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.necessary}
              disabled
              className="w-5 h-5 text-primary-500"
              aria-label="Nødvendige cookies (påkrævet)"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg">
            <div>
              <h3 className="text-h3 text-neutral-900 mb-1">
                Funktionelle cookies
              </h3>
              <p className="text-body-sm text-neutral-600">
                Disse cookies gør det muligt for hjemmesiden at huske dine valg.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.functional}
              onChange={() => handleToggle('functional')}
              className="w-5 h-5 text-primary-500"
              aria-label="Funktionelle cookies"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg">
            <div>
              <h3 className="text-h3 text-neutral-900 mb-1">
                Statistiske cookies
              </h3>
              <p className="text-body-sm text-neutral-600">
                Disse cookies hjælper os med at forstå, hvordan besøgende bruger
                hjemmesiden.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.statistical}
              onChange={() => handleToggle('statistical')}
              className="w-5 h-5 text-primary-500"
              aria-label="Statistiske cookies"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg">
            <div>
              <h3 className="text-h3 text-neutral-900 mb-1">
                Marketing cookies
              </h3>
              <p className="text-body-sm text-neutral-600">
                Disse cookies bruges til at vise relevante annoncer.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => handleToggle('marketing')}
              className="w-5 h-5 text-primary-500"
              aria-label="Marketing cookies"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="primary" onClick={handleSave} className="flex-1">
            Gem indstillinger
          </Button>
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Annuller
          </Button>
        </div>
      </div>
    </Modal>
  )
}
