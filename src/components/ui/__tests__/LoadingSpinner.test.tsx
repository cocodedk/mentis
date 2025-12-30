import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { LoadingSpinner } from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders spinner', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })

  it('shows default label', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Indlæser...')
  })

  it('shows custom label', () => {
    render(<LoadingSpinner label="Loading content" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveAttribute('aria-label', 'Loading content')
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = screen.getByRole('status')
    let svg = spinner.querySelector('svg')
    expect(svg?.className).toContain('w-4 h-4')

    rerender(<LoadingSpinner size="lg" />)
    spinner = screen.getByRole('status')
    svg = spinner.querySelector('svg')
    expect(svg?.className).toContain('w-12 h-12')
  })

  it('has screen reader only text', () => {
    render(<LoadingSpinner />)
    const srText = screen.getByText('Indlæser...')
    expect(srText.className).toContain('sr-only')
  })
})
