import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { HomePage } from '../HomePage'

describe('HomePage', () => {
  it('renders hero section', () => {
    render(<HomePage />)
    // Check for hero headline
    expect(
      screen.getByText(/Specialiseret neuropsykiatrisk/i
      )
    ).toBeInTheDocument()
  })

  it('renders services overview', () => {
    render(<HomePage />)
    // Services section should be present - check for treatment heading
    expect(
      screen.getByRole('heading', { name: /behandlinger/i })
    ).toBeInTheDocument()
  })

  it('renders practical info preview', () => {
    render(<HomePage />)
    // Practical info should be present - check for specific heading
    expect(
      screen.getByRole('heading', { name: /praktisk information/i })
    ).toBeInTheDocument()
  })
})
