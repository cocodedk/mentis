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
    const alert = screen.getByText('Info message').closest('[role="alert"]')
    expect(alert).toBeInTheDocument()
  })

  it('applies warning variant styles', () => {
    render(<Alert variant="warning">Warning message</Alert>)
    const alert = screen.getByText('Warning message').closest('[role="alert"]')
    expect(alert).toBeInTheDocument()
  })

  it('shows dismiss button when onDismiss is provided', () => {
    const handleDismiss = vi.fn()
    render(<Alert variant="info" onDismiss={handleDismiss}>Message</Alert>)

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const handleDismiss = vi.fn()
    render(<Alert variant="info" onDismiss={handleDismiss}>Message</Alert>)

    const dismissButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(dismissButton)

    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not show dismiss button when onDismiss is not provided', () => {
    render(<Alert variant="info">Message</Alert>)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('has correct ARIA role', () => {
    render(<Alert variant="info">Message</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
  })
})
