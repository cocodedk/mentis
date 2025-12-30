import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Dropdown } from '../Dropdown'

const mockItems = [
  { label: 'Item 1', path: '/item1' },
  { label: 'Item 2', path: '/item2' },
]

describe('Dropdown', () => {
  const mockSelect = vi.fn()

  it('renders trigger button', () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('opens dropdown when trigger is clicked', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    await userEvent.click(trigger)

    // Items should be rendered as links
    expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument()
  })

  it('calls onSelect when item is clicked', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    await userEvent.click(trigger)

    const item = screen.getByRole('menuitem', { name: 'Item 1' })
    await userEvent.click(item)

    expect(mockSelect).toHaveBeenCalledWith(mockItems[0])
  })
})
