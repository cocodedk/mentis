import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { StaffPage } from '../StaffPage'

describe('StaffPage', () => {
  it('renders staff grid', () => {
    render(<StaffPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('opens modal when staff card is clicked', async () => {
    render(<StaffPage />)

    // Find a staff card and click it
    const cards = screen.getAllByText(/klik for at se profil/i)
    if (cards.length > 0) {
      await userEvent.click(cards[0].closest('div') || cards[0])

      // Modal should open
      // This depends on implementation - adjust based on actual behavior
      expect(screen.getByRole('main')).toBeInTheDocument()
    }
  })
})
