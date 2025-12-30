import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    render(<Button>Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-primary-500')
  })

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('border-primary-500')
  })

  it('applies text variant', () => {
    render(<Button variant="text">Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('text-primary-500')
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<Button size="sm">Button</Button>)
    let button = screen.getByRole('button')
    expect(button.className).toContain('text-body-sm')

    rerender(<Button size="lg">Button</Button>)
    button = screen.getByRole('button')
    expect(button.className).toContain('text-body-lg')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })

  it('has focus-visible styles', () => {
    render(<Button>Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('focus-visible:outline-2')
  })

  it('has minimum height for touch targets', () => {
    render(<Button>Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('min-h-[44px]')
  })
})
