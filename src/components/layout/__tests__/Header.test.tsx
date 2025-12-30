import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Header } from '../Header'
import { navigationItems } from '@/data/navigation'

describe('Header', () => {
  const mockNavigate = vi.fn()

  it('renders logo', () => {
    render(
      <Header
        currentPath="/"
        navigationItems={navigationItems}
        onNavigate={mockNavigate}
      />
    )
    // Logo text should be present (check for clinic name or logo)
    expect(screen.getByText(/mentis/i)).toBeInTheDocument()
  })

  it('renders navigation', () => {
    render(
      <Header
        currentPath="/"
        navigationItems={navigationItems}
        onNavigate={mockNavigate}
      />
    )
    // Check for navigation items
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('shows mobile menu toggle on small screens', () => {
    render(
      <Header
        currentPath="/"
        navigationItems={navigationItems}
        onNavigate={mockNavigate}
      />
    )

    const menuButton = screen.getByRole('button', { name: /åbn menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('opens mobile menu when toggle is clicked', async () => {
    render(
      <Header
        currentPath="/"
        navigationItems={navigationItems}
        onNavigate={mockNavigate}
      />
    )

    const menuButton = screen.getByRole('button', { name: /åbn menu/i })
    await userEvent.click(menuButton)

    // Mobile menu should be visible
    expect(screen.getByRole('dialog', { name: /mobile navigation menu/i })).toBeInTheDocument()
  })

  it('shows CTA button', () => {
    render(
      <Header
        currentPath="/"
        navigationItems={navigationItems}
        onNavigate={mockNavigate}
      />
    )

    expect(screen.getByRole('button', { name: /kontakt/i })).toBeInTheDocument()
  })

  it('calls onNavigate when CTA is clicked', async () => {
    render(
      <Header
        currentPath="/"
        navigationItems={navigationItems}
        onNavigate={mockNavigate}
      />
    )

    const ctaButton = screen.getByRole('button', { name: /kontakt/i })
    await userEvent.click(ctaButton)

    expect(mockNavigate).toHaveBeenCalledWith('/kontakt')
  })
})
