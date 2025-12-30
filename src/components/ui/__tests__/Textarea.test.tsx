import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Textarea } from '../Textarea'

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Test Label" name="test" />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('associates label with textarea', () => {
    render(<Textarea label="Test Label" name="test" />)
    const textarea = screen.getByLabelText('Test Label')
    expect(textarea).toHaveAttribute('id')
    expect(textarea).toHaveAttribute('name', 'test')
  })

  it('handles value changes', async () => {
    render(<Textarea label="Test Label" name="test" />)
    const textarea = screen.getByLabelText('Test Label') as HTMLTextAreaElement

    await userEvent.type(textarea, 'test value')

    expect(textarea.value).toBe('test value')
  })

  it('shows error message when error is provided', () => {
    render(<Textarea label="Test Label" name="test" error="Error message" />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('shows helper text when provided', () => {
    render(<Textarea label="Test Label" name="test" helperText="Helper text" />)
    expect(screen.getByText('Helper text')).toBeInTheDocument()
  })

  it('applies error styles when error is present', () => {
    render(<Textarea label="Test Label" name="test" error="Error" />)
    const textarea = screen.getByLabelText('Test Label')
    expect(textarea.className).toContain('border-red-500')
  })

  it('sets required attribute', () => {
    render(<Textarea label="Test Label" name="test" required />)
    const textarea = screen.getByLabelText(/test label/i) as HTMLTextAreaElement
    expect(textarea.getAttribute('aria-required')).toBe('true')
  })
})
