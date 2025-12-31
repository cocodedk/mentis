import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import ContactPage from '../ContactPage'

describe('ContactPage', () => {
  it('renders contact form', () => {
    render(<ContactPage />)
    expect(
      screen.getByRole('heading', { name: /^kontakt$/i, level: 1 })
    ).toBeInTheDocument()
  })

  it('renders form fields', () => {
    render(<ContactPage />)
    // Form should have input fields
    expect(screen.getByLabelText(/navn/i)).toBeInTheDocument()
  })

  it('displays contact information', () => {
    render(<ContactPage />)
    // Contact info should be displayed - check for phone number
    expect(screen.getByText(/81 40 93 33/i)).toBeInTheDocument()
  })
})
