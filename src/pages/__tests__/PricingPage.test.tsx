import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import PricingPage from '../PricingPage'

describe('PricingPage', () => {
  it('renders pricing page heading at level 1', () => {
    render(<PricingPage />)
    expect(
      screen.getByRole('heading', { name: /priser/i, level: 1 })
    ).toBeInTheDocument()
  })
})
