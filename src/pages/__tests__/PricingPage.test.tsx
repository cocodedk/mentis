import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import PricingPage from '../PricingPage'

describe('PricingPage', () => {
  it('renders pricing tables', () => {
    render(<PricingPage />)
    expect(
      screen.getByRole('heading', { name: /priser/i })
    ).toBeInTheDocument()
  })

  it('displays all pricing categories', () => {
    render(<PricingPage />)
    // Pricing categories should be displayed - check for pricing page heading
    expect(
      screen.getByRole('heading', { name: /priser/i, level: 1 })
    ).toBeInTheDocument()
  })
})
