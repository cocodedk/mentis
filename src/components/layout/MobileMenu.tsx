import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { NavigationItem } from '@/types/components'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  items: NavigationItem[]
  currentPath?: string
  onNavigate?: (path: string) => void
}

/**
 * Mobile hamburger menu component with slide-in animation
 * Full-screen overlay with same navigation items as desktop
 */
export function MobileMenu({
  isOpen,
  onClose,
  items,
  currentPath = '/',
}: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  const handleLinkClick = () => {
    onClose()
    setExpandedItems(new Set())
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-h3 font-semibold text-neutral-900">Menu</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="overflow-y-auto h-full pb-20" role="navigation">
          <ul className="py-4">
            {items.map((item) => {
              const isActive = currentPath === item.path
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = expandedItems.has(item.path)

              return (
                <li key={item.path}>
                  {hasChildren ? (
                    <>
                      <button
                        onClick={() => toggleExpanded(item.path)}
                        className={`w-full px-4 py-3 text-left text-body text-neutral-900 hover:bg-neutral-200 focus-visible:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 flex items-center justify-between ${
                          isActive ? 'bg-neutral-200 font-medium' : ''
                        }`}
                        aria-expanded={isExpanded}
                      >
                        {item.label}
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isExpanded && (
                        <ul className="bg-neutral-100">
                          {item.children?.map((child) => (
                            <li key={child.path}>
                              <Link
                                to={child.path}
                                onClick={handleLinkClick}
                                className={`block px-8 py-2 text-body text-neutral-900 hover:bg-neutral-200 focus-visible:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                                  currentPath === child.path
                                    ? 'bg-neutral-200 font-medium'
                                    : ''
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`block px-4 py-3 text-body text-neutral-900 hover:bg-neutral-200 focus-visible:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                        isActive ? 'bg-neutral-200 font-medium' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}
