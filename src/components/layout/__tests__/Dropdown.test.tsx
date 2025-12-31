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

  it('opens dropdown when trigger is focused and Enter is pressed', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')

    expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument()
  })

  it('opens dropdown when trigger is focused and Space is pressed', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    trigger.focus()
    await userEvent.keyboard(' ')

    expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument()
  })

  it('navigates items with ArrowDown', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard('{ArrowDown}')

    const item1 = screen.getByRole('menuitem', { name: 'Item 1' })
    const item2 = screen.getByRole('menuitem', { name: 'Item 2' })
    expect(item1).toBeInTheDocument()
    expect(item2).toBeInTheDocument()
  })

  it('navigates items with ArrowUp', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowUp}')

    const item1 = screen.getByRole('menuitem', { name: 'Item 1' })
    const item2 = screen.getByRole('menuitem', { name: 'Item 2' })
    expect(item1).toBeInTheDocument()
    expect(item2).toBeInTheDocument()
  })

  it('selects item with Enter and calls onSelect with correct item', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')

    expect(mockSelect).toHaveBeenCalledWith(mockItems[1])
  })

  it('closes dropdown with Escape and removes menu items from document', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')

    expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')

    expect(screen.queryByRole('menuitem', { name: 'Item 1' })).not.toBeInTheDocument()
    expect(screen.queryByRole('menuitem', { name: 'Item 2' })).not.toBeInTheDocument()
  })

  it('moves focus appropriately with Tab', async () => {
    render(
      <Dropdown
        label="Click me"
        items={mockItems}
        onSelect={mockSelect}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Click me' })
    trigger.focus()
    expect(document.activeElement).toBe(trigger)

    await userEvent.keyboard('{Tab}')

    expect(document.activeElement).not.toBe(trigger)
  })
})
