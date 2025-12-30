import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { SkipLink } from '../SkipLink'

describe('SkipLink', () => {
  it('renders skip link', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link', { name: /spring til hovedindhold/i })
    expect(link).toBeInTheDocument()
  })

  it('links to main content', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('is hidden by default', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link')
    expect(link.className).toContain('sr-only')
  })

  it('becomes visible on focus', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link')
    link.focus()

    // Check that focus-visible styles would make it visible
    expect(link.className).toContain('focus:not-sr-only')
  })
})
