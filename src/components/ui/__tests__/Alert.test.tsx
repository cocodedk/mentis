import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Alert } from '../Alert'

describe('Alert', () => {
  it('renders message', () => {
    render(<Alert variant="info">Test message</Alert>)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('applies info variant styles', () => {
    render(<Alert variant="info">Info message</Alert>)
    const alert = screen.getByRole('status')
    expect(alert).toBeInTheDocument()
    expect(alert.className).toContain('bg-neutral-200')
  })

  it('applies warning variant styles', () => {
    render(<Alert variant="warning">Warning message</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert.className).toContain('bg-yellow-50')
  })

  it('shows dismiss button when onClose is provided', () => {
    const handleDismiss = vi.fn()
    render(<Alert variant="info" onClose={handleDismiss}>Message</Alert>)

    expect(
      screen.getByRole('button', { name: /close alert/i })
    ).toBeInTheDocument()
  })

  it('calls onClose when dismiss button is clicked', async () => {
    const handleDismiss = vi.fn()
    render(<Alert variant="info" onClose={handleDismiss}>Message</Alert>)

    const dismissButton = screen.getByRole('button', { name: /close alert/i })
    await userEvent.click(dismissButton)

    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not show dismiss button when onClose is not provided', () => {
    render(<Alert variant="info">Message</Alert>)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('has correct ARIA role', () => {
    render(<Alert variant="info">Message</Alert>)
    const alert = screen.getByRole('status')
    expect(alert).toBeInTheDocument()

    render(<Alert variant="warning">Warning</Alert>)
    const warningAlert = screen.getByRole('alert')
    expect(warningAlert).toBeInTheDocument()
  })
})
