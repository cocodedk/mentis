import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import TreatmentsPage from '../TreatmentsPage'

describe('TreatmentsPage', () => {
  it('renders page title', () => {
    render(<TreatmentsPage />)
    expect(
      screen.getByRole('heading', { name: /behandlinger/i })
    ).toBeInTheDocument()
  })

  it('renders treatment cards', () => {
    render(<TreatmentsPage />)
    // Treatment cards should be rendered - check for treatment titles
    expect(screen.getByText(/TMS/i)).toBeInTheDocument()
  })
})
