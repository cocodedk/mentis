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
        currentPath="/behandlinger"
        onNavigate={mockNavigate}
      />
    )

    const activeLink = screen.getByRole('link', { name: /behandlinger/i })
    expect(activeLink.className).toContain('text-primary-500')
  })

  it('opens dropdown on hover', async () => {
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
      const link = screen.getByRole('link', { name: parentItem.label })
      await userEvent.hover(link)

      // Dropdown should be visible
      expect(screen.getByText(parentItem.children![0].label)).toBeInTheDocument()
    }
  })
})
