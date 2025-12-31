import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('renders footer', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    // Footer should contain contact info
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    // Verify phone number is present
    expect(screen.getByText(/81 40 93 33/)).toBeInTheDocument()
    // Verify address is present (appears in both Kontakt and Klinikker sections)
    expect(screen.getAllByText(/Vejlbjergvej 8A/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/8240 Risskov/).length).toBeGreaterThan(0)
    // Verify opening hours are present
    expect(screen.getByText(/Man–Fre: 09:00–10:30/)).toBeInTheDocument()
  })

  it('renders links', () => {
    render(<Footer />)
    // Verify "Afbud" link is rendered with correct href
    const afbudLink = screen.getByRole('link', { name: 'Afbud' })
    expect(afbudLink).toBeInTheDocument()
    expect(afbudLink).toHaveAttribute('href', '/praktisk-information/afbud')

    // Verify "Privatlivspolitik" link is rendered with correct href
    const privacyLink = screen.getByRole('link', { name: 'Privatlivspolitik' })
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink).toHaveAttribute('href', '/praktisk-information/privatlivspolitik')
  })
})
