import { Link } from 'react-router-dom'
import type { NavigationItem } from '@/types/components'
import { Dropdown } from './Dropdown'

interface NavigationProps {
  items: NavigationItem[]
  currentPath?: string
  onNavigate?: (path: string) => void
}

/**
 * Desktop navigation component with dropdown support
 * Handles active states and keyboard navigation
 */
export function Navigation({
  items,
  currentPath = '/',
  onNavigate,
}: NavigationProps) {
  const handleSelect = (item: NavigationItem) => {
    onNavigate?.(item.path)
  }

  return (
    <nav className="hidden md:flex items-center space-x-8" role="navigation">
      {items.map((item) => {
        const isActive = currentPath === item.path

        if (item.children && item.children.length > 0) {
          return (
            <Dropdown
              key={item.path}
              label={item.label}
              items={item.children.map((child) => ({
                label: child.label,
                path: child.path,
              }))}
              onSelect={(selectedItem) => {
                handleSelect(selectedItem as NavigationItem)
              }}
            />
          )
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 text-body text-neutral-900 hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors ${
              isActive
                ? 'text-primary-500 font-medium border-b-2 border-primary-500'
                : ''
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
