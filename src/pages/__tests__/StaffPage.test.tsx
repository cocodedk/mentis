import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import StaffPage from '../StaffPage'

describe('StaffPage', () => {
  it('renders staff grid', () => {
    render(<StaffPage />)
    expect(
      screen.getByRole('heading', { name: /personale/i })
    ).toBeInTheDocument()
  })

  it('opens modal when staff card is clicked', async () => {
    render(<StaffPage />)

    // Find a staff card button and click it
    const staffCards = screen.getAllByRole('button', {
      name: /klik for at se profil/i,
    })
    expect(staffCards.length).toBeGreaterThan(0)

    await userEvent.click(staffCards[0])

    // Modal should open - check for dialog
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
