import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Card } from '../Card'

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Card>Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card?.className).toContain('bg-white')
  })

  it('applies treatment variant', () => {
    render(<Card variant="treatment">Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card?.className).toContain('bg-white')
    expect(card?.className).toContain('p-6')
    // hover:shadow-md should only be present when onClick is provided
    expect(card?.className).not.toContain('hover:shadow-md')
  })

  it('handles onClick when provided', async () => {
    const handleClick = vi.fn()
    render(<Card onClick={handleClick}>Clickable card</Card>)

    const card = screen.getByRole('button', { name: /clickable card/i })
    await userEvent.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not have cursor pointer when onClick is not provided', () => {
    render(<Card>Non-clickable card</Card>)
    const card = screen.getByText('Non-clickable card').closest('div')
    expect(card?.className).not.toContain('cursor-pointer')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>)
    const card = screen.getByText('Content').closest('div')
    expect(card?.className).toContain('custom-class')
  })
})
