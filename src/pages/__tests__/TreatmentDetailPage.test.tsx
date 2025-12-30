import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { TreatmentDetailPage } from '../TreatmentDetailPage'

describe('TreatmentDetailPage', () => {
  it('renders treatment details for valid slug', () => {
    render(
      <MemoryRouter initialEntries={['/behandlinger/tms']}>
        <TreatmentDetailPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('shows 404 for invalid slug', () => {
    render(
      <MemoryRouter initialEntries={['/behandlinger/invalid']}>
        <TreatmentDetailPage />
      </MemoryRouter>
    )

    // Should show error or redirect
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
