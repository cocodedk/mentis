import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Test Label" name="test" />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('associates label with input', () => {
    render(<Input label="Test Label" name="test" />)
    const input = screen.getByLabelText('Test Label')
    expect(input).toHaveAttribute('id')
    expect(input).toHaveAttribute('name', 'test')
  })

  it('handles value changes', async () => {
    render(<Input label="Test Label" name="test" />)
    const input = screen.getByLabelText('Test Label') as HTMLInputElement

    await userEvent.type(input, 'test value')

    expect(input.value).toBe('test value')
  })

  it('shows error message when error is provided', () => {
    render(<Input label="Test Label" name="test" error="Error message" />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('shows helper text when provided', () => {
    render(<Input label="Test Label" name="test" helperText="Helper text" />)
    expect(screen.getByText('Helper text')).toBeInTheDocument()
  })

  it('applies error styles when error is present', () => {
    render(<Input label="Test Label" name="test" error="Error" />)
    const input = screen.getByLabelText('Test Label')
    expect(input.className).toContain('border-red-500')
  })

  it('sets required attribute', () => {
    render(<Input label="Test Label" name="test" required />)
    const input = screen.getByLabelText(/test label/i) as HTMLInputElement
    expect(input.getAttribute('aria-required')).toBe('true')
  })

  it('applies custom className', () => {
    render(<Input label="Test Label" name="test" className="custom-class" />)
    const input = screen.getByLabelText('Test Label')
    expect(input.className).toContain('custom-class')
  })
})
