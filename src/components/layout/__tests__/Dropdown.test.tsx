import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Dropdown } from '../Dropdown'

const mockItems = [
  { label: 'Item 1', path: '/item1' },
  { label: 'Item 2', path: '/item2' },
]

describe('Dropdown', () => {
  const mockNavigate = vi.fn()

  it('renders trigger button', () => {
    render(
      <Dropdown
        trigger={<span>Click me</span>}
        items={mockItems}
        onNavigate={mockNavigate}
      />
    )
    // Dropdown renders trigger as children, so check for text
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('opens dropdown when trigger is clicked', async () => {
    render(
      <Dropdown
        trigger={<span>Click me</span>}
        items={mockItems}
        onNavigate={mockNavigate}
      />
    )

    const trigger = screen.getByText('Click me')
    await userEvent.click(trigger)

    // Items should be rendered (might be in a list or links)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('calls onNavigate when item is clicked', async () => {
    render(
      <Dropdown
        trigger={<span>Click me</span>}
        items={mockItems}
        onNavigate={mockNavigate}
      />
    )

    const trigger = screen.getByText('Click me')
    await userEvent.click(trigger)

    const item = screen.getByText('Item 1')
    await userEvent.click(item)

    expect(mockNavigate).toHaveBeenCalledWith('/item1')
  })
})
