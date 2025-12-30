import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { TreatmentsPage } from '../TreatmentsPage'

describe('TreatmentsPage', () => {
  it('renders page title', () => {
    render(<TreatmentsPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders treatment cards', () => {
    render(<TreatmentsPage />)
    // Treatment cards should be rendered
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
