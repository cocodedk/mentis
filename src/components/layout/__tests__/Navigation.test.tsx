import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Navigation } from '../Navigation'
import { navigationItems } from '@/data/navigation'

describe('Navigation', () => {
  const mockNavigate = vi.fn()

  it('renders navigation items', () => {
    render(
      <Navigation
        items={navigationItems}
        currentPath="/"
        onNavigate={mockNavigate}
      />
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('highlights active path', () => {
    render(
      <Navigation
        items={navigationItems}
        currentPath="/personale"
        onNavigate={mockNavigate}
      />
    )

    // Find a link without children (Personale)
    const activeLink = screen.getByRole('link', { name: /personale/i })
    expect(activeLink).toBeTruthy()
    expect(activeLink.className || '').toContain('text-primary-500')
  })

  it('opens dropdown on click', async () => {
    render(
      <Navigation
        items={navigationItems}
        currentPath="/"
        onNavigate={mockNavigate}
      />
    )

    // Find an item with children
    const parentItem = navigationItems.find((item) => item.children && item.children.length > 0)
    if (parentItem) {
      // Navigation uses buttons for items with children
      const button = screen.getByRole('button', { name: parentItem.label })
      await userEvent.click(button)

      // Dropdown should be visible - check for child link
      const childItem = parentItem.children![0]
      expect(screen.getByRole('menuitem', { name: childItem.label })).toBeInTheDocument()
    }
  })
})
