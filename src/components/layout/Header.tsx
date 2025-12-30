import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavigationItem } from '@/types/components'
import { Button } from '@/components/ui'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'

interface HeaderProps {
  currentPath?: string
  navigationItems: NavigationItem[]
  onNavigate?: (path: string) => void
}

/**
 * Sticky header component with logo, navigation, and CTA button
 * Responsive: Desktop nav with dropdowns, mobile hamburger menu
 */
export function Header({
  currentPath = '/',
  navigationItems,
  onNavigate,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
    onNavigate?.(path)
  }

  return (
    <>
      <header
        className="sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-sm"
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => handleNavigate('/')}
                className="text-h2 font-semibold text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Mentis
              </button>
            </div>

            <Navigation
              items={navigationItems}
              currentPath={currentPath}
              onNavigate={handleNavigate}
            />

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="primary"
                onClick={() => handleNavigate('/kontakt')}
              >
                Kontakt
              </Button>
            </div>

            <button
              className="md:hidden p-2 text-neutral-900 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Åbn menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navigationItems}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />
    </>
  )
}
