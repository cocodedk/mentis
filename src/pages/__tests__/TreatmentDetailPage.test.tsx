import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TreatmentDetailPage from '../TreatmentDetailPage'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

function renderWithRouter(initialEntries: string[]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/behandlinger/:slug" element={<TreatmentDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('TreatmentDetailPage', () => {
  it('renders treatment details for valid slug', () => {
    renderWithRouter(['/behandlinger/tms'])

    // Check for treatment title heading
    expect(
      screen.getByRole('heading', { name: /TMS/i, level: 1 })
    ).toBeInTheDocument()
  })

  it('shows 404 for invalid slug', () => {
    renderWithRouter(['/behandlinger/invalid'])

    // Should show 404 page
    expect(screen.getByText(/ikke fundet/i)).toBeInTheDocument()
  })
})
