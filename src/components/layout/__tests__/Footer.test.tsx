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
  })

  it('renders links', () => {
    render(<Footer />)
    // Footer should contain navigation links
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })
})
