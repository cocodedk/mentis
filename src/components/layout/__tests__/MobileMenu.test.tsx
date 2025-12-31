import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { MobileMenu } from '../MobileMenu'
import { navigationItems } from '@/data/navigation'

describe('MobileMenu', () => {
  const mockClose = vi.fn()

  it('does not render when closed', () => {
    render(
      <MobileMenu
        isOpen={false}
        onClose={mockClose}
        items={navigationItems}
      />
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when open', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={mockClose}
        items={navigationItems}
      />
    )

    expect(screen.getByRole('dialog', { name: /mobile navigation menu/i })).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={mockClose}
        items={navigationItems}
      />
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('closes when close button is clicked', async () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={mockClose}
        items={navigationItems}
      />
    )

    const closeButton = screen.getByRole('button', { name: /close menu/i })
    await userEvent.click(closeButton)

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('expands items with children', async () => {
    render(
      <MobileMenu
        isOpen={true}
        onClose={mockClose}
        items={navigationItems}
      />
    )

    const parentItem = navigationItems.find((item) => item.children && item.children.length > 0)
    if (parentItem) {
      expect(parentItem.children).toBeDefined()
      expect(parentItem.children!.length).toBeGreaterThan(0)

      const expandButton = screen.getByRole('button', { name: parentItem.label })
      await userEvent.click(expandButton)

      expect(screen.getByText(parentItem.children![0].label)).toBeInTheDocument()
    }
  })
})
