import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DropdownItem } from '@/types/components'

interface DropdownProps {
  label: string
  items: DropdownItem[]
  onSelect?: (item: DropdownItem) => void
}

/**
 * Dropdown component with keyboard navigation and accessibility
 * Supports arrow keys, Enter, and Escape
 *
 * @example
 * ```tsx
 * <Dropdown
 *   label="Behandlinger"
 *   items={treatmentItems}
 *   onSelect={handleSelect}
 * />
 * ```
 */
export function Dropdown({ label, items, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
          setFocusedIndex(0)
        } else {
          setFocusedIndex((prev) => (prev + 1) % items.length)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setFocusedIndex((prev) => (prev - 1 + items.length) % items.length)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen && focusedIndex >= 0) {
          handleSelect(items[focusedIndex])
        } else {
          setIsOpen(true)
          setFocusedIndex(0)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setFocusedIndex(-1)
        buttonRef.current?.focus()
        break
    }
  }

  const handleSelect = (item: DropdownItem) => {
    onSelect?.(item)
    setIsOpen(false)
    setFocusedIndex(-1)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 text-body text-neutral-900 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 flex items-center"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={`dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {label}
        <svg
          className={`ml-2 w-4 h-4 transition-transform ${
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
      {isOpen && (
        <ul
          id={`dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`}
          role="menu"
          className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50"
        >
          {items.map((item, index) => (
            <li key={item.path} role="none">
              <Link
                to={item.path}
                role="menuitem"
                className={`block px-4 py-2 text-body text-neutral-900 hover:bg-neutral-200 focus-visible:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                  index === focusedIndex ? 'bg-neutral-200' : ''
                }`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
