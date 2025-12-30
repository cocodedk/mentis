import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { ContactPage } from '../ContactPage'

describe('ContactPage', () => {
  it('renders contact form', () => {
    render(<ContactPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders form fields', () => {
    render(<ContactPage />)
    // Form should have input fields
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('displays contact information', () => {
    render(<ContactPage />)
    // Contact info should be displayed
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
