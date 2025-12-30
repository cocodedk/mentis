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
    const card = screen.getByText('Content').parentElement
    expect(card?.className).toContain('bg-white')
  })

  it('applies treatment variant', () => {
    render(<Card variant="treatment">Content</Card>)
    const card = screen.getByText('Content').parentElement
    expect(card?.className).toContain('bg-white')
  })

  it('handles onClick when provided', async () => {
    const handleClick = vi.fn()
    render(<Card onClick={handleClick}>Clickable card</Card>)

    const card = screen.getByText('Clickable card').parentElement
    if (card) {
      await userEvent.click(card)
      expect(handleClick).toHaveBeenCalledTimes(1)
    }
  })

  it('does not have cursor pointer when onClick is not provided', () => {
    render(<Card>Non-clickable card</Card>)
    const card = screen.getByText('Non-clickable card').parentElement
    expect(card?.className).not.toContain('cursor-pointer')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>)
    const card = screen.getByText('Content').parentElement
    expect(card?.className).toContain('custom-class')
  })
})
