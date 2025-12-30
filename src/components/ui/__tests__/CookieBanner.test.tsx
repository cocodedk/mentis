import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { CookieBanner } from '../CookieBanner'
import * as cookies from '@/utils/cookies'

vi.mock('@/utils/cookies', () => ({
  getCookieConsent: vi.fn(),
  hasCookieConsent: vi.fn(),
}))

describe('CookieBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(cookies.hasCookieConsent).mockReturnValue(false)
    vi.mocked(cookies.getCookieConsent).mockReturnValue(null)
  })

  it('renders when no consent is given', () => {
    render(<CookieBanner />)
    expect(screen.getByText(/vi bruger cookies/i)).toBeInTheDocument()
  })

  it('does not render when consent is given', () => {
    vi.mocked(cookies.hasCookieConsent).mockReturnValue(true)
    render(<CookieBanner />)
    expect(screen.queryByText(/vi bruger cookies/i)).not.toBeInTheDocument()
  })

  it('shows accept all button', () => {
    render(<CookieBanner />)
    expect(screen.getByRole('button', { name: /accepter alle/i })).toBeInTheDocument()
  })

  it('shows reject all button', () => {
    render(<CookieBanner />)
    expect(screen.getByRole('button', { name: /afvis alle/i })).toBeInTheDocument()
  })

  it('shows customize button', () => {
    render(<CookieBanner />)
    expect(screen.getByRole('button', { name: /tilpas/i })).toBeInTheDocument()
  })

  it('opens settings modal when customize is clicked', async () => {
    render(<CookieBanner />)

    const customizeButton = screen.getByRole('button', { name: /tilpas/i })
    await userEvent.click(customizeButton)

    expect(screen.getByText(/cookie-indstillinger/i)).toBeInTheDocument()
  })

  it('has link to cookie policy', () => {
    render(<CookieBanner />)
    const link = screen.getByRole('link', { name: /læs mere/i })
    expect(link).toHaveAttribute('href', '/praktisk-information/cookiepolitik')
  })
})
