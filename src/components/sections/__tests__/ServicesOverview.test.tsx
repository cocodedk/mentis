import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { ServicesOverview } from '../ServicesOverview'
import { treatments } from '@/data/treatments'

describe('ServicesOverview', () => {
  it('renders the section heading', () => {
    render(<ServicesOverview />)
    expect(
      screen.getByRole('heading', { name: /behandlinger/i })
    ).toBeInTheDocument()
  })

  it('displays default number of treatments (5)', () => {
    render(<ServicesOverview />)
    const treatmentCards = screen.getAllByRole('heading', { level: 3 })
    // Should show 5 treatments (or fewer if there are less than 5 total)
    expect(treatmentCards.length).toBeLessThanOrEqual(5)
    expect(treatmentCards.length).toBeGreaterThan(0)
  })

  it('displays custom number of treatments when maxVisibleTreatments prop is provided', () => {
    render(<ServicesOverview maxVisibleTreatments={3} />)
    const treatmentCards = screen.getAllByRole('heading', { level: 3 })
    expect(treatmentCards.length).toBe(3)
  })

  it('displays all treatments when maxVisibleTreatments exceeds total', () => {
    const totalTreatments = treatments.length
    render(<ServicesOverview maxVisibleTreatments={totalTreatments + 10} />)
    const treatmentCards = screen.getAllByRole('heading', { level: 3 })
    expect(treatmentCards.length).toBe(totalTreatments)
  })

  it('displays first N treatments in order', () => {
    render(<ServicesOverview maxVisibleTreatments={2} />)
    const treatmentCards = screen.getAllByRole('heading', { level: 3 })
    expect(treatmentCards[0]).toHaveTextContent(treatments[0].title)
    expect(treatmentCards[1]).toHaveTextContent(treatments[1].title)
  })
})
