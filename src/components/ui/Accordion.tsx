import { useState, ReactNode } from 'react'

interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

/**
 * Accordion component for collapsible content sections
 * Accessible with ARIA attributes and keyboard navigation
 *
 * @example
 * ```tsx
 * <Accordion title="Afbud" defaultOpen={false}>
 *   <p>Cancellation policy...</p>
 * </Accordion>
 * ```
 */
export function Accordion({
  title,
  children,
  defaultOpen = false,
  onToggle,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const accordionId = `accordion-${title.toLowerCase().replace(/\s+/g, '-')}`
  const contentId = `${accordionId}-content`

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggle?.(newState)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-neutral-200 hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors flex items-center justify-between min-h-[44px]"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={accordionId}
      >
        <span className="text-h3 font-medium text-neutral-900">{title}</span>
        <svg
          className={`w-5 h-5 text-neutral-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
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
      <div
        id={contentId}
        role="region"
        aria-labelledby={accordionId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 bg-white text-body text-neutral-900">
          {children}
        </div>
      </div>
    </div>
  )
}
