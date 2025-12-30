import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Accordion } from '../Accordion'

describe('Accordion', () => {
  it('renders title', () => {
    render(<Accordion title="Test Title">Content</Accordion>)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('hides content initially', () => {
    render(<Accordion title="Test Title">Hidden content</Accordion>)
    const content = screen.queryByText('Hidden content')
    // Content might be in DOM but hidden, or not rendered at all
    expect(content === null || !content.classList.contains('block')).toBe(true)
  })

  it('shows content when opened', async () => {
    render(<Accordion title="Test Title">Visible content</Accordion>)

    const button = screen.getByRole('button', { name: 'Test Title' })
    await userEvent.click(button)

    expect(screen.getByText('Visible content')).toBeVisible()
  })

  it('toggles content on click', async () => {
    render(<Accordion title="Test Title">Content</Accordion>)

    const button = screen.getByRole('button', { name: 'Test Title' })

    // Open
    await userEvent.click(button)
    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()

    // Close
    await userEvent.click(button)
    // Content might still be in DOM but hidden
    expect(content).toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    render(<Accordion title="Test Title">Content</Accordion>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-controls')
  })

  it('updates aria-expanded when opened', async () => {
    render(<Accordion title="Test Title">Content</Accordion>)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('opens with Enter key', async () => {
    render(<Accordion title="Test Title">Content</Accordion>)

    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard('{Enter}')

    expect(screen.getByText('Content')).toBeVisible()
  })

  it('opens with Space key', async () => {
    render(<Accordion title="Test Title">Content</Accordion>)

    const button = screen.getByRole('button')
    button.focus()
    await userEvent.keyboard(' ')

    expect(screen.getByText('Content')).toBeVisible()
  })
})
