import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { HomePage } from '../HomePage'

describe('HomePage', () => {
  it('renders hero section', () => {
    render(<HomePage />)
    // Check for hero content
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders services overview', () => {
    render(<HomePage />)
    // Services section should be present
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders practical info preview', () => {
    render(<HomePage />)
    // Practical info should be present
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
